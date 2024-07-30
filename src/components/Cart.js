import React from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Cart() {
  const location = useLocation();
  const { cart } = location.state || { cart: [] }; 
  const navigate = useNavigate();
  
  const handleRemoveFromCart = () => {
    //   const handleRemoveFromCart = (productId) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to remove this item from the cart?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        // const updatedCart = cart.filter(item => item.id !== productId);
        Swal.fire(
          'Removed!',
          'The item has been removed from your cart.',
          'success'
        );
        // handle updating the cart here
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
    navigate('/');

  }

  return (
    <div>
      <div className='divHeader'>
        <div className='shopCart'>
        <i><h1>Cart</h1></i>
        <button className='backBTN' onClick={backToHome}>go back</button>
        </div>
      
      </div>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          <button onClick={handleBuy}>Buy</button>
        </div>
      )}
    </div>
  );
}

export default Cart;

// import React, { useState, useEffect } from 'react';

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('https://dummyjson.com/carts/51') 
//       .then(res => res.json())
//       .then(data => {
//         setCartItems(data.products);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching cart:', err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (cartItems.length === 0) {
//     return <p>Your cart is empty.</p>;
//   }

//   return (
//     <div>
//       <h2>Your Cart</h2>
//       <ul>
//         {cartItems.map(item => (
//           <li key={item.id}>
//             {item.title} - {item.quantity} x ${item.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Cart;

