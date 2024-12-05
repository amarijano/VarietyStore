import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CategoryType } from "../../types/product.types";
import ProductsView from "./ProductsView"; // Adjust the import path as needed

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

  it("renders products view with empty products array", () => {
    vi.mock("../../hooks/useProductsData", () => ({
      useProductsData: () => ({
        ...mockEmptyProductsData,
        updateFilters: mockUpdateFilters,
        updateSort: mockUpdateSort,
        updatePagination: mockUpdatePagination,
      }),
    }));

    render(<ProductsView />);

    expect(
      screen.getByText("productsView.noProductsFound")
    ).toBeInTheDocument();
  });
});

const mockEmptyProductsData = {
  products: [],
  totalItems: 0,
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
