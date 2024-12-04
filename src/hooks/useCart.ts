import { useEffect, useState } from "react";

import { useModal } from "../context/ModalContext";
import { useProductsContext } from "../context/ProductsContext";
import { LoginResponse } from "../types/auth.types";
import {
  CartItem,
  CartItemStorage,
  Product,
  UserCartStorage,
} from "../types/product.types";
import { useAuth } from "./useAuth";

export function useCart() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { hideModal } = useModal();
  const { allProducts } = useProductsContext();
  const { user } = useAuth();

  // Function to get cart items from local storage and map them to CartItems
  function getCartItemsFromLocalStorage(): CartItem[] {
    const storedCartItems = getUserCart();

    if (!storedCartItems) {
      return []; // Return an empty array if there are no items in LS
    }

    // Map through the parsed cart items to find corresponding products
    const cartItems = storedCartItems
      .map((cartItem) => {
        const product = allProducts.find(
          (product) => product.id === cartItem.id
        );
        if (product) {
          return {
            ...product,
            quantity: cartItem.quantity, // Add quantity from cart item
          } as CartItem;
        }

        return null; // Return null if product is not found
      })
      .filter((item): item is CartItem => item !== null); // Filter out any null values

    return cartItems;
  }

  const handleQuantityChange = (id: number, quantity: number) => {
    const currentCart = getUserCart();
    const updatedCart = currentCart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );

    saveUserCart(updatedCart);
  };
  const getUserCart = (userId?: string): CartItemStorage[] => {
    userId = userId ?? (user?.id?.toString() || "guest");
    const allCarts = JSON.parse(
      localStorage.getItem("carts") || "{}"
    ) as UserCartStorage;
    return allCarts[userId] || [];
  };

  const saveUserCart = (cartItems: CartItemStorage[], userId?: string) => {
    userId = userId ?? (user?.id?.toString() || "guest");
    const allCarts = JSON.parse(
      localStorage.getItem("carts") || "{}"
    ) as UserCartStorage;

    if (cartItems.length === 0) {
      // If the cart is empty, remove the user's cart entry
      delete allCarts[userId];
    } else {
      // Otherwise, update the user's cart
      allCarts[userId] = cartItems;
    }

    // Check if allCarts is empty
    if (Object.keys(allCarts).length === 0) {
      // If empty, remove the entire carts object from localStorage
      localStorage.removeItem("carts");
    } else {
      // Otherwise, save the updated carts object
      localStorage.setItem("carts", JSON.stringify(allCarts));
    }

    window.dispatchEvent(new Event("cartUpdate"));
  };

  const addToCart = (product: Product) => {
    const currentCart = getUserCart();
    const existingProductIndex = currentCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      currentCart[existingProductIndex].quantity += 1;
    } else {
      currentCart.push({ id: product.id, quantity: 1 });
    }

    saveUserCart(currentCart);
    hideModal();
  };

  const removeFromCart = (itemId?: number) => {
    const currentCart = getUserCart();
    const newCart =
      itemId !== undefined
        ? currentCart.filter((item) => item.id !== itemId)
        : [];
    saveUserCart(newCart);
  };

  const mergeGuestCart = (user: LoginResponse) => {
    if (!user) return; // Do nothing if no user

    const guestCart = getUserCart("guest");
    const userCart = getUserCart(user.id.toString());

    const mergedCart = [...userCart];

    guestCart.forEach((guestItem) => {
      const userItemIndex = mergedCart.findIndex(
        (item) => item.id === guestItem.id
      );
      if (userItemIndex !== -1) {
        // If item exists in user's cart, update quantity
        mergedCart[userItemIndex].quantity += guestItem.quantity;
      } else {
        // If item doesn't exist, add it to the user's cart
        mergedCart.push(guestItem);
      }
    });

    saveUserCart(mergedCart, user.id.toString());
    saveUserCart([], "guest"); // Clear guest cart after merging
  };

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getUserCart();
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartItems(getCartItemsFromLocalStorage());
      setCartCount(count);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdate", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdate", updateCartCount);
    };
  }, [user, allProducts]); // Add user as a dependency

  return {
    cartCount,
    cartItems,
    addToCart,
    removeFromCart,
    handleQuantityChange,
    mergeGuestCart,
  };
}
