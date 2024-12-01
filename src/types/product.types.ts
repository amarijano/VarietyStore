export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
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
