import React, {useState} from "react";
import {connect} from "react-redux";
import {registerUser, loginUser} from "../Redux/authReducer";
import {withRouter} from "react-router-dom";

const Auth = (props) => {
   const [username, setUsername] = useState(""),
         [password, setPassword] = useState(""),
         [verPassword, setVerPassword] = useState(""),
         [registerToggle, setRegisterToggle] = useState(false);


  const handleRegister = () => {
      if (!password){
         console.log("no password");
      } else {
         if (password === verPassword){
            console.log("Acceptable Password");
            props.registerUser(username, password);
            props.history.push("/dashboard");
         }
         else {
            console.log("passwords do not match")
            setVerPassword("");
         }
      }
   }

   const handleLogin = async  () => {
         await props.loginUser(username, password);
         props.history.push("/dashboard");
   }
console.log(props)
   return (
      <div className="auth-container">
         <div className="login-container">
            <h1>Sign In</h1>
            <input value={username} placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
            <input value={password} type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
            {registerToggle 
            ? (
               <>
                  <input value={verPassword} type="password" placeholder="Verify Password" onChange={(event) => setVerPassword(event.target.value)}/>
               </>) 
            : null
            }
         </div>
         <div className="button-container">
            {!registerToggle 
            ? (
               <>
                  <button onClick={() => handleLogin()}>Login</button>
                  <p> 
                  <span className="register-toggle-off" onClick={() => setRegisterToggle(!registerToggle)}>Register</span>
                  <span className="login-toggle-on"onClick={() => setRegisterToggle(!registerToggle)}>Login</span>
                  </p>
               </>)
            : (
               <>
                  <button onClick={() => handleRegister()}>Register</button>
                  <p> 
                  <span className="register-toggle-on" onClick={() => setRegisterToggle(!registerToggle)}>Register</span>
                  <span className="login-toggle-off"onClick={() => setRegisterToggle(!registerToggle)}>Login</span>
                  </p>
               </>)
            }
            </div>
      </div>
   )
}

export default connect(null, {registerUser, loginUser})(withRouter(Auth));
