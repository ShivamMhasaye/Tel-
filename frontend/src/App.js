import './App.css';
import Login from './component/Login';
import { Routes, Route } from "react-router-dom"
import Userroutes from './component/Routes/Userroutes';
//import Adminrout from './component/Routes/Adminrout';
import Registration from './component/Register';

import Home from './component/Home';
import User from './component/Routes/User';
//import Client1 from './component/Routes/Client1';


function App() {
  return (
    <>
    
    
  <Routes>
    <Route path="/" element={ <Home/>}/>
    <Route path="/login" element={ <Login/>}/>
   
    <Route path="/register" element={ <Registration/>}/>
    <Route path="/userRoutes" element={ <Userroutes/>}/>
    <Route path="/user" component={<User/>}/>
  </Routes>
  
    </>
  );
}

export default App;