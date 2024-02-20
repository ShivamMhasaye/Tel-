import React from 'react';
import compimage from '../img/comp.png';
import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../img/bgdash.jpg';


function Userroutes() {
  const navigate = useNavigate();
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };
  const openMultipleTabs = () => {
    openInNewTab("http://localhost:8086/signin");
    openInNewTab("http://localhost:3000");
  };
  const handleLogout =  () => {
    
    
        alert("Logout successful");
        navigate("/");
     
  };
  return (
    <div className="container-fluid" style={{ height: '100vh', backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 className="text-white mb-5">Client Monitoring System</h1>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-3">
            <div className="card" style={{ width: '10rem', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <img className="card-img-top" src={compimage} alt="Card image cap" />
              {/* <div className="card-body d-flex justify-content-center align-items-center">
                <Link to={openInNewTab} className="btn btn-primary btn-sm">Client 1</Link>
              </div> */}
              <div className="card-body d-flex justify-content-center align-items-center">
                <button
                     onClick={openMultipleTabs}
                     className="btn btn-primary btn-sm"
                >
                 Client 1
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card" style={{ width: '10rem', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <img className="card-img-top" src={compimage} alt="Card image cap" />
              <div className="card-body d-flex justify-content-center align-items-center">
              <button
                     onClick={openMultipleTabs}
                     className="btn btn-primary btn-sm"
                >
                 Client 2
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card" style={{ width: '10rem', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <img className="card-img-top" src={compimage} alt="Card image cap" />
              <div className="card-body d-flex justify-content-center align-items-center">
              <button
                     onClick={openMultipleTabs}
                     className="btn btn-primary btn-sm"
                >
                 Client 3
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card" style={{ width: '10rem', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <img className="card-img-top" src={compimage} alt="Card image cap" />
              <div className="card-body d-flex justify-content-center align-items-center">
              <button
                     onClick={openMultipleTabs}
                     className="btn btn-primary btn-sm"
                >
                 Client 4
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="btn btn-light btn-outline-danger"
        style={{ position: 'absolute', bottom: '10px', right: '10px' }}
      >
        Logout
      </button>
    </div>
  );
}

export default Userroutes;
