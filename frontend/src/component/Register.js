// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import a1Image from './img/bgdashboard.jpg';

// function Registration() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     contact_number: "",
//     email_id: ""
//     // Default role for registration, adjust as needed
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData, "formData");

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/auth/register",
//         formData
//       );
//       console.log("response", response);
//       if (response.status === 200) {
//         setFormData({
//           username: "",
//           password: "",
//           contact_number: "",
//           email_id: ""
//         });
//         alert(`congratulation ${response.data.username} succesfully register`);
//         navigate("/");
//       } else {
//         console.error("Registration failed");
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//     }
//   };

//   return (
//     <div className="container-fluid p-5" style={{ backgroundImage: `url(${a1Image})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <div className="card" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#fff', border: '2px solid #fff' }}>
//         <div className="card-header text-center">
//         <h3>Register</h3>
//         </div>
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group mb-3">
//               <label htmlFor="email" style={{ color: '#fff' }}>Username</label>
//               <input type="username" className="form-control" id="username" name="username" placeholder="Enter username" required onChange={handleChange} value={formData.username} />
//             </div>
            
//             <div className="form-group mb-3">
//               <label htmlFor="password" style={{ color: '#fff' }}>Password</label>
//               <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" required onChange={handleChange} value={formData.password} />
//             </div>

//             <div className="form-group mb-3">
//               <label htmlFor="contact_number" style={{ color: '#fff' }}>Contact Number</label>
//               <input type="contact_number" className="form-control" id="contact_number" name="contact_number" placeholder="Enter your contact number"  required  value={formData.contact_number} onChange={handleChange}/>
//             </div>
//             <div className="form-group mb-3">
//               <label htmlFor="email_id" style={{ color: '#fff' }}>Email</label>
//               <input type="email_id" className="form-control" id="email_id" name="email_id" placeholder="Enter your Email" required onChange={handleChange} value={formData.email_id} />
//             </div>

//             {/* <div className="form-check mb-3">
//               <input type="checkbox" className="form-check-input" id="remember" name="remember_me" onChange={handleChange} checked={formData.remember_me} />
//               <label className="form-check-label" htmlFor="remember" style={{ color: '#fff' }}>Remember me</label>
//             </div> */}
//             <button type="submit" className="btn btn-light d-block mx-auto">Submit</button>
//           </form>
//         </div>
//         {/* <div className="card-footer text-center">
//           <p className="text-muted">Don't have an account? <Link to="/register" style={{ color: '#fff' }}>Register</Link></p>
//         </div> */}
//       </div>
//     </div>
//   );
// }

//export default Registration;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Removed unused 'Link' import
import a1Image from './img/bgdashboard.jpg';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    contact_number: "",
    email_id: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        formData
      );

      if (response.status === 200) {
        setFormData({
          username: "",
          password: "",
          contact_number: "",
          email_id: ""
        });
        alert(`Congratulations ${response.data.username}, you have successfully registered!`);
        navigate("/");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="container-fluid p-5" style={{ backgroundImage: `url(${a1Image})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#fff', border: '2px solid #fff' }}>
        <div className="card-header text-center">
        <h3>Register</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" style={{ color: '#fff' }}>Username</label>
              <input type="username" className="form-control" id="username" name="username" placeholder="Enter username" required onChange={handleChange} value={formData.username} />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="password" style={{ color: '#fff' }}>Password</label>
              <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" required onChange={handleChange} value={formData.password} />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="contact_number" style={{ color: '#fff' }}>Contact Number</label>
              <input type="contact_number" className="form-control" id="contact_number" name="contact_number" placeholder="Enter your contact number"  required  value={formData.contact_number} onChange={handleChange}/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email_id" style={{ color: '#fff' }}>Email</label>
              <input type="email_id" className="form-control" id="email_id" name="email_id" placeholder="Enter your Email" required onChange={handleChange} value={formData.email_id} />
            </div>

            {/* <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="remember" name="remember_me" onChange={handleChange} checked={formData.remember_me} />
              <label className="form-check-label" htmlFor="remember" style={{ color: '#fff' }}>Remember me</label>
            </div> */}
            <button type="submit" className="btn btn-light d-block mx-auto">Submit</button>
          </form>
        </div>
        {/* <div className="card-footer text-center">
          <p className="text-muted">Don't have an account? <Link to="/register" style={{ color: '#fff' }}>Register</Link></p>
        </div> */}
      </div>
    </div>
  );
}

export default Registration;