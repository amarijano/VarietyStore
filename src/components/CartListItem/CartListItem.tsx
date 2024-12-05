import { DeleteOutlined } from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

import { ImageMode } from "../../constants/constants";
import { CartItem } from "../../types/product.types";
import { ImageDisplay, Price } from "..";
import styles from "./styles.module.scss";

interface CartListItemProps {
  item: CartItem;
  onQuantityChange: (id: number, quantity: number) => void;
  deleteItem: (id: number) => void;
  onCartListItemClick: () => void;
}

const CartListItem: React.FC<CartListItemProps> = ({
  item,
  onQuantityChange,
  deleteItem,
  onCartListItemClick,
}) => {
  const { t } = useTranslation();
  const handleQuantityChange = (value: number | null) => {
    if (value !== null) {
      onQuantityChange(item.id, value);
    }
  };

  return (
    <li className={styles.cartListItem} onClick={onCartListItemClick}>
      <Button className={styles.thumbnailButton}>
        <ImageDisplay images={[item.thumbnail]} mode={ImageMode.SINGLE} />
      </Button>
      <div className={styles.cartListItemDetails}>
        <h4>{item.title}</h4>
        {item.brand && <p>{item.brand}</p>}
        <div className={styles.cartListItemDetailsReturnPolicy}>
          {item.returnPolicy}
        </div>
      </div>
      <div className={styles.cartListItemPriceContainer}>
        <label className={styles.label}>{t("cartListItem.label.price")}</label>
        <Price amount={item.price} isLight />
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
          defaultValue={item.quantity}
          onChange={handleQuantityChange}
          className={styles.quantityInput}
          value={item.quantity}
          max={item.stock}
          size="small"
        />
      </div>
      <div className={styles.cartListItemTotalContainer}>
        <label className={styles.label}>{t("cartListItem.label.total")}</label>
        <Price amount={item.price * item.quantity} isLight />
      </div>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          deleteItem(item.id);
        }}
        className={styles.cartDeleteButton}
      >
        <DeleteOutlined />
      </Button>
    </li>
  );
};

export default CartListItem;
