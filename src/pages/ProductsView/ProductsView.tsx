import { FloatButton, InputNumber, Pagination, Select, Space } from "antd";

import { FilterChip, ProductGrid } from "../../components";
import {
  ALL_CATEGORIES_VALUE,
  FilterTypes,
  SortField,
  SortOptions,
  SortOrder,
  VALID_PAGE_SIZES,
} from "../../constants/constants";
import { useProductsContext } from "../../context/ProductsContext";
import { useProductsData } from "../../hooks/useProductsData";
import styles from "./styles.module.scss";

function ProductsView() {
  const {
    products,
    totalItems,
    currentState,
    updateFilters,
    updateSort,
    updatePagination,
    loading,
  } = useProductsData();

  const { categories = [], loading: categoriesLoading } = useProductsContext();

  // Ensure the selected category is valid
  const validCategory = categories?.some(
    (cat) => cat.slug === currentState.filters.category
  )
    ? currentState.filters.category
    : ALL_CATEGORIES_VALUE;

  // Ensure the sort is valid
  const validSort =
    currentState.sort.field &&
    currentState.sort.order &&
    [SortField.TITLE, SortField.PRICE].includes(currentState.sort.field) &&
    [SortOrder.ASC, SortOrder.DESC].includes(currentState.sort.order)
      ? `${currentState.sort.field}-${currentState.sort.order}`
      : SortOptions.DEFAULT;

  const handleSortChange = (value: string) => {
    if (value === SortOptions.DEFAULT) {
      updateSort(null, null);
      return;
    }
    const [field, order] = value.split("-") as [SortField, SortOrder];
    updateSort(field, order);
  };

  const handlePriceChange = (min: number | null, max: number | null) => {
    // If min is higher than max, clear min
    if (min !== null && max !== null && min > max) {
      min = null;
    }
    // If max is lower than min, clear max
    if (max !== null && min !== null && max < min) {
      max = null;
    }

    updateFilters({
      priceRange: { min, max },
    });
  };

  const filterChips = [
    {
      type: FilterTypes.CATEGORY,
      value:
        categories.find((cat) => cat.slug === currentState.filters.category)
          ?.name || "",
      onClose: () => updateFilters({ category: null }),
    },
    {
      type: FilterTypes.MIN_PRICE,
      label: "Min Price",
      value:
        currentState.filters.priceRange.min !== null &&
        currentState.filters.priceRange.min > 0
          ? `${currentState.filters.priceRange.min}€`
          : null,
      onClose: () =>
        updateFilters({
          priceRange: {
            min: null,
            max: currentState.filters.priceRange.max,
          },
        }),
    },
    {
      type: FilterTypes.MAX_PRICE,
      label: "Max Price",
      value:
        currentState.filters.priceRange.max !== null
          ? `${currentState.filters.priceRange.max}€`
          : null,
      onClose: () =>
        updateFilters({
          priceRange: {
            min: currentState.filters.priceRange.min,
            max: null,
          },
        }),
    },
    {
      type: FilterTypes.SEARCH,
      label: "Search",
      value: currentState.filters.search,
      onClose: () => updateFilters({ search: null }),
    },
  ];

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.controls}>
        <Space size="large">
          <Space align="center">
            <span>Category:</span>
            <Select
              value={validCategory || ALL_CATEGORIES_VALUE}
              onChange={(value) =>
                updateFilters({
                  category: value === ALL_CATEGORIES_VALUE ? null : value,
                })
              }
              style={{ width: 200 }}
              loading={categoriesLoading}
            >
              <Select.Option value={ALL_CATEGORIES_VALUE}>
                All Categories
              </Select.Option>
              {categories.map((category) => (
                <Select.Option key={category.slug} value={category.slug}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Space>

          <Space align="center">
            <span>Price:</span>
            <InputNumber
              placeholder="Min"
              value={currentState.filters.priceRange.min}
              onChange={(value) =>
                handlePriceChange(value, currentState.filters.priceRange.max)
              }
              min={0}
              max={currentState.filters.priceRange.max || undefined}
              style={{ width: 100 }}
            />
            <span>-</span>
            <InputNumber
              placeholder="Max"
              value={currentState.filters.priceRange.max}
              onChange={(value) =>
                handlePriceChange(currentState.filters.priceRange.min, value)
              }
              min={currentState.filters.priceRange.min || 0}
              style={{ width: 100 }}
            />
          </Space>

          <Space align="center">
            <span>Sort by:</span>
            <Select
              value={validSort}
              onChange={handleSortChange}
              style={{ width: 180 }}
            >
              {Object.values(SortOptions).map((option) => (
                <Select.Option key={option} value={option}>
                  {/* {t(`sort.options.${option}`)} */}
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </Space>
      </div>

      {filterChips.some((chip) => chip.value) && (
        <div className={styles.activeFilters}>
          <Space size="small" wrap>
            {filterChips.map(
              ({ type, label, value, onClose }) =>
                value && (
                  <FilterChip
                    key={type}
                    label={label}
                    value={value}
                    onClose={onClose}
                  />
                )
            )}
          </Space>
        </div>
      )}

      <div className={styles.homePageContent}>
        <ProductGrid products={products} loading={loading} />
      </div>

      <FloatButton.BackTop visibilityHeight={600} />

      <Pagination
        align="end"
        current={currentState.pagination.page}
        pageSize={currentState.pagination.limit}
        total={totalItems}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        onChange={(page, pageSize) => updatePagination(page, pageSize)}
        showSizeChanger
        pageSizeOptions={VALID_PAGE_SIZES}
      />
    </div>
  );
}

export default ProductsView;
