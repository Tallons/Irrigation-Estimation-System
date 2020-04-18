import React, {useState} from "react";


const DashboardDisplay = (props) => {
   const [isViewing, setViewing] = useState(false)
   
   return(
   <div>
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
                        <button>EDIT</button>
                        <button>DELETE</button>  
                     </div>
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

export default DashboardDisplay