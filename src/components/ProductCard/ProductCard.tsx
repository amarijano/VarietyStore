import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Skeleton, Tooltip } from "antd";
import React from "react";

import { ImageMode } from "../../constants/constants";
import { useModal } from "../../context/ModalContext";
import { useCart } from "../../hooks/useCart";
import { Product } from "../../types/product.types";
import { Price } from "..";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import styles from "./styles.module.scss";

interface ProductCardProps {
  product: Product;
  loading: boolean;
}

function ProductCard({ product, loading }: ProductCardProps) {
  const { Meta } = Card;
  const { showModal } = useModal();
  const { addToCart } = useCart();

  const showProductDetailsModal = (
    event: React.MouseEvent<Element, MouseEvent>
  ) => {
    event.stopPropagation();
    showModal("productDetails", () => addToCart(product), product);
  };

  return (
    <>
      <Card
        classNames={{
          cover: styles.productCardCover,
          body: styles.productCardBody,
        }}
        className={styles.productCard}
        cover={
          loading ? (
            <Skeleton.Image className={styles.skeletonImage} active />
          ) : (
            <ImageDisplay images={product.images} mode={ImageMode.SINGLE} />
          )
        }
        hoverable
        actions={
          loading
            ? []
            : [
                <Button
                  key="showDetails"
                  type="text"
                  onClick={showProductDetailsModal}
                >
                  Details
                </Button>,
                <Tooltip
                  key="addToCart"
                  title={!product.stock ? "Out of stock" : ""}
                  arrow={false}
                >
                  <Button
                    type="text"
                    icon={<PlusCircleOutlined size={30} />}
                    onClick={(event) => {
                      event.stopPropagation();
                      addToCart(product);
                    }}
                    disabled={!product.stock}
                  />
                </Tooltip>,
              ]
        }
        onClick={showProductDetailsModal}
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
