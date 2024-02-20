import React from 'react';
import './Home.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="background-image" />
      <div className="content">
        <div className="heading">
          <h1>Telemetry</h1>
          <h1>Insight 
             Hub</h1>
          <p className="slogan">
            "Empowering Connectivity, Transforming Data: Navigating Tomorrow with Our Telemetry Today."
          </p>
        </div>
        <div className="right-content">

          <button className="start-button">
            <Link className="text-decoration-none" to="/login">Get Started </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;