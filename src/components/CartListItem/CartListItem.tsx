import { DeleteOutlined } from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

import { ImageMode } from "../../constants/constants";
import { useScreenSize } from "../../hooks/useScreenSize";
import { CartItem } from "../../types/product.types";
import { ImageDisplay, Price } from "..";
import styles from "./styles.module.scss";

interface CartListItemProps {
  item: CartItem;
  onQuantityChange: (id: number, quantity: number) => void;
  deleteItem: (id: number) => void;
  onCartListItemClick: () => void;
}

function CartListItem({
  item: { id, price, quantity, title, brand, returnPolicy, thumbnail, stock },
  onQuantityChange,
  deleteItem,
  onCartListItemClick,
}: CartListItemProps) {
  const { t } = useTranslation();
  const { isMobile } = useScreenSize();

  const handleQuantityChange = (value: number | null) => {
    if (value !== null) {
      onQuantityChange(id, value);
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteItem(id);
  };

  const totalPrice = price * quantity;

  function cartListItemMobile() {
    return (
      <li className={styles.cartListItem} onClick={onCartListItemClick}>
        <div className={styles.cartListItemDetailsMobileContainer}>
          <Button className={styles.thumbnailButton}>
            <ImageDisplay images={[thumbnail]} mode={ImageMode.SINGLE} />
          </Button>
          <div className={styles.cartListItemDetails}>
            <h4>{title}</h4>
            {brand && <p>{brand}</p>}
            <div className={styles.cartListItemDetailsReturnPolicy}>
              {returnPolicy}
            </div>
          </div>
        </div>
        <div className={styles.cartListItemMobilePriceContainer}>
          <div className={styles.cartListItemPriceContainer}>
            <label className={styles.label}>
              {t("cartListItem.label.price")}
            </label>
            <Price amount={price} isLight />
          </div>
          <div
            className={styles.cartListItemQuantityContainer}
            onClick={(event) => event.stopPropagation()}
          >
            <label className={styles.label}>
              {t("cartListItem.label.quantity")}
            </label>
            <InputNumber
              min={1}
              value={quantity}
              onChange={handleQuantityChange}
              className={styles.quantityInput}
              max={stock}
              size="small"
            />
          </div>
          <div className={styles.cartListItemTotalContainer}>
            <label className={styles.label}>
              {t("cartListItem.label.total")}
            </label>
            <Price amount={totalPrice} isLight />
          </div>
          <Button onClick={handleDelete} className={styles.cartDeleteButton}>
            <DeleteOutlined />
          </Button>
        </div>
      </li>
    );
  }

  function cartListItemDesktop() {
    return (
      <li className={styles.cartListItem} onClick={onCartListItemClick}>
        <Button className={styles.thumbnailButton}>
          <ImageDisplay images={[thumbnail]} mode={ImageMode.SINGLE} />
        </Button>
        <div className={styles.cartListItemDetails}>
          <h4>{title}</h4>
          {brand && <p>{brand}</p>}
          <div className={styles.cartListItemDetailsReturnPolicy}>
            {returnPolicy}
          </div>
        </div>
        <div className={styles.cartListItemPriceContainer}>
          <label className={styles.label}>
            {t("cartListItem.label.price")}
          </label>
          <Price amount={price} isLight />
        </div>
        <div
          className={styles.cartListItemQuantityContainer}
          onClick={(event) => event.stopPropagation()}
        >
          <label className={styles.label}>
            {t("cartListItem.label.quantity")}
          </label>
          <InputNumber
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
            className={styles.quantityInput}
            max={stock}
            size="small"
          />
        </div>
        <div className={styles.cartListItemTotalContainer}>
          <label className={styles.label}>
            {t("cartListItem.label.total")}
          </label>
          <Price amount={totalPrice} isLight />
        </div>
        <Button onClick={handleDelete} className={styles.cartDeleteButton}>
          <DeleteOutlined />
        </Button>
      </li>
    );
  }

  return isMobile ? cartListItemMobile() : cartListItemDesktop();
}

export default CartListItem;
