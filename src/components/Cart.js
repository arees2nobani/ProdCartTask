import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import './Profile.css';



function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  // const history = useHistory();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || {};
    const fetchCartProducts = async () => {
      const productIds = Object.keys(storedCart);
      const fetchedProducts = await Promise.all(productIds.map(async (id) => {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const product = await response.json();
        return { ...product, quantity: storedCart[id] };
      }));
      setCart(fetchedProducts);
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
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        const updatedLocalStorageCart = JSON.parse(localStorage.getItem('cart'));
        delete updatedLocalStorageCart[productId];
        localStorage.setItem('cart', JSON.stringify(updatedLocalStorageCart));
        Swal.fire('Removed!', 'The item has been removed from your cart.', 'success');
      }
    });
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
    });
  };

  const backToHome = () => {
    navigate(-1);
    };

  // const backToHome = () => {
  //   history.backToHome();
  // };

  

  return (
    <div>
      <div className='divHeader'>
        <div className='shopCart'>
          <i><h1>Cart</h1></i>
          <button className='backBTN' onClick={backToHome}>Go Back</button>
        </div>
      </div>

      <br />
      <br />
      
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>


          
        {cart.length !== 0 && (
        <>
          <div className="showProduct" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {cart.map((product) => (
              <div key={product.id} style={{ flex: '1 0 30%', margin: '1%' }}>
                <h3>{product.title}</h3>
                <img src={product.thumbnail} alt={product.title} style={{ width: '60%' }} />
                <p>Price: ${product.price}</p>
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

        </div>
      )}
    </div>
  );
}

export default Cart;

