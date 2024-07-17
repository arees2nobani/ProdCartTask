import React, { useState } from 'react';

function GetProductByCategory() {
  const [productCategory, setProductCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductByCategory = () => {
    setLoading(true);
    setError(null);
    fetch(`https://dummyjson.com/products/category/${productCategory}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('404 Not Found');
        }
        return res.json();
      })
      .then(data => {
        console.log(data); 
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error: ', err);
        setError(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Get Products By Category</h1>
      <input
        type="text"
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
        placeholder="Enter Product Category"
      />
      <button onClick={fetchProductByCategory}>Get Products</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {products.length > 0 && (
        <div>
          {products.map((product) => (
            <div key={product.id}>
                {product.id} - {product.title} -{product.category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetProductByCategory;
