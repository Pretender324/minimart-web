import { CartItem } from "./product";

export function getCartItemCount(): number {
  const cartItems: CartItem[] = JSON.parse(localStorage.getItem("key") || "[]");
  let count = 0;
  cartItems.map((item) => {
    count += item.quantity;
  });
  return count;
}

export function clearCart() {
  localStorage.removeItem("key");
}
