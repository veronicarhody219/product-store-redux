import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/ProductsSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: productsData } = useGetProductsQuery();
  const products = productsData?.products || [];
  const product = products.find((product) => product.id === parseInt(id, 10));
  const dispatch = useDispatch();
  if (!product) return <p>Product not found</p>;
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button
        onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
        className="btn"
      >
        Add to Cart
      </button>
    </div>
  );
};
export default ProductDetail;
