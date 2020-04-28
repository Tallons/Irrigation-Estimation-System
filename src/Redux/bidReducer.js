import axios from "axios"

const initialState = {
      bidId: {}
};

const GET_CURRENT_BID = "GET_CURRENT_BID",
           SET_BID_ID = "SET_USER_ID";


export function setBidId(id){
   console.log(id)
   return{
      type: SET_BID_ID,
      payload: id
   }
};

export function getCurrentBid (bid) {
   // let bid = axios.get("/api/bid/").then(({data}) => { // I dont think I need and axios call for this
   //    console.log(data)
   //    return data;
   // }).catch(err => console.log(err));
   return {
      type: GET_CURRENT_BID,
      payload: bid
   }
};

export default function reducer (state = initialState, action) {
   const {type, payload} = action;
   console.log(payload)
   switch(type){
      case GET_CURRENT_BID + "_FULFILLED":
         return { bidId: payload}

      case SET_BID_ID:
         return { bidId: payload }
      
         default:
            return state;
   }

}