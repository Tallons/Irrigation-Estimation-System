import React, {useState, useEffect} from "react";
import BidList from "./BidList";
import {setBidId} from "../../Redux/bidReducer";
import axios from "axios";
import {connect} from "react-redux";

const Dashboard = (props) => {
   const [bidList, setBidList] = useState([]),
         [toggleView, setToggleView] = useState ([])

   useEffect (() => {
      getUserBids()

   },[]);


   const createBid = () => {
      const {user_id} = props.auth.user;
      axios.post("/api/bid", {user_id}).then(res => {
         const {bid_id} = res.data
         console.log(res.data)
         props.setBidId(bid_id)
         props.history.push(`/bid/:${bid_id}` );
      }).catch(err => console.log(err));
   },

   deleteBid = (id) => {
      console.log(id)
      axios.delete(`/api/bids/${id}`).then(() => {
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
   },

   toggleSetup = () => {
      let arr = [];
      for (let i = 0; i < bidList.length; i++) {
         arr.push(false)
      } 
      return arr
   },
   handleToggle = async (index) => {
      let arr =  await toggleSetup()
      arr[index] = ! toggleView[index]
      setToggleView(arr);
   }
      

   return(
      <div className="dashboard">
          <header>
             <h1>Your Bids</h1>
             <button onClick={() => createBid()}>CREATE
             </button>
          </header>
          <div className="bid-list-title">
             <h3 className="bid-list-item-title">Bid Name</h3>
             <h3 className="bid-list-item-title">Job Number</h3>
             <h3 className="bid-list-item-title">Bid Location</h3>
             <h3 className="bid-list-item-title">Total Price</h3>
          </div>
            <>
               {bidList.map((bid,index)=> {
                  return  <BidList 
                                    key = {bid.bid_id}
                                    index = {index}
                                    bidId = {bid.bid_id}
                                    bidName = {bid.bid_name}
                                    jobNumber = {bid.job_number}
                                    bidLocation = {bid.bid_location}
                                    bidPrice = {bid.price}

                                    toggleView = {toggleView}
                                    handleToggle = {handleToggle}
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
   