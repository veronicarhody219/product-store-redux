import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotalQuantity,
  removeFromCart,
  clearCart,
  selectCartTotalPrice,
  incrementQuantity,
  decrementQuantity,
} from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);

  const formattedPrice = Number.isFinite(totalPrice)
    ? totalPrice.toFixed(2)
    : "0.00";
  if (cartItems.length === 0) return <p>Your cart is empty</p>;

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };
  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };
  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  return (
    <div className="cart">
      <h2> Cart {totalQuantity} items</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="cart-item">
            {cartItems.map((item) => {
              const itemTotalPrice = item.price * item.quantity;

              return (
                <li key={item.id}>
                  <h3>{item.title}</h3>
                  <p></p>
                  <button
                    onClick={() => handleDecrement({ id: item.id })}
                    className="btn"
                  >
                    -
                  </button>
                  <span>Quantity: {item.quantity} </span>
                  <button
                    onClick={() => handleIncrement({ id: item.id })}
                    className="btn"
                  >
                    +
                  </button>
                  <span>x Price: ${item.price}</span>
                  <span> = ${itemTotalPrice.toFixed(2)} </span>

                  <button
                    onClick={() => handleRemove({ id: item.id })}
                    className="btn"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <h3>Total price: ${formattedPrice}</h3>
          <button onClick={() => dispatch(clearCart())} className="btn">
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};
export default Cart;
