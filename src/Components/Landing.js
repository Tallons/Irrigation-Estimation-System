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
               <h2 >{window.innerWidth <= 1100 ? "" : "|"} </h2>
               <a href="https://www.ecoverdeirrigation.com/smart-irrigation">
                  <h2  className="menu">SMART IRRIGATION</h2></a>
                  <h2 >{window.innerWidth <= 1100 ? "" : "|"} </h2>
               <a href="https://www.ecoverdeirrigation.com/our-services-and-more"> 
               <h2 className="menu">SERVICES</h2> </a>
               </div>
         </header>
         <div className="main-container">
            <div className="main">
            <div className="info">
               <h1><strong>Irrigation Estimating</strong><br></br>at its Finest</h1>
               <br></br>
               <h2>sponsored by:<br></br> Eco Verde Irrigation</h2>
               <br></br>
               <p>Eco Verde Estimating was created specifically for Irrigation Contractors; to aid in the planning and estimation process of proposals, bids, and other related business needs. This site contains business information and has been created for the use of authorized individuals. Please contact Eco Verde Irrigation or click register to send a request to a representative.</p> 
            </div>
                  <Auth />
                  </div>
         </div>

      </div>
   )
}
export default Landing;