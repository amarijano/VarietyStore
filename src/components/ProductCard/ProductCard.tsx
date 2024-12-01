import { Button, Card, Skeleton } from "antd";
import { Product } from "../../types/product.types";
import styles from "./styles.module.scss";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import { Price } from "..";
import { useModal } from "../GlobalModal/ModalContext";
import { ImageMode } from "../../constants/constants";

interface ProductCardProps {
  product: Product;
  loading: boolean;
}

function ProductCard({ product, loading }: ProductCardProps) {
  const { Meta } = Card;
  const { showModal } = useModal();

  return (
    <>
      <Card
        classNames={{ cover: styles.productCardCover }}
        className={styles.productCard}
        cover={
          loading ? (
            <Skeleton.Image className={styles.skeletonImage} />
          ) : (
            //   <img src={product.images[0]} />
            <ImageDisplay images={product.images} mode={ImageMode.SINGLE} />
          )
        }
        hoverable
        actions={
          loading
            ? []
            : [
                <Button onClick={() => showModal("productDetails", product)}>
                  Show Details
                </Button>,
              ]
        }
        onClick={() => showModal("productDetails", product)}
      >
        {loading ? (
          <Skeleton />
        ) : (
          <Meta
            title={<div className={styles.cardTitle}>{product.title}</div>}
            description={
              <div
                className={styles.cardDescription}
                title={product.description}
              >
                <span>
                  {product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </span>
                <Price amount={product.price} />
              </div>
            }
          />
        )}
      </Card>
    </>
  );
}

export default ProductCard;
