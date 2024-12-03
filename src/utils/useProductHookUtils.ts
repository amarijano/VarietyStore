import { Product, Filters } from "../types/product.types";
import { SortField, SortOrder } from "../constants/constants";
/**
 * Applies all filters (category, price range, search) to the product list
 * @param products - The full list of products to filter
 * @param filters - The current filter settings (category, price range, search)
 * @returns Filtered array of products
 */
export function applyFilters(products: Product[], filters: Filters): Product[] {
  return products.filter((product) => {
    // Apply category filter
    if (
      filters.category &&
      product.category.toLowerCase() !== filters.category.toLowerCase()
    ) {
      return false;
    }

    // Apply price range filter
    if (
      filters.priceRange.min !== null &&
      product.price < filters.priceRange.min
    ) {
      return false;
    }
    if (
      filters.priceRange.max !== null &&
      product.price > filters.priceRange.max
    ) {
      return false;
    }

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      if (!product.title.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sorts products based on the specified field and order
 * @param products - Array of products to sort
 * @param field - Field to sort by (title, price)
 * @param order - Sort order (asc, desc)
 * @returns Sorted array of products
 */
export function sortProducts(
  products: Product[],
  field: SortField | null,
  order: SortOrder | null
): Product[] {
  if (!field || !order) {
    return products;
  }

  return [...products].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (order === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

/**
 * Paginates an array of products
 * @param products - Array of products to paginate
 * @param page - Current page number
 * @param limit - Number of items per page
 * @returns Sliced array of products for the current page
 */
export function paginateProducts(
  products: Product[],
  page: number,
  limit: number
): Product[] {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return products.slice(startIndex, endIndex);
}

/**
 * Validates and updates URL parameters for product filtering
 * @param params - Current URL search parameters
 * @param products - Full list of products
 * @returns Object containing new params and whether an update is needed
 */
export function validateUrlParams(
  params: URLSearchParams,
  products: Product[]
): { newParams: URLSearchParams; needsUpdate: boolean } {
  const newParams = new URLSearchParams(params);
  let needsUpdate = false;

  // Category Validation
  const category = params.get("category");
  if (category && !products.some((p) => p.category === category)) {
    newParams.delete("category");
    needsUpdate = true;
  }

  // Sort Validation
  const sortBy = params.get("sortBy");
  const order = params.get("order");
  if (sortBy && !["title", "price"].includes(sortBy)) {
    newParams.delete("sortBy");
    newParams.delete("order");
    needsUpdate = true;
  }
  if (order && !["asc", "desc"].includes(order)) {
    newParams.delete("sortBy");
    newParams.delete("order");
    needsUpdate = true;
  }

  // Price Range Validation
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  if (minPrice && (isNaN(Number(minPrice)) || Number(minPrice) < 0)) {
    newParams.delete("minPrice");
    needsUpdate = true;
  }
  if (maxPrice && (isNaN(Number(maxPrice)) || Number(maxPrice) < 0)) {
    newParams.delete("maxPrice");
    needsUpdate = true;
  }

  return { newParams, needsUpdate };
}

/**
 * Updates filter parameters in the URL
 * @param searchParams - Current URL search parameters
 * @param newFilters - New filter values to apply
 * @returns Updated URLSearchParams object
 */
export function updateFilterParams(
  searchParams: URLSearchParams,
  newFilters: Partial<Filters>
): URLSearchParams {
  const newParams = new URLSearchParams(searchParams);

  // Update category
  if ("category" in newFilters) {
    if (newFilters.category) {
      newParams.set("category", newFilters.category);
    } else {
      newParams.delete("category");
    }
  }

  // Update price range
  if (newFilters.priceRange) {
    if (newFilters.priceRange.min !== undefined) {
      if (newFilters.priceRange.min !== null) {
        newParams.set("minPrice", newFilters.priceRange.min.toString());
      } else {
        newParams.delete("minPrice");
      }
    }
    if (newFilters.priceRange.max !== undefined) {
      if (newFilters.priceRange.max !== null) {
        newParams.set("maxPrice", newFilters.priceRange.max.toString());
      } else {
        newParams.delete("maxPrice");
      }
    }
  }

  // Update search
  if ("search" in newFilters) {
    if (newFilters.search) {
      newParams.set("q", newFilters.search);
    } else {
      newParams.delete("q");
    }
  }

  // Reset to first page when filters change
  newParams.set("page", "1");
  return newParams;
}

/**
 * Updates sort parameters in the URL
 * @param searchParams - Current URL search parameters
 * @param field - Field to sort by
 * @param order - Sort order
 * @returns Updated URLSearchParams object
 */
export function updateSortParams(
  searchParams: URLSearchParams,
  field: SortField | null,
  order: SortOrder | null
): URLSearchParams {
  const newParams = new URLSearchParams(searchParams);

  if (field && order) {
    newParams.set("sortBy", field);
    newParams.set("order", order);
  } else {
    newParams.delete("sortBy");
    newParams.delete("order");
  }

  newParams.set("page", "1"); // Reset to first page
  return newParams;
}

/**
 * Updates pagination parameters in the URL
 * @param searchParams - Current URL search parameters
 * @param page - Page number
 * @param limit - Items per page
 * @returns Updated URLSearchParams object
 */
export function updatePaginationParams(
  searchParams: URLSearchParams,
  page: number,
  limit?: number
): URLSearchParams {
  const newParams = new URLSearchParams(searchParams);
  newParams.set("page", page.toString());

  if (limit) {
    newParams.set("limit", limit.toString());
  }

  return newParams;
}
