import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });

      if (response.status === 200) {
        const { userId, token, firstName, lastName, email, role } = response.data;
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('email', email);
        localStorage.setItem('userRole', role);

        localStorage.getItem('userRole')
        if (localStorage.getItem('userRole') === "ROLE_USER") {
          navigate('/home');
        } else {
          navigate('/admin');
        }
      } else {
        toast.error('Login failed');
        navigate('/register');
      }
    } catch (error) {
      toast.error(`Error Logging in: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="background-image"></div>
      <div className="login-box">
        <p>Login</p>
        <form id="loginForm">
          <div className="user-box">
            <input
              required="required"
              name="email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              required="required"
              name="password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <button type="submit" onClick={handleLogin}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
        <p>Don't have an account? <a href="/register" className="a2">Sign up!</a></p>
      </div>
    </div>
  );
};

export default Login;
