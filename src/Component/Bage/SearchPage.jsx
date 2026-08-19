// ...existing code...
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PageTransitions from './PageTransitions'
import Product from '../slideProduct/Product'

export default function SearchPage() {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('query') || ''
  const cleanQuery = query.trim()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const fetchResults = async () => {
      setLoading(true)

      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(cleanQuery)}`
        )

        if (!res.ok) throw new Error('Failed to fetch search results')

        const data = await res.json()
        if (!active) return

        setResults(data.products || [])
      } catch (error) {
        console.error('search Error:', error)
        if (active) setResults([])
      } finally {
        if (active) setLoading(false)
      }
    }

    if (cleanQuery) {
      fetchResults()
    } else {
      setResults([])
      setLoading(false)
    }

    return () => {
      active = false
    }
  }, [cleanQuery])

  return (
    <PageTransitions key={cleanQuery}>
      <div className='categoryPage'>
        <div className='container'>
          <div className='top_slide'>
            <h2>Result for: {cleanQuery || 'All'}</h2>
          </div>

          <div className='products'>
            {loading ? (
              <p>Loading...</p>
            ) : results.length > 0 ? (
              results.map((item) => <Product item={item} key={item.id} />)
            ) : (
              <p>No Results found</p>
            )}
          </div>
        </div>
      </div>
    </PageTransitions>
  )
}
// ...existing code...