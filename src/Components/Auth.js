import React, {useState} from "react";
import {connect} from "react-redux";
import {registerUser, loginUser} from "../Redux/authReducer"

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

   return (
      <div>
         <div>
            <h2>username</h2>
            <input value={username} placeholder="username" onChange={(event) => setUsername(event.target.value)}/>
            <h2>password</h2>
            <input value={password} type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)}/>
            {registerToggle 
            ? (
               <>
                  <h2>Verify Password</h2>
                  <input value={verPassword} type="password" placeholder="Verify Password" onChange={(event) => setVerPassword(event.target.value)}/>
               </>) 
            : null
            }
         </div>
            {!registerToggle 
            ? (
               <>
                  <button onClick={() => handleLogin()}>Login</button>
                  <p>Do not have an account? <span onClick={() => setRegisterToggle(!registerToggle)}>Register</span></p>
               </>)
            : (
               <>
                  <button onClick={() => handleRegister()}>Register</button>
                  <p>have an account? <span onClick={() => setRegisterToggle(!registerToggle)}>Login</span></p>
               </>)
            }
      </div>
   )
}

export default connect(null, {registerUser, loginUser})(Auth);
