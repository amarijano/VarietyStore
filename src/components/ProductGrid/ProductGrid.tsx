import { Product } from "../../types/product.types";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./styles.module.scss";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

function ProductGrid({ products, loading }: ProductGridProps) {
  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} loading={loading} />
      ))}
    </div>
  );
}

export default ProductGrid;
