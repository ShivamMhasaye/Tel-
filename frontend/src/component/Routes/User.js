import React from 'react';
import cpuimage from '../img/cpuusage.png';
import freemimage from '../img/free memory.png';
import memimage from '../img/hard.png';
import Processimage from '../img/Process.png';
import { Link } from 'react-router-dom';

function User() {
    // Function to open both links in separate windows simultaneously
    
  return (
    <div className="container">
      <div className="row">
        <h1 className="Page-Heading">Performance Monitoring </h1>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <img src={cpuimage} alt="CPU Usage" className="img-fluid mb-3" ></img>
              <p className="card-text">
                <button onClick="http://localhost:8086/signin" className="btn btn-primary btn-sm ">CPU Usage</button>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <img src={freemimage} alt="Free Memory" className="img-fluid mb-3" ></img>
              <p className="card-text">
              <button onClick="http://localhost:8086/signin" className="btn btn-primary btn-sm ">Free Memory</button>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <img src={Processimage} alt="Process" className="img-fluid mb-3" ></img>
              <p className="card-text">
              <Link to="http://localhost:8086/signin" className="btn btn-primary btn-sm ">Memory Usage</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <img src={memimage} alt="Memory Usage" className="img-fluid mb-3" ></img>
              <p className="card-text">
                <Link to="http://localhost:8086/signin" className="btn btn-primary btn-sm ">Memory Usage</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
