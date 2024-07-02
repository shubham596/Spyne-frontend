import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const userData = { email, password };
    // console.log(userData);
        try {
          const response = await axios.post(`https://spyne-backend-79kw.onrender.com/api/v1/auth/login`, userData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status === 200) {
            toast.success("Login successfully")
            console.log('Login successful:', response.data);
            navigate('/home');
          } else {
            setError('Wrong username or password');
          }
        } catch (error) {
          console.error('Error during login:', error);
          setError('Something went wrong');
        }
      }; 
      
      const fun=()=>{
        navigate('/home');
      }

  return (
<div className='outer-wrapper'>
 <div className="wrapper">
   
    <form onSubmit={handleSubmit} >
      <h1>Login</h1>
      
      <div className="input-box">
        <input type="text" placeholder="email"   value={email}
            onChange={(e) => setEmail(e.target.value)}  required/>
        <i className='bx bxs-user'></i>
      </div>
      <div className="input-box">
        <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required/>
        <i className='bx bxs-lock-alt' ></i>
      </div>
    

{error && <p className="error"> {error}</p>}

      <button type="submit" className="btn">Login</button>
      <div className="register-link">
        <p>Dont have an account?<Link to={"/signup"}>
Register
</Link></p>
      </div>
  
    </form>
    
  </div>
  <div className='GetDemo' onClick={fun}> Get Demo  </div>
<div className='DemoLogin'> <i>Demo Credential </i>Email:shubham@gmail.com  Password:shubham</div>
  </div>
  )
}

export default Login