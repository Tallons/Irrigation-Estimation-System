import axios from "axios"

const initialState = {
   bid: {
      bidId: ""
   }
};

const GET_CURRENT_BID = "GET_CURRENT_BID",
           SET_BID_ID = "SET_USER_ID";


export function setBidId(bidId){
   return{
      type: SET_BID_ID,
      payload: bidId
   }
};

export function getCurrentBid () {
   let bid = axios.get("/api/bid/").then(({data}) => { // I dont think I need and axios call for this
      console.log(data)
      return data;
   }).catch(err => console.log(err));
   return {
      type: GET_CURRENT_BID,
      payload: bid
   }
};

export default function reducer (state = initialState, action) {
   const {type, payload} = action;
   switch(type){
      case GET_CURRENT_BID + "_FULFILLED":
         return {...state, bid:payload}
      
         default:
            return state;
   }

}