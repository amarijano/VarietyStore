import { SortField, SortOrder } from "../constants/constants";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
  availabilityStatus: string;
  sku: string;
  minimumOrderQuantity: number;
  dimensions: Dimensions;
  weight: number;
  tags: string[];
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  meta: Meta;
  reviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartItemStorage {
  id: number;
  quantity: number;
}

export interface UserCartStorage {
  [userId: string]: CartItemStorage[];
}

interface Meta {
  barcode: string;
  createdAt: string;
  qrCode: string;
  updatedAt: string;
}

interface Review {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface ApiPaginationResponse {
  total: number;
  limit: number;
  skip: number;
}

export interface GetProductsResponse extends ApiPaginationResponse {
  products: Product[];
}

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

export interface CategoryType {
  name: string;
  slug: string;
  url: string;
}

export interface ProductsContextType {
  allProducts: Product[];
  categories: CategoryType[];
  loading: boolean;
  categoriesLoading: boolean;
  error: Error | null;
}

export interface PriceRange {
  min: number | null;
  max: number | null;
}

export interface Filters {
  category: string | null;
  priceRange: PriceRange;
  search: string | null;
}

export interface Pagination {
  page: number;
  limit: number;
}
