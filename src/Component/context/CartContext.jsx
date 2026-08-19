import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
});

export default function CartProvider({ children }) {

  // ..favorites..//

  const [favorites, setFavorites] = useState(() => {
    try {
      const saveFav = localStorage.getItem("favorites"); 
      return saveFav ? JSON.parse(saveFav) : [];
    } catch {
      return [];
    }
  });

  const addToFavorites = (item) =>{
    setFavorites((prev) =>{
      if(prev.some((i) => i.id === item.id )) return prev;
      return [...prev, item]
    })
  }
 useEffect(() =>{
  localStorage.setItem("favorites", JSON.stringify(favorites))
 }, [favorites])
 const removeFromFavorites =(id) =>{
  setFavorites ((prev) => prev.filter((i) => i.id !== id))
 }










  // ..cart..//

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });



//......increase and decrease quantity of items in the cart 


const increaseQuantity = (Id) => {
  setCartItems((prevItems) =>prevItems.map(item =>
item.id === Id ? {...item, quantity: item.quantity + 1} : item
  ))
}


//......decrease quantity of items in the cart...//

const decreaseQuantity = (Id) => {
  setCartItems((prevItems) =>
    prevItems.map(item =>
      item.id === Id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item
    )
  );
}


//.....remove item from the cart...//

const removeFromCart = (Id) => {
  setCartItems((prevItems) => prevItems.filter(item => item.id !== Id));
};

  



  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
            : cartItem
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart , increaseQuantity, decreaseQuantity , removeFromCart ,addToFavorites , favorites ,removeFromFavorites}}>
      {children}
    </CartContext.Provider>
  );
}
