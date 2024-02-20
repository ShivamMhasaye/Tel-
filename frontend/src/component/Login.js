import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import a1Image from './img/bgdashboard.jpg';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember_me: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formdata", formData);
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        username: formData.username,
        password: formData.password
      });
      console.log(response, "response");
      if (response.status === 200) {
        const { token } = response.data;
        // Save the token to local storage for future requests
        localStorage.setItem('token', token);
        navigate('/userRoutes');
        // Redirect based on user role
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container-fluid p-5" style={{ backgroundImage: `url(${a1Image})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#fff', border: '2px solid #fff' }}>
        <div className="card-header text-center">
          <h3>Login</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" style={{ color: '#fff' }}>Username</label>
              <input type="username" className="form-control" id="username" name="username" placeholder="Enter username" onChange={handleChange} value={formData.username} />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" style={{ color: '#fff' }}>Password</label>
              <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" onChange={handleChange} value={formData.password} />
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="remember" name="remember_me" onChange={handleChange} checked={formData.remember_me} />
              <label className="form-check-label" htmlFor="remember" style={{ color: '#fff' }}>Remember me</label>
            </div>
            <button type="submit" className="btn btn-light d-block mx-auto">Login</button>
          </form>
        </div>
        <div className="card-footer text-center">
          <p className="text-muted">Don't have an account? <Link to="/register" style={{ color: '#fff' }}>Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
