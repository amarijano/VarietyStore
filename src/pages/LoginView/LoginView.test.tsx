import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import LoginView from "./LoginView";

// Mock the useTranslation hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock the useAuth hook
const mockLogin = vi.fn();
vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

// Mock the useCart hook
const mockMergeGuestCart = vi.fn();
vi.mock("../../hooks/useCart", () => ({
  useCart: () => ({
    mergeGuestCart: mockMergeGuestCart,
  }),
}));

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("LoginView Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("renders login form correctly", () => {
    render(<LoginView />);

    expect(screen.getByText("loginView.loginTitle")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("loginView.usernamePlaceholder")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("loginView.passwordPlaceholder")
    ).toBeInTheDocument();
    expect(screen.getByText("loginView.checkboxText")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /loginView.loginButton/i })
    ).toBeInTheDocument();
  });

  it("submits the form and calls login function", async () => {
    mockLogin.mockResolvedValueOnce({ id: 1 });

    render(<LoginView />);

    fireEvent.change(
      screen.getByPlaceholderText("loginView.usernamePlaceholder"),
      {
        target: { value: "testuser" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("loginView.passwordPlaceholder"),
      {
        target: { value: "password123" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", { name: /loginView.loginButton/i })
    );

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
        keepCart: true,
      });
      expect(mockNavigate).toHaveBeenCalledWith("/products");
    });
  });

  it("shows success message on successful login", async () => {
    mockLogin.mockResolvedValueOnce({ id: 1 });
    render(<LoginView />);

    fireEvent.change(
      screen.getByPlaceholderText("loginView.usernamePlaceholder"),
      {
        target: { value: "testuser" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("loginView.passwordPlaceholder"),
      {
        target: { value: "password123" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", { name: /loginView.loginButton/i })
    );

    await waitFor(() => {
      expect(screen.queryByText("loginView.loginSuccess")).toBeInTheDocument(); // Check for success message
    });
  });
  it("shows error message on failed login", async () => {
    mockLogin.mockRejectedValueOnce(new Error("Login failed")); // Mock failed login response

    render(<LoginView />);

    fireEvent.change(
      screen.getByPlaceholderText("loginView.usernamePlaceholder"),
      {
        target: { value: "testuser" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("loginView.passwordPlaceholder"),
      {
        target: { value: "password123" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", { name: /loginView.loginButton/i })
    );

    await waitFor(() => {
      expect(screen.queryByText("loginView.loginFailed")).toBeInTheDocument(); // Check for error message
    });
  });
});
