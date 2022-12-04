import React from 'react';
import { useState,useEffect} from "react";
import "./header.css";
import Logo from "./myJobs.svg";
import { useHistory } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Header() {
  const history = useHistory();
  const [isLogin,setLogin] = useState(false)
  const [token,setToken] = useState("")
  
  useEffect(()=>{
    const t = localStorage.getItem("token");
    setToken(t)
    if (t){
      setLogin(true)
    }
    else{
      setLogin(false)
    }
  },[token])

  const logoutUser = () =>{
    localStorage.removeItem("token");
    setLogin(false)
    history.push("/login")
    toast.info("You have successfully logged out.");

  }
  // console.log("header", token)
    return (
      <>
        <div className="headerContainer">
          <div className="logo">
          <img src={Logo} alt="React Logo" />
          </div>
          
          <div >
          <ToastContainer/>
            {
              isLogin ?
              < button   className="buttonlogin"onClick={() =>{logoutUser()}} >Logout</button>
             
              :
              <button  className="buttonlogin" onClick={() =>{history.push( "/login")}} >Login</button>
            }
          </div>
        </div>     
        </>    
    );
  }
  
  export default Header;