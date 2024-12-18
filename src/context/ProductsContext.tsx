import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "../hooks/useAuth";
import {
  CategoryType,
  Product,
  ProductsContextType,
} from "../types/product.types";

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { fetchWithAutoRefresh } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setCategoriesLoading(true);
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetchWithAutoRefresh("/api/products?limit=0"),
          fetchWithAutoRefresh("/api/products/categories"),
        ]);

        if (!productsResponse.ok) throw new Error("Failed to fetch products");
        if (!categoriesResponse.ok)
          throw new Error("Failed to fetch categories");

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setAllProducts(productsData.products);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
        setCategoriesLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ allProducts, categories, loading, categoriesLoading, error }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      "useProductsContext must be used within a ProductsProvider"
    );
  }
  return context;
};
