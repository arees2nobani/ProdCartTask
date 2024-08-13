import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import SignUpLoginModal from './SignUpLoginModal';



function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const user = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ token: '', userId: '', username: '' });

  useEffect(() => {
    // get cart from local storage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || {};

    // Fetch product details for each product in the cart
    const fetchCartProducts = async () => {
      const productIds = Object.keys(storedCart); // Get product IDs from stored cart
      const fetchedProducts = await Promise.all(productIds.map(async (id) => {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const product = await response.json();
        // Return product details and quantity from stored cart
        return { ...product, quantity: storedCart[id] };
      }));
      setCart(fetchedProducts); // Update state with fetched products
    };

    fetchCartProducts();
  }, []);

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
        const updatedCart = cart.filter(item => item.id !== productId); // Filter out the removed product
        setCart(updatedCart); // Update state
        const updatedLocalStorageCart = JSON.parse(localStorage.getItem('cart'));
        delete updatedLocalStorageCart[productId]; // Remove product from local storage
        localStorage.setItem('cart', JSON.stringify(updatedLocalStorageCart));
        Swal.fire('Removed!', 'The item has been removed from your cart.', 'success');
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: parseInt(quantity, 10) } : item
    );
    setCart(updatedCart);

    const updatedLocalStorageCart = JSON.parse(localStorage.getItem('cart'));
    updatedLocalStorageCart[productId] = parseInt(quantity, 10);
    localStorage.setItem('cart', JSON.stringify(updatedLocalStorageCart));
  };

  const calculateTotal = () => {
    // Calculate the total cost of items in the cart
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
      localStorage.removeItem('cart'); // need to fix it shouldn't remove everything 
    });
  };

  const backToHome = () => {
    navigate('/'); // Navigate back but not working right
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
          {/* <div className='loginCart'> */}

          {isLoggedIn ? (
              <button className='loginSignup' onClick={goToProfile}>
                {user.username}
              </button>
            ) : (
              <button className='loginSignup' onClick={() => setIsModalOpen(true)}>Login</button>
            )}
          <button className='backBTN' onClick={backToHome}>Go Back</button>
          {/* </div> */}
        </div>
      </div>
      <br />
      <br />

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
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
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
          
          <br />
          
          <div className='buyDiv'>
            <button onClick={handleBuy} className='buyBTN'>Buy</button>
          </div>
          <br />
          <br />
          <br />
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
