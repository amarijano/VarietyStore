import { useEffect, useState } from "react";

import { useModal } from "../context/ModalContext";
import { useProductsContext } from "../context/ProductsContext";
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

  // const handleQuantityChange = (id: number, quantity: number) => {
  //   // Example of updating local storage directly (you may want to implement this in your hook)
  //   const currentCart: CartItemStorage[] = JSON.parse(
  //     localStorage.getItem("cart") || "[]"
  //   );
  //   const updatedCart = currentCart.map((item) =>
  //     item.id === id ? { ...item, quantity } : item
  //   );
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   window.dispatchEvent(new Event("cartUpdate")); // Trigger cart update event
  // };

  const handleQuantityChange = (id: number, quantity: number) => {
    const currentCart = getUserCart();
    const updatedCart = currentCart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );

    saveUserCart(updatedCart);
  };

  const getUserCart = (): CartItemStorage[] => {
    const userId = user?.id?.toString() || "guest";
    const allCarts = JSON.parse(
      localStorage.getItem("carts") || "{}"
    ) as UserCartStorage;
    return allCarts[userId] || [];
  };

  const saveUserCart = (cartItems: CartItemStorage[]) => {
    const userId = user?.id?.toString() || "guest";
    const allCarts = JSON.parse(
      localStorage.getItem("carts") || "{}"
    ) as UserCartStorage;
    allCarts[userId] = cartItems;
    localStorage.setItem("carts", JSON.stringify(allCarts));
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

  // const addToCart = (product: Product) => {
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
  //   hideModal();

  //   console.log("Product added to cart:", cart);
  // };

  // Function to remove an item from the cart or empty the cart
  // const removeFromCart = (itemId?: number) => {
  //   let currentCart: CartItemStorage[] = JSON.parse(
  //     localStorage.getItem("cart") || "[]"
  //   );

  //   if (itemId !== undefined) {
  //     // If itemId is provided, filter out the specific item
  //     currentCart = currentCart.filter((item) => item.id !== itemId);
  //   } else {
  //     // If no itemId is provided, empty the cart
  //     currentCart = [];
  //   }

  //   localStorage.setItem("cart", JSON.stringify(currentCart));

  //   // Trigger update on custom event
  //   window.dispatchEvent(new Event("cartUpdate"));
  // };

  // useEffect(() => {
  //   const updateCartCount = () => {
  //     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  //     const user = JSON.parse(localStorage.getItem("user") || "{}");
  //     const userId = user.id || null;

  //     // Sum up quantities for items matching the current userId
  //     const count = cart.reduce(
  //       (total: number, item: { quantity: number; userId: number | null }) => {
  //         if (item.userId === userId) {
  //           return total + item.quantity;
  //         }
  //         return total;
  //       },
  //       0
  //     );
  //     setCartItems(getCartItemsFromLocalStorage()); // Update cart items
  //     setCartCount(count); // Update cart count
  //   };

  //   // Initial count
  //   updateCartCount();

  //   // Listen for storage changes
  //   window.addEventListener("storage", updateCartCount);

  //   // Custom event for cart updates
  //   window.addEventListener("cartUpdate", updateCartCount);

  //   return () => {
  //     window.removeEventListener("storage", updateCartCount);
  //     window.removeEventListener("cartUpdate", updateCartCount);
  //   };
  // }, [allProducts]);

  return {
    cartCount,
    cartItems,
    addToCart,
    removeFromCart,
    handleQuantityChange,
  };
}
