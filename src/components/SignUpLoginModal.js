import  { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


const SignUpLoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true); 
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  


  
  const handleSignUp = () => {
    fetch('https://dummyjson.com/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    .then(res => res.json())
    .then(data => {
      console.log('Sign-up successful:', data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sign-up successful! Please log in.',
        showConfirmButton: false,
        timer: 1500,
      });
      setIsLogin(true);
    })
    .catch(err => {
      console.error('Sign-up error:', err);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Sign-up failed!',
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  const handleSubmit = (username1, password1) => {
    if (isLogin) {
      onLogin(username1, password1);
    } else {
      handleSignUp();
    }
  };

  const showSwalModal = () => {

    Swal.fire({
      title: isLogin ? 'Login' : 'Sign Up',
      html: `
        <input id="username" class="swal2-input" placeholder="Username">
        <input  id="password" class="swal2-input" type="password" placeholder="Password">
        <p style="cursor: pointer; color: blue;" id="swal-switch">
          ${isLogin ? 'Create an account' : 'Already have an account? Log in'}
        </p>
      `,
      showCancelButton: true,
      confirmButtonText: isLogin ? 'Login' : 'Sign Up',

      preConfirm: () => {

        const username = document.getElementById('username').value;        
        const password = document.getElementById('password').value;

        setUsername(username);
        setPassword(password);
        return { username, password };
      },
      willClose: onClose,
    }).then(result => {

      if (result.isConfirmed) 
        handleSubmit(result.value.username, result.value.password);
    });

    


    document.getElementById('swal-switch').addEventListener('click', () => {
      setIsLogin(!isLogin);
      Swal.update({
        title: !isLogin ? 'Login' : 'Sign Up',
        html: `
          <input id="username" class="swal2-input" placeholder="Username">
          <input id="password" class="swal2-input" type="password" placeholder="Password">
          <p style="cursor: pointer; color: blue;" id="swal-switch">
            ${!isLogin ? 'Create an account' : 'Already have an account? Log in'}
          </p>
        `,
        showCancelButton: true,
        confirmButtonText: !isLogin ? 'Login' : 'Sign Up',
        preConfirm: () => {
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          setUsername(username);
          setPassword(password);
          return { username, password };
        },
      });

      document.getElementById('swal-switch').addEventListener('click', () => {
        setIsLogin(!isLogin);
        showSwalModal(); 
      });
    });
  };

  useEffect(() => {
    if (isOpen) {
      showSwalModal();
    }
  }, [isOpen]);

  return null;
};

export default SignUpLoginModal;

