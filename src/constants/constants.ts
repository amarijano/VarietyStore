export enum Currency {
  AED = "د.إ", // United Arab Emirates Dirham
  USD = "$", // United States Dollar
  EUR = "€", // Euro
  JPY = "¥", // Japanese Yen
  GBP = "£", // British Pound Sterling
  AUD = "A$", // Australian Dollar
  CAD = "CA$", // Canadian Dollar
  CHF = "CHF", // Swiss Franc
  CNY = "¥", // Chinese Yuan
  INR = "₹", // Indian Rupee
  BRL = "R$", // Brazilian Real
  ZAR = "R", // South African Rand
  RUB = "₽", // Russian Ruble
  MXN = "$", // Mexican Peso
  KRW = "₩", // South Korean Won
}

export enum ModalType {
  PRODUCT_DETAILS = "productDetails",
}

export enum ImageMode {
  SINGLE = "single",
  MULTIPLE = "multiple",
}

export const VALID_PAGE_SIZES = [10, 20, 50, 100];

export const DEFAULT_PAGE_SIZE = 20;

export enum SortOptions {
  DEFAULT = "default",
  TITLE_ASC = "title-asc",
  TITLE_DESC = "title-desc",
  PRICE_ASC = "price-asc",
  PRICE_DESC = "price-desc",
}

export enum SortField {
  TITLE = "title",
  PRICE = "price",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum FilterTypes {
  CATEGORY = "category",
  MIN_PRICE = "minPrice",
  MAX_PRICE = "maxPrice",
  SEARCH = "search",
}

export const ALL_CATEGORIES_VALUE = "all";
