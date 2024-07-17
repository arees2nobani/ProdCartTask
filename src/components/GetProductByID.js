import React, { useState } from 'react';

function GetProductByID() {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductById = () => {
    setLoading(true);
    setError(null);
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('404 Not Found');
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Get Product By ID</h1>
      <input
        type="number"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Enter Product ID"
      />
      <button onClick={fetchProductById}>Get Product</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {product && (
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <img src={product.thumbnail} alt={product.title} />
        </div>
      )}
    </div>
  );
}

export default GetProductByID;

