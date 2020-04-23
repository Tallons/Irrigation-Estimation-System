import React, {useState} from "react";
import BidSummary from "./BidSummary/BidSummary"

const BidList = (props) => {
   const [isViewing, setViewing] = useState(false)

   return(
   <div className="bid-list">
         <div className="bid-list-container" onClick={() => {setViewing(!isViewing)}}>
               <h3 className="bid-list-item">{props.bidName}</h3>
               <h3 className="bid-list-item">{props.jobNumber}</h3>
               <h3 className="bid-list-item">{props.bidLocation}</h3>
               <h3 className="bid-list-item">{props.bidPrice}</h3>
            </div>
            {isViewing
            ? (
            <div className="expand-view">
                  <div className="description-container" >
                     <div className="button-container">
                        <button onClick={() => props.editBid(props.bidId)}>EDIT</button>
                        <button onClick={() => props.deleteBid(props.bidId)}> DELETE</button>  
                     </div>
                     <div className="overview">
                        <BidSummary />
                     </div>
                  </div>
            </div>
            ) : null
            }  
         </div>
   )
}

export default BidList;