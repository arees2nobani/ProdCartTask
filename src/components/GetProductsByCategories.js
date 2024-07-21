import React, { useState, useEffect } from 'react';

const TruncatedText = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };

  const displayText = isTruncated ? text.slice(0, maxLength) : text;

  return (
    <p>
      {displayText}
      {text.length > maxLength && (
        <span onClick={toggleTruncation} style={{ color: 'blue', cursor: 'pointer', fontSize: '1.4rem' }}>
          {isTruncated ? '... (see more)' : ' (see less)'}
        </span>
      )}
    </p>
  );
};

function GetProductByCategory() {
  const [productCategory, setProductCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {
        console.log(data); 
        setCategories(data);
      })
      .catch(err => {
        console.error('Error fetching categories: ', err);
      });
  }, []);

  useEffect(() => {
    if (productCategory) {
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
    }
  }, [productCategory]);

  const handleAddToCart = (productId, quantity = 1) => {
    fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1,
        products: [
          {
            id: productId,
            quantity: quantity,
          }
        ]
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Added to cart:', data);
      alert('added to cart')

    })
    .catch(err => {
      console.error('Error adding to cart:', err);
    });
  };



  return (
    <div className='Selection'>
      <h2>MyShop</h2>
      <select
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
      >
        <option value="" disabled>Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category.slug}>{category.name}</option>
        ))}
      </select>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {products.length > 0 && (
        <div className="showProduct" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {products.map((product) => (
            <div key={product.id} style={{ flex: '1 0 30%', margin: '1%' }}>
              <h3>{product.title}</h3>
              <img src={product.thumbnail} alt={product.title} style={{ width: '60%' }} />
              <TruncatedText text={product.description} maxLength={50} />
              <p>Price: ${product.price}</p>
              <button className='btnCart' onClick={() => handleAddToCart(product.id)}>+ ADD </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetProductByCategory;

