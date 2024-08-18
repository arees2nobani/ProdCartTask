import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import SignUpLoginModal from './SignUpLoginModal';

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ token: '', userId: '', username: '' });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsLoggedIn(true);
      fetchCartItems(userData.userId);
    }
  }, []);

  // const fetchCartItems = async (userId) => {
  //   try {
  //     const response = await fetch(`https://dummyjson.com/carts/${userId}`); 
  //     const data = await response.json();
  //     setCart(data.products); 
  //   } catch (err) {
  //     console.error('Error fetching cart:', err);
  //   }
  // };

  const fetchCartItems = async (userId) => {
    try {
      // Fetch products from API
      const response = await fetch(`https://dummyjson.com/carts/${userId}`);
      const data = await response.json();
  
      // Fetch all products to match with local storage items
      const productsResponse = await fetch(`https://dummyjson.com/products`);
      const allProducts = await productsResponse.json();
  
      // Fetch products from local storage
      const localCart = JSON.parse(localStorage.getItem('cart')) || {};
      const userLocalCart = localCart[userId] || {};
  
      // Combine the API and local storage products
      const combinedProducts = [
        ...data.products,
        ...Object.keys(userLocalCart).map(productId => {
          const product = allProducts.products.find(p => p.id === parseInt(productId, 10));
          return {
            id: product.id,
            title: product.title, 
            thumbnail: product.thumbnail,
            price: product.price, 
            quantity: userLocalCart[productId],
          };
        }),
      ];
  
      setCart(combinedProducts);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };
  
  

  const handleRemoveFromCart = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to remove this item from the cart?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        Swal.fire({
          title: 'Removed!', 
          text: 'The item has been removed from your cart.', 
          showConfirmButton: false, 
          icon: 'success',
          timer: 1500
        });
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: parseInt(quantity, 10) } : item
    );
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // const handleBuy = () => {
  //   if (calculateTotal() === 0) {
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'error',
  //       title: 'Buy failed!',
  //       text: 'Your cart is empty',
  //       showConfirmButton: true,
  //     });
  //   } else {
  //     Swal.fire({
  //       position: "center",
  //       icon: "success",
  //       title: "Bought successfully",
  //       showConfirmButton: false,
  //       timer: 1300
  //     }).then(() => {
  //       setCart([]); 
  //     });
  //   }
  // };

  const handleBuy = () => {
    if (calculateTotal() === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Buy failed!',
        text: 'Your cart is empty',
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Bought successfully",
        showConfirmButton: false,
        timer: 1300
      }).then(() => {
        const localCart = JSON.parse(localStorage.getItem('cart')) || {};
        delete localCart[user.userId]; // Remove only the purchased items for the user
        localStorage.setItem('cart', JSON.stringify(localCart));
        setCart([]); // Clear the cart after purchase
      });
    }
  };
  

  const backToHome = () => {
    navigate('/'); 
  };

  const goToProfile = () => {
    navigate('/profile', { state: { userId: user.userId } });
  };

  const handleLogin = (username, password) => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, expiresInMins: 60 }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        setUser({ token: data.token, userId: data.id, username: data.username }); 
        setIsLoggedIn(true); 
        localStorage.setItem('user', JSON.stringify({
          token: data.token,
          userId: data.id,
          username: data.username,
        }));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login successful!',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
      } else {
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
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Login failed!',
        text: 'An unexpected error occurred.',
        showConfirmButton: true,
      });
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser({ token: '', userId: '', username: '' });
    setIsLoggedIn(false);
    navigate('/');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logged out successfully!',
      showConfirmButton: false,
      timer: 1500,
    });
  };
  
  return (
    <div>
      <div className='divHeader'>
        <div className='shopCart'>
          <i><h1>Cart</h1></i>
          <pre /> <pre /> <pre /> <pre /> <pre /> <pre /> <pre /> <pre />
          
          {isLoggedIn ? (
              <>
                <button className='loginSignup' onClick={goToProfile}>
                  {user.username}
                </button>
                <button className='loginSignup' onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <button className='loginSignup' onClick={() => setIsModalOpen(true)}>Login</button>
          )}

          <button className='backBTN' onClick={backToHome}>Home</button>
        </div>
      </div>
      <br />
      {cart.length === 0 ? (
        isLoggedIn ? (
          <h4><i>Your cart is empty.</i></h4>
        ) : (
          <h4><i>Login to see your cart.</i></h4>
        )
      ) : (
        <>
          <div className="showProduct" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {cart.map((product) => (
              <div key={product.id} style={{ flex: '1 0 30%', margin: '1%' }}>
                <h3>{product.title}</h3>
                <img src={product.thumbnail} alt={product.title} style={{ width: '60%' }} />
                <p>Price: ${product.price}</p>
                <p>
                  Quantity: 
                  <input 
                    type="number" 
                    value={product.quantity} 
                    onChange={(e) => updateQuantity(product.id, e.target.value)} 
                    min="1"
                    max="20"
                  />
                </p>
                <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
              </div>
            ))}
          </div>
          <br />
          <div className='totalAmount'>
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
            <button onClick={handleBuy} className='buyBTN'>Buy</button>
          </div>
          <br /> <br /> <br />
        </>
      )}
      <SignUpLoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default Cart;
