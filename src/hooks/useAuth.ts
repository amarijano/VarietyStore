import { useEffect, useState } from "react";

import {
  LoginCredentials,
  LoginResponse,
  RefreshResponse,
  User,
} from "../types/auth.types";

const AUTH_STATE_CHANGE = "auth-state-change";
const authStateEvent = new CustomEvent(AUTH_STATE_CHANGE);

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("accessToken");
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Initialize user state
  });

  useEffect(() => {
    const updateAuthState = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null); // Update user state
    };

    window.addEventListener(AUTH_STATE_CHANGE, updateAuthState);
    return () => {
      window.removeEventListener(AUTH_STATE_CHANGE, updateAuthState);
    };
  }, []);

  const login = async ({ username, password }: LoginCredentials) => {
    try {
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data: LoginResponse = await response.json();

      // Save all user data under the "user" key
      const { accessToken, ...userData } = data; // Destructure to separate access token
      // Save access token separately for easy access
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoggedIn(true);
      setUser(userData);
      window.dispatchEvent(authStateEvent);
      window.dispatchEvent(new Event("cartUpdate"));
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch("api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data: RefreshResponse = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.dispatchEvent(authStateEvent);
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const fetchWithAutoRefresh = async (
    url: string,
    options: RequestInit = {}
  ) => {
    try {
      const response = await fetch(url, {
        ...options,
        credentials: "include",
      });

      if (response.status === 401) {
        try {
          await refreshToken();
          const newResponse = await fetch(url, {
            ...options,
            credentials: "include",
          });
          return newResponse;
        } catch (refreshError) {
          logout();
          throw new Error("Session expired");
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    isLoggedIn,
    user,
    login,
    logout,
    fetchWithAutoRefresh,
    refreshToken,
  };
}
