import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { AppRoute } from "../../constants/constants";
import { useModal } from "../../context/ModalContext";
import { useCart } from "../../hooks/useCart";
import { CartItem, Product } from "../../types/product.types";
import { Price } from "..";
import CartListItem from "../CartListItem/CartListItem";
import styles from "./styles.module.scss";

function Cart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const {
    cartItems,
    cartCount,
    removeFromCart,
    handleQuantityChange,
    addToCart,
  } = useCart();

  function convertCartItemToProduct(cartItem: CartItem): Product {
    const { quantity, ...product } = cartItem;
    return product;
  }

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className={styles.cartContainer}>
      {cartCount ? (
        <>
          <h1 className={styles.cartTitle}>{t("cart.title")}</h1>
          <p className={styles.cartTotal}>
            {t("cart.total", { count: cartCount })}
          </p>
          <div className={styles.cartContent}>
            <div className={styles.cartContentLeft}>
              <ul>
                {cartItems.map((item) => (
                  <CartListItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    deleteItem={removeFromCart}
                    onCartListItemClick={() =>
                      showModal(
                        "productDetails",
                        () => addToCart(convertCartItemToProduct(item)),
                        convertCartItemToProduct(item)
                      )
                    }
                  />
                ))}
              </ul>
              <div className={styles.cartActionsWrapper}>
                <Button
                  type="text"
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate(AppRoute.BASE)}
                >
                  {t("cart.button.continueShopping")}
                </Button>
                <Button type="default" onClick={() => removeFromCart()}>
                  {t("cart.button.emptyCart")}
                </Button>
              </div>
            </div>
            <div className={styles.cartSummary}>
              <div>
                <h2>{t("cart.totalAmount")}</h2>
                <Price amount={totalAmount} />
              </div>
              <Button type="primary" disabled>
                {t("cart.button.goToCheckout")}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.cartContainerEmpty}>
          <h1 className={styles.cartTitle}>{t("cart.cartEmpty.title")}</h1>
          <p>{t("cart.cartEmpty.description")}</p>
          <Button
            className={styles.getStartedButton}
            onClick={() => navigate(AppRoute.BASE)}
          >
            {t("cart.cartEmpty.button")}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
