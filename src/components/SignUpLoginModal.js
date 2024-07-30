import  { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const SignUpLoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  const handleSubmit = () => {
    if (isLogin) {
      onLogin(username, password);
    } else {
      handleSignUp();
    }
  };

  const showSwalModal = () => {
    Swal.fire({
      title: isLogin ? 'Login' : 'Sign Up',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Username">
        <input id="swal-input2" class="swal2-input" type="password" placeholder="Password">
        <p style="cursor: pointer; color: blue;" id="swal-switch">
          ${isLogin ? 'Create an account' : 'Already have an account? Log in'}
        </p>
      `,
      showCancelButton: true,
      confirmButtonText: isLogin ? 'Login' : 'Sign Up',
      preConfirm: () => {
        const username = document.getElementById('swal-input1').value;
        const password = document.getElementById('swal-input2').value;
        setUsername(username);
        setPassword(password);
        return { username, password };
      },
      willClose: onClose,
    }).then(result => {
      if (result.isConfirmed) {
        handleSubmit();
      }
    });

    document.getElementById('swal-switch').addEventListener('click', () => {
      setIsLogin(!isLogin);
      Swal.update({
        title: !isLogin ? 'Login' : 'Sign Up',
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Username">
          <input id="swal-input2" class="swal2-input" type="password" placeholder="Password">
          <p style="cursor: pointer; color: blue;" id="swal-switch">
            ${!isLogin ? 'Create an account' : 'Already have an account? Log in'}
          </p>
        `,
        showCancelButton: true,
        confirmButtonText: !isLogin ? 'Login' : 'Sign Up',
        preConfirm: () => {
          const username = document.getElementById('swal-input1').value;
          const password = document.getElementById('swal-input2').value;
          setUsername(username);
          setPassword(password);
          return { username, password };
        },
      });

      document.getElementById('swal-switch').addEventListener('click', () => {
        setIsLogin(!isLogin);
        showSwalModal(); // Recursively call to switch again
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

