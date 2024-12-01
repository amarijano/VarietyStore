import { useState, useEffect } from "react";
import {
  LoginCredentials,
  LoginResponse,
  RefreshResponse,
} from "../types/auth.types";

const AUTH_STATE_CHANGE = "auth-state-change";
const authStateEvent = new CustomEvent(AUTH_STATE_CHANGE);

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("accessToken");
  });

  useEffect(() => {
    const updateAuthState = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
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
      Object.entries(data).forEach(([key, value]) => {
        if (value != null) {
          localStorage.setItem(key, JSON.stringify(value));
        }
      });
      setIsLoggedIn(true);
      window.dispatchEvent(authStateEvent);
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
    localStorage.clear();
    setIsLoggedIn(false);
    window.dispatchEvent(authStateEvent);
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

  return { isLoggedIn, login, logout, fetchWithAutoRefresh, refreshToken };
}
