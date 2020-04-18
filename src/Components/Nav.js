import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser, getCurrentUser} from "../Redux/authReducer";


const Nav = (props) => {


   useEffect(() => {
      console.log(props)
      props.getCurrentUser();
   },[])
   const handleLogout = () => {
      
   }

   return(
      <div className="nav-container">
      {console.log(props)}
         <div>
            <div className="logo"> LOGO </div>
            <nav className="menu-one-container">
               <Link to="/dashboard">
               <h3 className="menu-one">HOME</h3>
               </Link>
               <h3 className="menu-one">|</h3>
               <h3 className="menu-one">{props.user.username}</h3>
               <h3 className="menu-one">|</h3>
               <h3 className="menu-one" onClick={()=> handleLogout()}>LOGOUT</h3>
            </nav>
         </div>
         <nav className="menu-two-container">
               <Link to="/bid">
            <h3 className="menu-two">Bid</h3>
               </Link>
               <Link to="/payroll">
            <h3 className="menu-two">PAYROLL</h3>
               </Link>
               <Link to="/data">
            <h3 className="menu-two">PRODUCT DATABASE</h3>
               </Link>
            <h3 className="menu-two">LABOR/PRODUCTION ADJUSTMENTS</h3>
            <h3 className="menu-two">WIZARD</h3>
         </nav>
      </div>
   )
}
const mapStateToProps = (reduxState) => reduxState.auth
export default connect(mapStateToProps, {logoutUser, getCurrentUser})(Nav);