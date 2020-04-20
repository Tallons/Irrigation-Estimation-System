import React, {useState, useEffect} from "react";
import Material from "./Material";
import BidSummary from "./BidSummary";
import axios from "axios";

const Bid = (props) => {
   const [bidInfo, setBidInfo] = useState({}),
            [materialList, setMaterialList] = useState([]),
            [selectedLineItems, setSelectedLineItems] = useState([])
   
   useEffect(() => {
      const bid_id = 1;
      axios.get(`api/bid/${bid_id}/info`).then(res => {
         setBidInfo(res.data[0]);
      });

      getBidMaterials()
   },[]) 

   const renameBid = () => {
      //axios.put(`/api/bid/${id}`)
      // recieve new values for  bid name, job number, bid location send to DB
   },

   getBidMaterials = () => {
      const bid_id = 1; // remove once you get bid setup in redux
      axios.get(`/api/bid/${bid_id}/materials`).then(res => {
         setMaterialList(res.data)
      })
   },

   addLineItem = () => {
      const bid_id = 1;
         axios.post("/api/bid/material", {bid_id}).then(() => {
            getBidMaterials()
         })
      // axios.post("/api/bid/material").then(()=> {
      //    console.log()
      // })
         //take materials list 
         //splice (index, 0, insert value)
   },

   editProductLine = () => {
      //axios.put(`/api/bid/product/${id}`)
   },

    selectLineItem = (bid_line, event) => {
      const copy = [...selectedLineItems]
         if (event.target.checked){ // add checked to array
            copy.push(bid_line) 
         } else {
            const index = copy.findIndex(searchId => searchId === bid_line)
            copy.splice(index, 1) // remove unchecked from array
         }
      setSelectedLineItems([...copy])
      console.log("selected: ", selectedLineItems)
   },

    deleteLineItems = async () => {
      for ( let i = 0; i < selectedLineItems.length; i++){
         console.log(selectedLineItems)
         await axios.delete(`/api/bid/${selectedLineItems[i]}`).then(res => {
         console.log(res.data)
         })
      }
      getBidMaterials();
   };

   return(
      <div className="bid-container">
      {console.log(props)}
      {console.log(materialList)}
         <div className="bid-name-container">
            <h3>{bidInfo.bid_name}</h3> 
            <h3>{bidInfo.job_number}</h3> 
            <h3>{bidInfo.bid_location}</h3> 
         </div>
         <div className="bid-header-container">
           
            <div className="column-names-container">
               <h3 className="column-one">#</h3>
               <h3 className="column-two">Quantity</h3>
               <h3 className="column-three">Material Type</h3>
               <h3 className="column-three">Material Name</h3>
               <h3 className="column-four">Description</h3>
               <h3 className="column-five">Task Type</h3>
               <h3 className="column-six"> Unit Price</h3>
               <h3 className="column-seven">Total</h3>
            </div> 
            <button className="delete-button"> DELETE</button>
         </div>
            {materialList.map((material, index) => {
               return <Material
                     key = {index}
                     index = {index}
                     bid_line = {material.bid_line}
                     material = {material}
                     materialType = {material.material_type}
                     addLineItem = {addLineItem}
                     selectLineItem = {selectLineItem}
               />})
            }
         <div>
         
            
         </div>
         <div className="bid-material-total-container">
         <button className="delete-button" onClick={() => deleteLineItems()}>DELETE</button>
         <h3 className="bid-total"> BID TOTAL</h3>
         </div>

      </div>
   )
}

export default Bid;


