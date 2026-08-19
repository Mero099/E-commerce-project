import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import "./Cart.css";








export default function Cart() {



  const { cartItems,increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);




  return (
    <div className="checkout">
      <div className="orderSummary">
        <h2>Order Summary</h2>
        <div className="items">
          {safeCartItems.length === 0 ? (
            <p>Your Cart is empty.</p>
          ) : (
            safeCartItems.map((item, index) => (
              <div className="item_cart" key={item?.id ?? index}>
                <div className="image_name">
                  <img
                    src={item?.images?.[0] }
                    alt=""
                  />
                  <div className="content">
                    <h4>{item.title}</h4>
                    <p className="price_item">${item.price}</p>

                    <div className="quantity_control">

                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>

                    </div>
                  </div>
                </div>
                    <button onClick={() => removeFromCart(item.id)} className="delete_item"><FaTrashAlt /></button>
              </div>
            ))
          )}
        </div>

        <div className="bottom_summery">
          <div className="shop_table">
            <p>total:</p>
            <span className="total_checkout">${total}</span>
          </div>

          <div className="button_div">
            <button type="submit">place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}
