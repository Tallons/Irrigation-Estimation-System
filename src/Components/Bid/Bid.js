import React, {useState, useEffect} from "react";
import Material from "./Material"
import BidSummary from "./BidSummary"

const Bid = (props) => {
   const [materialList, setMaterialList] = useState([{id: 4, name: "Pipe", price: .25},{id:7 , name: "valve"}, {id:9, name: "Controller", price: 425 }]);
   
   useEffect(() => {

   },[])

   const renameBid = () => {
      //axios.put(`/api/bid/${id}`)
      // recieve new values for  bid name, job number, bid location send to DB
   },

   getBidProducts = () => {
      //axios..get(`/api/bid/${id}`)
   },

   addProductLine = () => {
      //axios.post("/api/bid/product")
         //take product list 
         //splice (index, 0, insert value)
   },

   editProductLine = () => {
      //axios.put(`/api/bid/product/${id}`)
   },

   deleteProductLines = () => {
      //axios.delete("/api/bid/product/:id")
      //when checked add to array, pass array through delete end point
   };

   return(
      <div className="bid-container">
      {console.log(props)}
         <div className="bid-name-container">
            <h3>BID NAME</h3> 
            <h3>JOB NUMBER</h3> 
            <h3>BID LOCATION</h3> 
         </div>
         <div className="bid-header-container">
           
            <div className="column-names-container">
               <h3 className="column-one">#</h3>
               <h3 className="column-two">Quantity</h3>
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
                     key = {material.id}
                     index = {index}
                     material = {material}
               />})
            }
         <div>
         
            
         </div>
         <div className="bid-material-total-container">
         <button className="delete-button">DELETE</button>
         <h3 className="bid-total"> BID TOTAL</h3>
         </div>

      </div>
   )
}

export default Bid;


