import React, { useContext } from 'react'
import { CiHeart } from 'react-icons/ci'
import { FaShare, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { TiShoppingCart } from 'react-icons/ti'
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ProductInfo({ product, availabilityText }) {

     const { cartItems = [], addToCart ,favorites ,removeFromFavorites, addToFavorites} = useContext(CartContext );

       const isInCart = cartItems.some((cartItem) => cartItem.id === product.id);

       const navigate = useNavigate();

       const handleAddToCart = () => {
    addToCart(product);
    toast.success(
      <div className="toast-wrapper">
        <img
          src={product.images?.[0] || ""}
          alt={product.title || "product"}
          className="toast-image"
        />

        <div className="toast-content">
          <strong>{product.title}</strong>
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
    const isInFavorites = favorites.some((fav) => fav.id === product.id);

  const handleAddToFav = () => {
    if (isInFavorites) {
      removeFromFavorites(product.id);
      toast.error(`${product.title} Remove from Favorites`);
    } else {
      addToFavorites(product);
      toast.success(`${product.title}added ToFavorites`);
    }
  };


  return (
    <div>
       <div className="details_item">
            <h1 className="name">{product.title}</h1>
            <div className="stars">
              <div className="Stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <p className="price">$ {product.price}</p>

              <h5>
                Availability: <span>{availabilityText}</span>
              </h5>
              <h5>
                Brand: <span>{product.brand}</span>
              </h5>
              <p className="desc">{product.description}</p>
              <h5 className="Stock">
                <span>
                  Hurry up! Only {product.stock} products left in stock
                </span>
              </h5>

              <button onClick={handleAddToCart} className={`btn ${isInCart ? "in-cart" : ""}`}>
                   {isInCart ? "In Cart" : "Add to Cart"} <TiShoppingCart />
              </button>
              <div className="icons">
                <span className={`${isInFavorites ? "In-Favorites " : " "}`} onClick={handleAddToFav}>
                  <CiHeart />
                </span>
                <span>
                  <FaShare />
                </span>
              </div>
            </div>
          </div>
    </div>
  )
}
