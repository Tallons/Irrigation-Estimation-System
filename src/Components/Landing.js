import React from "react";
import Auth from "./Auth";
import {Link} from "react-router-dom";
import logo from "../screenshot-logo.JPG";
import "./Landing.scss"

const Landing = (props) => {

   console.log(props)
   return (
      <div className="landing">
         <header>
               <img className="logo" src={logo} />
               <div className="menu-container">

               <a href="https://www.ecoverdeirrigation.com/">
                  <h2 className="menu">HOME</h2></a>
               <h2> | </h2>
               <a href="https://www.ecoverdeirrigation.com/smart-irrigation">
                  <h2  className="menu">SMART IRRIGATION</h2></a>
               <h2> | </h2>
               <a href="https://www.ecoverdeirrigation.com/our-services-and-more"> 
               <h2 className="menu">SERVICES</h2> </a>
               </div>
         </header>
         <div className="main-container">
            <div className="main">
            <div className="info"></div>
                  <Auth />
                  </div>
         </div>
      </div>
   )
}
export default Landing;