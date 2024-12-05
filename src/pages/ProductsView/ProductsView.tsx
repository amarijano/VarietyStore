import { Empty, FloatButton, Pagination, Select, Space, Spin } from "antd";
import { useTranslation } from "react-i18next";

import { Filter, FilterChip, ProductGrid } from "../../components";
import {
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
  const { t } = useTranslation();
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
      label: t("productsView.minPriceLabel"),
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
      label: t("productsView.maxPriceLabel"),
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
      label: t("productsView.searchLabel"),
      value: currentState.filters.search,
      onClose: () => updateFilters({ search: null }),
    },
  ];

  return (
    <div className={styles.homePageContainer}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Spin size="large" fullscreen tip={t("productsView.loadingText")} />
        </div>
      ) : (
        <>
          <div className={styles.controls}>
            <Filter
              categories={categories}
              selectedCategory={currentState.filters.category}
              priceRange={currentState.filters.priceRange}
              onCategoryChange={(category) => updateFilters({ category })}
              onPriceChange={(min, max) =>
                updateFilters({
                  priceRange: { min, max },
                })
              }
              loading={loading || categoriesLoading}
            />
            <Space>
              <span>{t("productsView.sortLabel")}</span>
              <Select
                value={validSort}
                onChange={handleSortChange}
                style={{ width: 180 }}
              >
                {Object.values(SortOptions).map((option) => (
                  <Select.Option key={option} value={option}>
                    {t(`productsView.sortOptions.${option}`)}
                  </Select.Option>
                ))}
              </Select>
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
            {!products.length ? (
              <Empty
                className={styles.emptyProducts}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span className={styles.emptyText}>
                    {t("productsView.noProductsFound")}
                  </span>
                }
              />
            ) : (
              <ProductGrid products={products} loading={loading} />
            )}
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
            onChange={(page, pageSize) => {
              updatePagination(page, pageSize);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            showSizeChanger
            pageSizeOptions={VALID_PAGE_SIZES}
          />
        </>
      )}
    </div>
  );
}

export default ProductsView;
