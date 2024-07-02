


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
 

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    const userData = { name, email, password };

    try {
      const response = await axios.post(`https://spyne-backend-79kw.onrender.com/api/v1/auth/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success("Sign In");
          navigate('/home');
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Username Already Exists');
    }
  };

  return (
    <div className='outer-wrapper'>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Signup</h1>


          <div className="input-box">
            <input 
              type="text" 
              placeholder="Name"  
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required 
            />
            <i className='bx bxs-user'></i>
          </div>

          <div className="input-box">
            <input 
              type="text" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <i className='bx bxs-user'></i>
          </div>
          
          <div className="input-box">
            <input 
              type="password" 
              placeholder="Password"  
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <i className='bx bxs-lock-alt' ></i>
          </div>

          <div className="input-box">
            <input 
              type="password" 
              placeholder="Confirm Password"  
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
            <i className='bx bxs-lock-alt' ></i>
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}


          <button type="submit" className="btn">Signup</button>
          
          <div className="register-link">
            <p>Have an Account? <Link to="/">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
