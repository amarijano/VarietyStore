import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CartItem } from "../../types/product.types";
import CartListItem from "./CartListItem";

const mockOnQuantityChange = vi.fn();
const mockDeleteItem = vi.fn();
const mockOnCartListItemClick = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Return the key as the translation
  }),
}));

describe("CartListItem Component", () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
  });

  it("renders correctly with given props", () => {
    render(
      <CartListItem
        item={mockItem}
        onQuantityChange={mockOnQuantityChange}
        deleteItem={mockDeleteItem}
        onCartListItemClick={mockOnCartListItemClick}
      />
    );

    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    mockItem?.brand &&
      expect(screen.getByText(mockItem.brand)).toBeInTheDocument();
    expect(screen.getByText(mockItem.returnPolicy)).toBeInTheDocument();
    expect(screen.getByText("cartListItem.label.price")).toBeInTheDocument();
    expect(screen.getByText("cartListItem.label.quantity")).toBeInTheDocument();
    expect(screen.getByText("cartListItem.label.total")).toBeInTheDocument();
  });

  it("calls onQuantityChange when quantity is changed", () => {
    render(
      <CartListItem
        item={mockItem}
        onQuantityChange={mockOnQuantityChange}
        deleteItem={mockDeleteItem}
        onCartListItemClick={mockOnCartListItemClick}
      />
    );

    const quantityInput = screen.getByRole("spinbutton");

    fireEvent.change(quantityInput, { target: { value: 3 } });

    expect(mockOnQuantityChange).toHaveBeenCalledWith(mockItem.id, 3);
  });

  it("calls deleteItem when delete button is clicked", () => {
    render(
      <CartListItem
        item={mockItem}
        onQuantityChange={mockOnQuantityChange}
        deleteItem={mockDeleteItem}
        onCartListItemClick={mockOnCartListItemClick}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockDeleteItem).toHaveBeenCalledWith(mockItem.id);
  });

  it("calls onCartListItemClick when item is clicked", () => {
    render(
      <CartListItem
        item={mockItem}
        onQuantityChange={mockOnQuantityChange}
        deleteItem={mockDeleteItem}
        onCartListItemClick={mockOnCartListItemClick}
      />
    );

    const listItem = screen.getByRole("listitem");

    fireEvent.click(listItem);
    expect(mockOnCartListItemClick).toHaveBeenCalled();
  });
});

const mockItem: CartItem = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description:
    "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  category: "beauty",
  price: 9.99,
  discountPercentage: 7.17,
  rating: 4.94,
  stock: 5,
  tags: ["beauty", "mascara"],
  brand: "Essence",
  sku: "RCH45Q1A",
  weight: 2,
  dimensions: {
    width: 23.17,
    height: 14.43,
    depth: 28.01,
  },
  warrantyInformation: "1 month warranty",
  shippingInformation: "Ships in 1 month",
  availabilityStatus: "Low Stock",
  reviews: [
    {
      rating: 2,
      comment: "Very unhappy with my purchase!",
      date: "2024-05-23T08:56:21.618Z",
      reviewerName: "John Doe",
      reviewerEmail: "john.doe@x.dummyjson.com",
    },
    {
      rating: 2,
      comment: "Not as described!",
      date: "2024-05-23T08:56:21.618Z",
      reviewerName: "Nolan Gonzalez",
      reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
    },
    {
      rating: 5,
      comment: "Very satisfied!",
      date: "2024-05-23T08:56:21.618Z",
      reviewerName: "Scarlett Wright",
      reviewerEmail: "scarlett.wright@x.dummyjson.com",
    },
  ],
  returnPolicy: "30 days return policy",
  minimumOrderQuantity: 24,
  meta: {
    createdAt: "2024-05-23T08:56:21.618Z",
    updatedAt: "2024-05-23T08:56:21.618Z",
    barcode: "9164035109868",
    qrCode: "https://assets.dummyjson.com/public/qr-code.png",
  },
  images: [
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
  ],
  thumbnail:
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
  quantity: 1,
};
