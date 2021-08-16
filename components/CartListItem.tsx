import { FC } from "react";
import { CartItem } from "../lib/product";

type Props = {
  cartItem: CartItem;
};

export const CartListitem: FC<Props> = ({ cartItem }) => {
  return (
    <div>
      <img src={cartItem.product.imageUrl} alt={cartItem.product.name}></img>
      <p>
        {cartItem.product.name} {cartItem.product.price}円
      </p>
      <p>{cartItem.quantity}個</p>
    </div>
  );
};
