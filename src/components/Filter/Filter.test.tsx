import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CategoryType } from "../../types/product.types";
import Filter from "./Filter";

// Mocking useProductsData hook
vi.mock("../../hooks/useProductsData", () => ({
  useProductsData: () => ({
    updateFilters: vi.fn(),
    currentState: {
      filters: {
        category: null,
        priceRange: {
          min: null,
          max: null,
        },
      },
    },
  }),
}));

// Mocking useTranslation hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Filter Component", () => {
  const mockCategories: CategoryType[] = [];

  const mockOnCategoryChange = vi.fn();
  const mockOnPriceChange = vi.fn();

  it("renders correctly with categories", async () => {
    render(
      <Filter
        categories={mockCategories}
        priceRange={{ min: null, max: null }}
        onCategoryChange={mockOnCategoryChange}
        onPriceChange={mockOnPriceChange}
        selectedCategory={null}
      />
    );

    // Check if the filter button is rendered
    expect(
      screen.getByRole("button", { name: /filters/i })
    ).toBeInTheDocument();

    // Open the dropdown menu
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /filters/i }));
    });
    expect(screen.getByText("filter.label.category")).toBeInTheDocument();
    expect(screen.getByText("filter.label.price")).toBeInTheDocument();

    // Open category submenu
    await act(async () => {
      fireEvent.click(screen.getByRole("menuitem", { name: /Category/i }));
    });
    expect(screen.getByText("filter.label.all")).toBeInTheDocument();
  });
});
