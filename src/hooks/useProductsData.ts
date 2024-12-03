import { useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductsContext } from "../context/ProductsContext";
import {
  applyFilters,
  sortProducts,
  paginateProducts,
  validateUrlParams,
  updateFilterParams,
  updateSortParams,
  updatePaginationParams,
} from "../utils/useProductHookUtils";
import { Filters } from "../types/product.types";
import {
  DEFAULT_PAGE_SIZE,
  SortField,
  SortOrder,
} from "../constants/constants";

export function useProductsData() {
  const { allProducts, loading, error } = useProductsContext();
  const [searchParams, setSearchParams] = useSearchParams();

  // Validate URL parameters only on initial load
  useEffect(() => {
    if (loading || allProducts.length === 0) return;

    const { newParams, needsUpdate } = validateUrlParams(
      searchParams,
      allProducts
    );
    if (needsUpdate) {
      setSearchParams(newParams);
    }
  }, [allProducts]);

  // Get current state from URL params
  const currentState = {
    filters: {
      category: searchParams.get("category"),
      priceRange: {
        min: searchParams.get("minPrice")
          ? Number(searchParams.get("minPrice"))
          : null,
        max: searchParams.get("maxPrice")
          ? Number(searchParams.get("maxPrice"))
          : null,
      },
      search: searchParams.get("q"),
    },
    sort: {
      field: searchParams.get("sortBy") as SortField | null,
      order: searchParams.get("order") as SortOrder | null,
    },
    pagination: {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || DEFAULT_PAGE_SIZE,
    },
  };

  const updateFilters = (newFilters: Partial<Filters>) => {
    const newParams = updateFilterParams(searchParams, newFilters);
    setSearchParams(newParams);
  };

  const updateSort = (field: SortField | null, order: SortOrder | null) => {
    const newParams = updateSortParams(searchParams, field, order);
    setSearchParams(newParams);
  };

  const updatePagination = (page: number, limit?: number) => {
    const newParams = updatePaginationParams(searchParams, page, limit);
    setSearchParams(newParams);
  };

  // Apply filters, sorting, and pagination
  const filteredProducts = useMemo(
    () => applyFilters(allProducts, currentState.filters),
    [allProducts, currentState.filters]
  );

  const sortedProducts = useMemo(
    () =>
      sortProducts(
        filteredProducts,
        currentState.sort.field,
        currentState.sort.order
      ),
    [filteredProducts, currentState.sort]
  );

  const displayProducts = useMemo(
    () =>
      paginateProducts(
        sortedProducts,
        currentState.pagination.page,
        currentState.pagination.limit
      ),
    [sortedProducts, currentState.pagination]
  );

  return {
    products: displayProducts,
    totalItems: sortedProducts.length,
    currentState,
    updateFilters,
    updateSort,
    updatePagination,
    loading,
    error,
  };
}
