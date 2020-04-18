import React, {useState, useEffect} from "react";
import DashboardDisplay from "./DashboardDisplay";
import axios from "axios";
import {connect} from "react-redux";

const Dashboard = (props) => {
   const [bidList, setBidList] = useState([{ bid_id: 1, bid_name: "Test 1", job_number: 4252, bid_location: "Phoenix", price:"$12,425"}, {bid_id: 2, bid_name: "Test 2", job_number: 2432, bid_location: "Phoenix", price:"$17,255"}])

   useEffect (() => {
      const {user_id} = props.auth.user;
      axios.get(`/api/bids/${user_id}`).then(res => {
         console.log("data: ", res.data)
         setBidList(res.data)
      });
   },[]);

   const CreateBid = () => {
      const {user_id} = props.auth.user;
      axios.post("/api/bid/", {user_id}).then(res => {
         console.log(res.data);
         console.log(" Bid Created");
         // props.history.push(`/bid/:${id}` );
      }).catch(err => console.log(err));
   };

   return(
      <div className="dashboard">
         {console.log(props)}
          {console.log(bidList.bid_name)}
          <header>
             <h1>Your Bids</h1>
             <button onClick={() => CreateBid()}>Create</button>
          </header>
          <div className="bid-list-title">
             <h3 className="bid-list-item-title">Bid Name</h3>
             <h3 className="bid-list-item-title">Job Number</h3>
             <h3 className="bid-list-item-title">Bid Location</h3>
             <h3 className="bid-list-item-title">Total Price</h3>
          </div>
            <div>
               {bidList.map(bid => {
                  return  <DashboardDisplay 
                                    key = {bid.bid_id}
                                    bidName = {bid.bid_name}
                                    jobNumber = {bid.job_number}
                                    bidLocation = {bid.bid_location}
                                    bidPrice = {bid.price}
                                    />
                  })}
            </div>
      </div>
   )
}
const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps)(Dashboard);