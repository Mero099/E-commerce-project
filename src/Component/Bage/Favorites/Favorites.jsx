import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext';
import PageTransitions from '../PageTransitions';
import Product from '../../slideProduct/Product';

  

export default function Favorites() {

    const {favorites }  = useContext(CartContext);
  return (
  <PageTransitions>
    <div className="products_favorites">
        <div className="container">
            <div className="top_slide">
                <h2>your favorites</h2>
            </div>
            { favorites.length === 0 ?(
                <p>No Favorites</p>
            ) : (
                    <div className="products">
                        {favorites.map(item =>(
                             <Product item={item} key={item.id} />
                        ))}
                    
                </div>
            )}
        </div>
    </div>
  </PageTransitions>
  )
}

