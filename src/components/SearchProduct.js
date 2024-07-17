import React, { useState } from 'react';

function SearchProduct() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchProducts = () => {
    setLoading(true);
    setError(null);
    fetch(`https://dummyjson.com/products/search?q=${query}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('not found');
        }
        return res.json();
      })
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Search Products</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
      />
      <button onClick={searchProducts}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <img src={product.thumbnail} alt={product.title} />
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No products found</p>
      )}
    </div>
  );
}

export default SearchProduct;
