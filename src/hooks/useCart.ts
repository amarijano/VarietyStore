import { useEffect, useState } from "react";

export function useCart() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id || null;

      // Sum up quantities for items matching the current userId
      const count = cart.reduce(
        (total: number, item: { quantity: number; userId: number | null }) => {
          if (item.userId === userId) {
            return total + item.quantity;
          }
          return total;
        },
        0
      );

      setCartCount(count);
    };

    // Initial count
    updateCartCount();

    // Listen for storage changes
    window.addEventListener("storage", updateCartCount);

    // Custom event for cart updates
    window.addEventListener("cartUpdate", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdate", updateCartCount);
    };
  }, []);

  return cartCount;
}
