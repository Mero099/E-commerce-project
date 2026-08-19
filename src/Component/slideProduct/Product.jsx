import { useContext } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaCartArrowDown, FaRegHeart, FaShare } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Product({ item }) {
  const navigate = useNavigate();

  const {
    cartItems = [],
    addToCart,
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useContext(CartContext);
  const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);
  const imageSrc = item.images?.[0] || "";

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(
      <div className="toast-wrapper">
        <img
          src={imageSrc}
          alt={item.title || "product"}
          className="toast-image"
        />

        <div className="toast-content">
          <strong>{item.title}</strong>
          has been added to your cart.
          <div>
            <button className="btn" onClick={() => navigate("/cart")}>
              View Cart
            </button>
          </div>
        </div>
      </div>,
      { duration: 3000 },
    );
  };

  // ....favorites..//
  const isInFavorites = favorites.some((fav) => fav.id === item.id);

  const handleAddToFav = () => {
    if (isInFavorites) {
      removeFromFavorites(item.id);
      toast.error(`${item.title} Remove from Favorites`);
    } else {
      addToFavorites(item);
      toast.success(`${item.title}added ToFavorites`);
    }
  };

  return (
    <div className={`product ${isInCart ? "in-cart" : ""}`}>
      <Link to={`/products/${item.id}`}>
        {isInCart && (
          <span className="status_carts">
            <FaCheck />
            in cart
          </span>
        )}

        <div className="img_product">
          <img src={imageSrc} alt={item.title || "product"} />
        </div>

        <p className="name_product">{item.title}</p>
        <div className="Stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
        <div className="price">
          <span>${item.price}</span>
        </div>
      </Link>

      <div className="icons">
        <span className="btn_addtocart" onClick={() => handleAddToCart()}>
          <FaCartArrowDown />
        </span>
        <span className={`${isInFavorites ? "In-Favorites " : " "}`} onClick={handleAddToFav}>
          <FaRegHeart />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
}
