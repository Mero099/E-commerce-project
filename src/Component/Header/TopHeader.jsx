import { Link } from "react-router-dom";
import logo from '../../../imag/imgi_1_logo-DCT27W6d.png'
import { CiHeart } from "react-icons/ci";
import { TiShoppingCart } from "react-icons/ti";
import './Header.css'
import { useContext } from "react";
import { CartContext } from '../context/CartContext';
import SearchBox from "./SearchBox";

export function TopHeader() {
  const { cartItems , favorites = [] } = useContext(CartContext)

  return <>
  <div className="top_header">
    <div className="container">
       <Link className="logo" to="/"><img src={logo} alt="Logo"/> </Link>

       <SearchBox/>
    
       <div className="Header_icons">
         <div className="icon">
        <Link to={"/Favorites"}>  
          <CiHeart />
          <span
           className="count">{favorites.length}
          </span>
        </Link>
          </div>
        
           <div className="icon">
            <Link to="/cart">
               <TiShoppingCart />
              <span className="count">{cartItems.length}</span>
            </Link>
          </div>
        </div>  
    </div>
  </div>
  </>
}
