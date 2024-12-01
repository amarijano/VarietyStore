import { useState, useEffect, useRef } from "react";
import { useAuth } from "./useAuth";
import { GetProductsResponse, Product } from "../types/product.types";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface UseProductResult {
  products: Product[];
  loading: boolean;
  error: Error | null;
  pagination: {
    page: number;
    total: number;
    limit: number;
    goToPage: (page: number) => void;
    changeLimit: (limit: number) => void;
  };
  search: {
    query: string | null;
    executeSearch: (query: string) => void;
    clearSearch: () => void;
  };
}

export function useProducts(): UseProductResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isSearchRoute = location.pathname.includes("/products/search");
  const searchQuery = searchParams.get("q");
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("limit")) || 20;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);

  // Add ref to track initial mount
  const isInitialMount = useRef(true);

  // Add ref to track current request
  const currentRequestId = useRef<string>("");

  const { fetchWithAutoRefresh } = useAuth();

  const fetchProducts = async (page: number, limit: number, query?: string) => {
    // Generate unique request ID
    const requestId = Date.now().toString();
    currentRequestId.current = requestId;
    setLoading(true);
    setError(null);
    try {
      const skip = (page - 1) * limit;
      const url = query
        ? `/api/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
        : `/api/products?limit=${limit}&skip=${skip}`;

      const response = await fetchWithAutoRefresh(url);

      // Check if this is still the current request
      if (currentRequestId.current !== requestId) {
        return; // Ignore outdated requests
      }
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data: GetProductsResponse = await response.json();
      setProducts(data.products);
      setTotal(data.total);
      // setPage(page); // Ensure page state is updated after successful fetch
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // Handle URL changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (isSearchRoute && searchQuery) {
      fetchProducts(currentPage, pageSize, searchQuery);
    } else if (isSearchRoute && !searchQuery) {
      navigate("/products");
    } else {
      fetchProducts(currentPage, pageSize);
    }
  }, [isSearchRoute, searchQuery, currentPage, pageSize]);

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  const changeLimit = (limit: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("limit", limit.toString());
    newParams.set("page", "1"); // Reset to first page
    setSearchParams(newParams);
  };

  const executeSearch = (query: string) => {
    navigate({
      pathname: "/products/search",
      search: `?q=${encodeURIComponent(query)}&page=1&limit=${pageSize}`,
    });
  };

  const clearSearch = () => {
    navigate({
      pathname: "/products",
      search: `?page=1&limit=${pageSize}`,
    });
  };

  return {
    products,
    loading,
    error,
    pagination: {
      page: currentPage,
      total,
      limit: pageSize,
      goToPage,
      changeLimit,
    },
    search: {
      query: searchQuery,
      executeSearch,
      clearSearch,
    },
  };
}
