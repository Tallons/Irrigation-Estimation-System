import axios from "axios";

const initialState = {
   user: {}
}

const REGISTER_USER = "REGISTER_USER",
            LOGIN_USER = "LOGIN_USER",
            LOGOUT_USER = "LOGOUT_USER",
            GET_CURRENT_USER = "GET_CURRENT_USER";


// export function getUser (userObj) {
//    return {
//       type: GET_USER,
//       payload:userObj
//    }
// }
export function registerUser(username, password){
   let user = axios.post("/api/auth/register")
      .then(({data}) => {
         console.log(data);
         return data
      }).catch(err => console.log(err));
   console.log(user)
   return {
      type: REGISTER_USER,
      payload: user
   }
}

export function loginUser(username, password){
   // const {username, password} = user;
   let user = axios.post("/api/auth/login", {username, password})
      .then(res => {

         return res.data
      }).catch(err => console.log(err));
   console.log(user)
   return {
      type: LOGIN_USER,
      payload: user
   }
};

export function logoutUser(){

 return {
    type: LOGIN_USER,
    payload: axios.post("/api/auth/logout")
 }
};

export function getCurrentUser(){
   let user = axios.get("/api/auth/user")
      .then(res => {
         console.log(res.data);
         return res.data
      }).catch(err => console.log(err));
   console.log(user)
   return {
      type: GET_CURRENT_USER,
      payload: user
   }
}
// export  function getUserInfo() {
//    let user =  axios.get("http://localhost:4500/api/auth/me")
//    .then (res => { 
//       console.log(res.data);
//       return res.data[0] 
//    });
//    console.log(user)
//    return {
//       type: GET_USER_INFO,
//       payload: user
//    };
// };


export default function reducer (state = initialState, action) {
   const {type, payload} = action;
   console.log(payload)
   switch(type){
      case REGISTER_USER + "_FULFILLED": 
      return {...state, user:payload};

      case LOGIN_USER + "_FULFILLED": 
      return {...state, user:payload};

      case GET_CURRENT_USER + "_FULFILLED": 
      return {...state, user:payload};

      case LOGOUT_USER : 
      return {user: {} };

    
      // case GET_USER_INFO + "_REJECTED":
      //    console.log("REJECTED ", payload)
      //    return {...state, user: payload};

      // case GET_USER_INFO + "_PENDING":
      //    console.log("PENDING ", payload)
      //    return {...state, user: payload};

      // case GET_USER_INFO + "_FULFILLED":
      //    console.log("FULFILLED ", payload)
      //    return {...state, user: payload};

      default:
         return state;
   };
};