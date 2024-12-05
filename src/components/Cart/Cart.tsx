import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { useModal } from "../../context/ModalContext";
import { useCart } from "../../hooks/useCart";
import { CartItem, Product } from "../../types/product.types";
import { Price } from "..";
import CartListItem from "../CartListItem/CartListItem";
import styles from "./styles.module.scss";

function Cart() {
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
    const { quantity, ...product } = cartItem; // Destructure to omit quantity
    return product; // Return the remaining properties as a Product
  }

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className={styles.cartContainer}>
      {cartCount ? (
        <div>
          <h1 className={styles.cartTitle}>Shopping Cart</h1>
          <p className={styles.cartTotal}>Total Items in Cart: {cartCount}</p>
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
                  onClick={() => navigate("/products")}
                >
                  CONTINUE SHOPPING
                </Button>
                <Button type="default" onClick={() => removeFromCart()}>
                  Empty Cart
                </Button>
              </div>
            </div>
            <div className={styles.cartSummary}>
              <div>
                <h2>Total Amount</h2>
                <Price amount={totalAmount} />
              </div>
              <Button type="primary" disabled>
                Go to Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.cardContainerEmpty}>
          <h1 className={styles.cartTitle}>Your cart is empty</h1>
          <p>
            Once you add something to your cart, it will appear here. Ready to
            get started?
          </p>
          <Button type="primary" onClick={() => navigate("/products")}>
            GET STARTED
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
