import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ModalProvider } from "../../context/ModalContext";
import { CategoryType, Product } from "../../types/product.types";
import ProductsView from "./ProductsView";

// Mock the useTranslation hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockUpdateFilters = vi.fn();
const mockUpdateSort = vi.fn();
const mockUpdatePagination = vi.fn();

// Mock the useProductsContext hook
const mockCategories: CategoryType[] = [];
const mockCategoriesLoading = false;

vi.mock("../../context/ProductsContext", () => ({
  useProductsContext: () => ({
    categories: mockCategories,
    loading: mockCategoriesLoading,
  }),
}));

describe("ProductsView Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("renders products view with product array", () => {
    vi.mock("../../hooks/useProductsData", () => ({
      useProductsData: () => ({
        ...mockProductsData,
        updateFilters: mockUpdateFilters,
        updateSort: mockUpdateSort,
        updatePagination: mockUpdatePagination,
      }),
    }));

    render(
      <MemoryRouter>
        <ModalProvider>
          <ProductsView />
        </ModalProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId("card-button")).toBeInTheDocument();
    expect(screen.getByText("productsView.sortLabel")).toBeInTheDocument();
    expect(screen.getByText("filter.filters")).toBeInTheDocument();
  });
});

const mockProduct: Product = {
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
};

const mockProductsData = {
  products: [mockProduct],
  totalItems: 1,
  currentState: {
    filters: {
      category: null,
      priceRange: { min: null, max: null },
      search: null,
    },
    sort: { field: null, order: null },
    pagination: { page: 1, limit: 20 },
  },
  loading: false,
  error: null,
};
