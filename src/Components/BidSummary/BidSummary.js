import React, {useState} from "react";

const BidSummary = () => {
   const [isViewing, setViewing] = useState(false)

   return(
   <div>
         <div className="" onClick={() => {setViewing(!isViewing)}}>
               <div className="row-summary">
               <h3>Material</h3>
               <h3>Total</h3>
               </div>
               <h3 className="row-summary">Labor</h3>
               <h3 className="row-summary">Equipment</h3>
               <h3 className="row-summary">Overhead</h3>
            </div>
            {isViewing
            ? (
            <div className="expand-view">
                  <div className="description-container" >
                     <div className="overview">
                        <p> BID OVERVIEW</p>
                     </div>
                  </div>
            </div>
            ) : null
            }  
         </div>
   )
}
export default BidSummary;