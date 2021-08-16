import { FC, useEffect, useState } from "react";
import { CartListitem } from "../components/CartListItem";
import { Layout } from "../components/Layout";
import { CartItem } from "../lib/product";

const CartPage: FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let data: CartItem[] = JSON.parse(localStorage.getItem("key") || "[]");
      setCartItems(data);

      let price = 0;
      data.map((items) => {
        price += items.product.price * items.quantity;
      });
      setTotalPrice(price);
    }
  }, []);
  return (
    <Layout>
      {cartItems != null &&
        cartItems.map((item) => (
          <div key={item.product.id}>
            <CartListitem cartItem={item}></CartListitem>
          </div>
        ))}
      <h2>合計金額: {totalPrice}円</h2>
      <button>注文する</button>
    </Layout>
  );
};

export default CartPage;
