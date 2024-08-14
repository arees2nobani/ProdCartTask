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
    if (isLoggedIn) {
      fetchCartItems(user.userId); 
    }
  }, [isLoggedIn, user.userId]);


  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/${userId}`); 
      const data = await response.json();
      setCart(data.products); 
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
        Swal.fire('Removed!', 'The item has been removed from your cart.', 'success');
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

  const handleBuy = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Bought successfully",
      showConfirmButton: false,
      timer: 1300
    }).then(() => {
      setCart([]); 
    });
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

  return (
    <div>
      <div className='divHeader'>
        <div className='shopCart'>
          <i><h1>Cart</h1></i>
                <pre />
                <pre />
                <pre />
                <pre />
                <pre />
                <pre />
                <pre />
                <pre />
                <pre />
                <pre />
                <pre />
                <pre />
                <pre />
                <pre />
          {isLoggedIn ? (
            <button className='loginSignup' onClick={goToProfile}>
              {user.username}
            </button>
          ) : (
            <button className='loginSignup' onClick={() => setIsModalOpen(true)}>Login</button>
          )}
          <button className='backBTN' onClick={backToHome}>Go Back</button>
        </div>
      </div>
      <br />

      {cart.length === 0 ? (
        isLoggedIn ?(
          <h4><i>
              <span className="spanen">&nbsp;</span> 
              <span className="spanen">&nbsp;</span>
              <span className="spanen">&nbsp;</span>
              <span className="spanen">&nbsp;</span>
              <span className="spanen">&nbsp;</span> 
              <span className="spanen">&nbsp;</span>
              <span className="spanen">&nbsp;</span>
              <span className="spanen">&nbsp;</span>
              Your cart is empty.
              </i></h4>
            ):

          
            <h4><i>
              <span className="spanen">&nbsp;</span> 
              <span className="spanen">&nbsp;</span>
              <span className="spanen">&nbsp;</span>
              <span className="spanen">&nbsp;</span>
              <span className="spanen">&nbsp;</span> 
              <span className="spanen">&nbsp;</span>
              <span className="spanen">&nbsp;</span>
              <span className="spanen">&nbsp;</span>
              login to see your cart.
              </i></h4>
          

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
          <br /><br /><br />
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
