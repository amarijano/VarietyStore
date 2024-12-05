import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { mockProduct } from "../../constants/testMockData";
import ProductCard from "./ProductCard";

// Mock the useTranslation hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock the useModal hook
const mockShowModal = vi.fn();
vi.mock("../../context/ModalContext", () => ({
  useModal: () => ({
    showModal: mockShowModal,
  }),
}));

// Mocking useCart hook with a shared mockAddToCart
const mockAddToCart = vi.fn();
vi.mock("../../hooks/useCart", () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
  }),
}));

describe("ProductCard Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("renders product details correctly ", () => {
    render(<ProductCard product={mockProduct} loading={false} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    const priceElement = screen.getByText(mockProduct.price + "€");
    expect(priceElement).toBeInTheDocument();

    expect(screen.getByText("productCard.detailsButton")).toBeInTheDocument();
  });

  it("calls showModal when clicking on the card", async () => {
    render(<ProductCard product={mockProduct} loading={false} />);

    const card = screen.getByTestId("card-button");

    await act(async () => {
      fireEvent.click(card);
    });
    expect(mockShowModal).toHaveBeenCalledWith(
      "productDetails",
      expect.any(Function),
      mockProduct
    );
  });

  it("calls addToCart when clicking add to cart button", async () => {
    render(<ProductCard product={mockProduct} loading={false} />);

    const addToCartButton = screen.getByTestId("add-to-cart-button");
    expect(addToCartButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(addToCartButton);
    });
    expect(mockAddToCart).toBeCalledWith(mockProduct);
  });
});
