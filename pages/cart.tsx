import { useRouter } from "next/dist/client/router";
import { FC, useEffect, useState } from "react";
import { CartListitem } from "../components/CartListItem";
import { Layout } from "../components/Layout";
import { clearCart, getCartItemCount } from "../lib/cart";
import { CartItem } from "../lib/product";
import styles from "./cart.module.css";

const CartPage: FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      let data: CartItem[] = JSON.parse(localStorage.getItem("key") || "[]");
      setCartItems(data);

      let price = 0;
      data.map((items) => {
        price += items.product.price * items.quantity;
      });
      setTotalPrice(price);
      setCartItemCount(getCartItemCount());
    }
  }, []);

  const handleSubmit = () => {
    window.alert("注文しました");
    router.push("/");
    clearCart();
  };
  return (
    <Layout cartItemCount={cartItemCount}>
      <ul className={styles.cartList}>
        {cartItems != null &&
          cartItems.map((item) => (
            <li key={item.product.id}>
              <CartListitem cartItem={item}></CartListitem>
            </li>
          ))}
      </ul>
      <h2>合計金額: {totalPrice}円</h2>
      <button className={styles.orderBtn} onClick={handleSubmit}>
        注文する
      </button>
    </Layout>
  );
};

export default CartPage;
