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

  // const addToCart = (event: React.MouseEvent) => {
  //   event.stopPropagation();
  //   // Get user data if it exists
  //   const user = JSON.parse(localStorage.getItem("user") || "{}");
  //   const userId = user.id || null;

  //   const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  //   // Check if product already exists in cart
  //   const existingProductIndex = cart.findIndex(
  //     (item: { id: number; userId: number | null }) =>
  //       item.id === product.id && item.userId === userId
  //   );

  //   if (existingProductIndex !== -1) {
  //     // If product exists, increment quantity
  //     cart[existingProductIndex].quantity += 1;
  //   } else {
  //     // If product doesn't exist, add it with quantity 1
  //     cart.push({
  //       id: product.id,
  //       quantity: 1,
  //       userId: userId,
  //     });
  //   }

  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   window.dispatchEvent(new Event("cartUpdate"));
  //   console.log("Product added to cart:", cart);
  // };

  const showProductDetailsModal = (
    event: React.MouseEvent<Element, MouseEvent>
  ) => {
    event.stopPropagation();
    showModal("productDetails", () => addToCart(product), product);
  };

  return (
    <>
      <Card
        classNames={{ cover: styles.productCardCover }}
        className={styles.productCard}
        cover={
          loading ? (
            <Skeleton.Image className={styles.skeletonImage} />
          ) : (
            <ImageDisplay images={product.images} mode={ImageMode.SINGLE} />
          )
        }
        hoverable
        actions={
          loading
            ? []
            : [
                <Button key="showDetails" onClick={showProductDetailsModal}>
                  Show Details
                </Button>,
                <Tooltip
                  key="addToCart"
                  title={!product.stock ? "Out of stock" : ""}
                  arrow={false}
                >
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      addToCart(product);
                    }}
                    disabled={!product.stock}
                  >
                    Add to Cart
                  </Button>
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
