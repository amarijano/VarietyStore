import { FloatButton, InputNumber, Pagination, Select, Space } from "antd";
import { useProducts } from "../../hooks/useProducts";
import styles from "./styles.module.scss";
import { ProductGrid } from "../../components";
import { useSearchParams } from "react-router-dom";
import { SortField, SortOrder } from "../../types/product.types";
import { useCategories } from "../../hooks/useCategories";

function ProductsView() {
  const { products, loading, pagination, sort, filter } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("q"));

  const handlePaginationChange = (page: number, pageSize: number) => {
    if (pageSize !== pagination.limit) {
      pagination.changeLimit(pageSize);
    } else {
      pagination.goToPage(page);
    }
  };

  const handleSortChange = (value: string) => {
    if (value === "default") {
      // Remove sort parameters from URL
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("sortBy");
      newParams.delete("order");
      setSearchParams(newParams);
      return;
    }
    const [field, order] = value.split("-") as [SortField, SortOrder];
    sort.updateSort(field, order);
  };

  // const handlePriceChange = (min: number | null, max: number | null) => {
  //   filter.updatePriceRange(min, max);
  // };

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.controls}>
        <Space size="large">
          <Space align="center">
            <span>Category:</span>
            <Select
              value={filter.category || "all"}
              onChange={(value) =>
                filter.updateCategory(value === "all" ? null : value)
              }
              style={{ width: 200 }}
              loading={categoriesLoading}
            >
              <Select.Option value="all">All Categories</Select.Option>
              {categories.map((category) => (
                <Select.Option key={category} value={category}>
                  {category
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Select.Option>
              ))}
            </Select>
          </Space>
          {/* <Space align="center">
            <span>Price:</span>
            <InputNumber
              placeholder="Min"
              value={filter.priceRange.min}
              onChange={(value) =>
                handlePriceChange(value, filter.priceRange.max)
              }
              min={0}
              style={{ width: 100 }}
            />
            <span>-</span>
            <InputNumber
              placeholder="Max"
              value={filter.priceRange.max}
              onChange={(value) =>
                handlePriceChange(filter.priceRange.min, value)
              }
              min={filter.priceRange.min || 0}
              style={{ width: 100 }}
            />
          </Space> */}
          <Space align="center">
            <span>Sort by:</span>
            <Select
              value={
                sort.field && sort.order
                  ? `${sort.field}-${sort.order}`
                  : "default"
              }
              onChange={handleSortChange}
              style={{ width: 180 }}
            >
              <Select.Option value="default">Default</Select.Option>
              <Select.Option value="title-asc">Name (A-Z)</Select.Option>
              <Select.Option value="title-desc">Name (Z-A)</Select.Option>
              <Select.Option value="price-asc">
                Price (Low to High)
              </Select.Option>
              <Select.Option value="price-desc">
                Price (High to Low)
              </Select.Option>
            </Select>
          </Space>
        </Space>
      </div>
      <div className={styles.homePageContent}>
        {/* {loading ? (
          <>
            <SkeletonCard />
          </>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : ( */}
        <ProductGrid products={products} loading={loading} />
        {/* )} */}
      </div>
      <FloatButton.BackTop visibilityHeight={600} />
      <Pagination
        current={pagination.page} // This should now stay in sync
        pageSize={pagination.limit}
        total={pagination.total}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        align="end"
        onChange={handlePaginationChange}
        showSizeChanger
      />
    </div>
  );
}

export default ProductsView;
