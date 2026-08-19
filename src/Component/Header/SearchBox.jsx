import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function SearchBox() {

  const [SearchTerm, setSearchTerm] = useState("");
  const [Suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (SearchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(SearchTerm.trim())}`);
    }
    setSuggestions([])
  };

  useEffect(() => {
    const fetchSuggestions = async () => {

      if (!SearchTerm.trim()) {
         setSuggestions([]);
         return;
      }

      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(SearchTerm)}`
        );
        const data = await res.json();
        setSuggestions(data.products.slice(0, 5) || []);
      } catch (error) {
        console.error('search Error:', error);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(() => {
      if (SearchTerm.trim()) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [SearchTerm]);


useEffect (()=>{
 setSuggestions([]);
},[location])



  return (
    <div className='search_box_Container'>
             <form onSubmit={handleSubmit} className="search_box">
           <input type="text" name="search" id="search" placeholder="search for products" onChange={(e) => setSearchTerm (e.target.value)} 
           autoComplete='off'
           />
           <button type="submit"><FaSearch /></button>
       </form>

        {Suggestions.length > 0 && (
          <ul className='Suggestions'>
             {Suggestions.map((item) => (
             <Link key={item.id} to={`/products/${item.id}`}>
               <li> <img src={item.images[0]} alt="" /> <span>{item.title}</span> </li>
            </Link>
            
             ))}
          </ul>
        )} 
    </div>
  )
}
