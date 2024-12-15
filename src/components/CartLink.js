import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartLink = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart?.reduce((total, item) => total + item.quantity, 0);
  return <Link to="/cart">Cart ({totalItems})</Link>;
};
export default CartLink;
