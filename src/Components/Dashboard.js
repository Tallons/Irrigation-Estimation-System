import React, {useState, useEffect} from "react";
import BidList from "./BidList";
import {setBidId} from "../Redux/bidReducer";
import axios from "axios";
import {connect} from "react-redux";

const Dashboard = (props) => {
   const [bidList, setBidList] = useState([{ bid_id: 21, bid_name: "Test 1", job_number: 4252, bid_location: "Phoenix", price:"$12,425"}, {bid_id: 23, bid_name: "Test 2", job_number: 2432, bid_location: "Phoenix", price:"$17,255"}])

   useEffect (() => {
      getUserBids()

   },[]);

   const createBid = () => {
      const {user_id} = props.auth.user;
      axios.post("/api/bid/", {user_id}).then(res => {
         console.log(res.data);
         console.log(" Bid Created");
         // props.history.push(`/bid/:${id}` );
      }).catch(err => console.log(err));
   },

   deleteBid = (id) => {
      axios.delete(`/api/bid/${id}`).then(() => {
         console.log(" Bid deleted");
         getUserBids();
      }).catch(err => console.log(err));
   },
   editBid = (id) => {
      props.setBidId(id)
      console.log(id)
      props.history.push(`/bid/${id}` );
   },

   getUserBids = () => {
      const {user_id} = props.auth.user;
      axios.get(`/api/bids/${user_id}`).then(res => {
         console.log("data: ", res.data)
         setBidList(res.data)
      });
   }
      
   
   console.log(props)
    console.log(bidList.bid_name)
   return(
      <div className="dashboard">
          <header>
             <h1>Your Bids</h1>
             <button 
            //  onClick={() => createBid()}
            >Create
             </button>
          </header>
          <div className="bid-list-title">
             <h3 className="bid-list-item-title">Bid Name</h3>
             <h3 className="bid-list-item-title">Job Number</h3>
             <h3 className="bid-list-item-title">Bid Location</h3>
             <h3 className="bid-list-item-title">Total Price</h3>
          </div>
            <>
               {bidList.map(bid => {
                  return  <BidList 
                                    key = {bid.bid_id}
                                    bidId = {bid.bid_id}
                                    bidName = {bid.bid_name}
                                    jobNumber = {bid.job_number}
                                    bidLocation = {bid.bid_location}
                                    bidPrice = {bid.price}

                                    deleteBid = {deleteBid}
                                    editBid = {editBid}
                                    />
                  })}
            </>
      </div>
   )
}
const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps, {setBidId})(Dashboard);