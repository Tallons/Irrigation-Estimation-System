import React, {useState, useEffect} from "react";
import BidSummary from "./BidSummary/BidSummary";
import axios from "axios";

const BidList = (props) => {
   const [bidSummaryData, setBidSummaryData] = useState([]),
             [dataBidId, setDataBidId] = useState()
   
   useEffect (() => {
      console.log("render")
   }, [])

   const getBidSummary = () => {
      // if (!bidSummaryData || props.bidId !== dataBidId) {
         axios.get(`/api/bid/${props.bidId}/summary`).then(res => {
            console.log(res.data)
            setBidSummaryData(res.data)
            setDataBidId(res.data[0].bid_id) 
         }).catch (err => console.log(err))
      // } else {
      //    console.log("IDs match")
      // }
   }

     console.log(props.toggleView)
   return(
   <div className="bid-list">
         <div className="bid-list-container" onClick={() => {getBidSummary() 
            props.handleToggle(props.index)}}>
  
         {console.log(props.toggleView[props.index])}
               <h3 className="bid-list-item">{props.bidName}</h3>
               <h3 className="bid-list-item">{props.jobNumber}</h3>
               <h3 className="bid-list-item">{props.bidLocation}</h3>
               <h3 className="bid-list-item">{props.bidPrice}</h3>
            </div>
            {props.toggleView[props.index]
            ? (
            <div className="expand-view">
                  <div className="description-container" >
                     <div className="button-container">
                        <button onClick={() => {
                              props.editBid(props.bidId)}
                              }>EDIT</button>
                        <button onClick={() => props.deleteBid(props.bidId)}> DELETE</button>  
                     </div>
                     <div className="overview">
                        <BidSummary getBidSummary = {getBidSummary}
                                                bidSummaryData ={bidSummaryData}
                                 />
                     </div>
                  </div>
            </div>
            ) : null
            }  
         </div>
   )
}

export default BidList;