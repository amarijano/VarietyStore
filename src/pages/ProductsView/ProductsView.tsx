import { FloatButton, Pagination } from "antd";
import { useProducts } from "../../hooks/useProducts";
import styles from "./styles.module.scss";
import { ProductGrid } from "../../components";
import { useSearchParams } from "react-router-dom";

function ProductsView() {
  const { products, loading, pagination } = useProducts();
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("q"));

  const handlePaginationChange = (page: number, pageSize: number) => {
    if (pageSize !== pagination.limit) {
      pagination.changeLimit(pageSize);
    } else {
      pagination.goToPage(page);
    }
  };

  return (
    <div className={styles.homePageContainer}>
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
      <FloatButton />
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
