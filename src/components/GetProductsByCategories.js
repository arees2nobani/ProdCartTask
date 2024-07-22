import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

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
        <span onClick={toggleTruncation} style={{ color: 'blue', cursor: 'pointer', fontSize: '1.0rem' }}>
          {isTruncated ? ' ...see more' : ' ...see less'}
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
  const [query, setQuery] = useState('');



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

        Swal.fire({
          position: "center",
          icon: "success",
          title: "added to Cart!",
          showConfirmButton: false,
          timer: 1300
        });   
      
    })
    .catch(err => {
      console.error('Error adding to cart:', err);
    });
  };
  //search

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

const handleKeyPress = (e) => { // Added function to handle key press
  if (e.key === 'Enter') {
    searchProducts();
  }
};
/////////////////////////////



  return (
    <div className='Selection'>
      <div className='divHeader'>
      <i><h1>MyShop</h1></i>
      
      <select
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
        className='selectCSS'
      >
        <option value="" disabled>Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category.slug}>{category.name}</option>
        ))}
      </select>
      
      {/* search sort (by price arc or desc)  add cart to see the added products and they can be deleted from it */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Search.. "
        className='inputOfSearch'
        onKeyPress={handleKeyPress}
      />
      
      </div> 

      <br />      
      <br />

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

