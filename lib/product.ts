import { graphqlRequest } from "./graphqlClient";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

// カートに追加するデータの型
export type CartItem = {
  product: Product; // 商品
  quantity: number; // 個数
};

const listProductsQuery = `
  query listProducts {
    products {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

export async function listProducts(): Promise<Product[]> {
  const data = await graphqlRequest({ query: listProductsQuery });
  return data.products;
}

const getProductQuery = `
  query getProduct ($id: ID!) {
    product (id: $id) {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

export async function getProduct(id: string): Promise<Product> {
  const variables = { id: id };
  console.log(id);
  const data = await graphqlRequest({ query: getProductQuery, variables });
  return data.product;
}
