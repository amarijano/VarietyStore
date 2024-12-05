import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Header from "./Header";

// Mock the useCart hook
const mockUseCart = vi.fn();
vi.mock("../../hooks/useCart", () => ({
  useCart: () => mockUseCart(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Header Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });
  it("renders correctly with all elements", () => {
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
        <Header />
      </MemoryRouter>
    );

    // Check if the logo button is rendered
    expect(
      screen.getByRole("button", { name: /header.logoButton/i })
    ).toBeInTheDocument();

    // Check if the search input is rendered
    expect(
      screen.getByPlaceholderText(/header.searchPlaceholder/i)
    ).toBeInTheDocument();

    // Check if the cart button is rendered with the correct badge count
    expect(screen.getByText(/header.cartButton/i)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
