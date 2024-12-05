import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ModalProvider } from "../../context/ModalContext";
import CartView from "./CartView";

// Mocking useCart hook
const mockUseCart = vi.fn();
vi.mock("../../hooks/useCart", () => ({
  useCart: () => mockUseCart(),
}));

// Mocking i18n
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Cart Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("renders cart with items", () => {
    const mockCartItems = [
      { id: 1, price: 100, quantity: 2 },
      { id: 2, price: 50, quantity: 1 },
    ];
    mockUseCart.mockReturnValue({
      cartItems: mockCartItems,
      cartCount: mockCartItems.length,
      removeFromCart: vi.fn(),
      handleQuantityChange: vi.fn(),
      addToCart: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ModalProvider>
          <CartView />
        </ModalProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("cart.title")).toBeInTheDocument();
    expect(screen.getByText("cart.total")).toBeInTheDocument();
    expect(screen.getByText("cart.totalAmount")).toBeInTheDocument();
    expect(screen.getByText("200.00€")).toBeInTheDocument(); // Assuming Price formats correctly
    expect(
      screen.getByRole("button", { name: /continueShopping/i })
    ).toBeInTheDocument();
  });

  it("renders empty cart message", () => {
    mockUseCart.mockReturnValue({
      cartItems: [],
      cartCount: 0,
      removeFromCart: vi.fn(),
      handleQuantityChange: vi.fn(),
      addToCart: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ModalProvider>
          <CartView />
        </ModalProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("cart.cartEmpty.title")).toBeInTheDocument();
    expect(screen.getByText("cart.cartEmpty.description")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "cart.cartEmpty.button" })
    ).toBeInTheDocument();
  });
});
