import { useRouter } from "next/dist/client/router";
import { FC, useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { getCartItemCount } from "../../lib/cart";
import { CartItem, getProduct, Product } from "../../lib/product";

const ProductDetail: FC<{ inclimentCount: () => void }> = () => {
  const router = useRouter();
  const [product, setProduct] = useState<Product>();
  const id = router.query.id?.toString();
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  useEffect(() => {
    if (id != null) {
      getProduct(id).then((product) => setProduct(product));
    }
  }, [id]);

  useEffect(() => {
    setCartItemCount(getCartItemCount());
  }, []);

  const handleClick = () => {
    if (!product) return;

    let cartItems: CartItem[] = JSON.parse(localStorage.getItem("key") || "[]");
    const targetIndex = cartItems.findIndex((item) => {
      return item.product.id === product?.id;
    });
    console.log(targetIndex);
    if (targetIndex > -1) {
      cartItems[targetIndex].quantity += 1;
    } else {
      const data: CartItem = { product: product, quantity: 1 };
      cartItems.push(data);
    }
    localStorage.setItem("key", JSON.stringify(cartItems));
    setCartItemCount(cartItemCount + 1);
  };

  return (
    <Layout cartItemCount={cartItemCount}>
      {product != null && (
        <div>
          <img src={product.imageUrl} alt={product.name} />
          <h1>{product.name}</h1>
          <p>{product.price}円</p>
          <p>{product.description}</p>
          <button onClick={handleClick}>カートに追加する</button>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetail;
