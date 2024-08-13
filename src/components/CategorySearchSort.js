import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import SignUpLoginModal from './SignUpLoginModal'; 



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

  const [sortOrder, setSortOrder] = useState('asc'); 

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [ setUser] = useState({ token: '', userId: '' });

  const [user, setUser] = useState({ token: '', userId: '', username: '' });

  // const [user, setUser] = useState({ token: '', userId: '' });



  /////////////////////////////

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

  /////////////////////////////

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

  /////////////////////////////

  const handleAddToCart = (productId, quantity = 1) => {
    if (!isLoggedIn) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please login first!',
        showConfirmButton: true,
      });
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('cart')) || {};
    const userCart = existingCart[user.userId] || {};
    // const newCart = {
    //   ...existingCart,
    //   [productId]: (existingCart[productId] || 0) + quantity,
    // };
    // localStorage.setItem('cart', JSON.stringify(newCart));

    const updatedUserCart = {
      ...userCart,
      [productId]: (userCart[productId] || 0) + quantity,
    };

    localStorage.setItem('cart', JSON.stringify({ ...existingCart, [user.userId]: updatedUserCart }));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "added to Cart!",
      showConfirmButton: false,
      timer: 1300
    });
  };

  /////////////////////////////

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

  const handleKeyPress = (e) => { 
    if (e.key === 'Enter') {
      searchProducts();
    }
  };

  /////////////////////////////


  const handleLogin = (username, password) => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, expiresInMins: 60 }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        console.log('Login successful:', data);
        setUser({ token: data.token, userId: data.id, username: data.username });
        setIsLoggedIn(true);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login successful!',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
      } else {
        console.error('Login failed:', data);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Login failed!',
          text: data.message || 'Invalid username or password.',
          showConfirmButton: true,
        });
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Login failed!',
        text: 'An unexpected error occurred.',
        showConfirmButton: true,
      });
    });
  };


  /////////////////////////////

  //sort
  const sortProducts = (order) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(sortedProducts);
  };

  /////////////////////////////

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    sortProducts(newOrder);
  };

  /////////////////////////////

  const showCart = () => {
    navigate('/Cart');
  }

  const goToProfile = () => {
    navigate('/profile', { state: { userId: user.userId } });
  };
  

 /////////////////////////////

  return (
    <div className='Selection'>
      <div className='divHeader'>
        <div className='shopCart'>
      <i><h1>MyShop</h1></i>
      <div className='loginCart'>
      {isLoggedIn ? (
              <button className='loginSignup' onClick={goToProfile}>
                {user.username}
              </button>
            ) : (
              <button className='loginSignup' onClick={() => setIsModalOpen(true)}>Login</button>
            )}

        {/* <button className='loginSignup' onClick={() => setIsModalOpen(true)}>Sign Up / Login</button> */}
        <button className='cartbutton' onClick={showCart}>🛒</button>
      </div>
      </div>
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

      <span className="spanen">&nbsp;</span>
      <span className="spanen">&nbsp;</span>
      <span className="spanen">&nbsp;</span>
      <span className="spanen">&nbsp;</span>
      <span className="spanen">&nbsp;</span>
      <span className="spanen">&nbsp;</span>


      <button className='selectCSS' onClick={toggleSortOrder}>Sort products $</button>

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

      {/* print all products of anything but don't keep the page empty at first */}
      {/* or show all products as slides or anything to not make it empty  */}

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
      <SignUpLoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLogin}
      />

    </div>
  );
}

export default GetProductByCategory;
