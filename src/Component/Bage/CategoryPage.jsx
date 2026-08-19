import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Product from '../slideProduct/Product';
import './CategoryPage.css'
import PageTransitions from './PageTransitions';

export default function CategoryPage() {

const { category } = useParams();
const [CategoryProducts, setCategoryProducts] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
  fetch (`https://dummyjson.com/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => {setCategoryProducts(data.products); setLoading(false)})
    .catch((error) => {
      console.error('Error fetching category products:', error);
      setLoading(false);
    });
}, [category]);

  return (
    <PageTransitions key={category}>
          <div className='categoryPage'>
      <div className="container"> 
        
         <div className="top_slide">
            <h2>{category}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit Tempora deleniti.</p>
          </div>

        <div className="products">
          {loading ? (
            <p>Loading...</p>
          ) : (
            CategoryProducts?.map((item, index) => (
              <Product item={item} key={index} />
            ))
          )}
        </div>
      </div>
    </div>
    </PageTransitions>
  )
}
