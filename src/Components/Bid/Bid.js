import React, {useState, useEffect} from "react";
import Material from "./Material";
import BidSummary from "../BidSummary/BidSummary";
import axios from "axios";
import {connect} from "react-redux"

import "./Bid.scss"

const Bid = (props) => {
   const [bidInfo, setBidInfo] = useState({}),
            [bid_id, setBid_id] =  useState(props.bidId),
            [materialList, setMaterialList] = useState([]),
            [materialTypeList, setMaterialTypeList] = useState([]),
            [selectedLineItems, setSelectedLineItems] = useState([])

   
   useEffect(() => {
      axios.get(`api/bid/${bid_id}/info`).then(res => {
         setBidInfo(res.data[0]);
      });
   },[]) 

   useEffect(() => {
      getBidMaterials();
   },[]) 

   useEffect(() => {
      getMaterialTypes();
   },[]) 

   const renameBid = () => {
      //axios.put(`/api/bid/${id}`)
      // recieve new values for  bid name, job number, bid location send to DB
   },

   getBidMaterials = () => {
      axios.get(`/api/bid/${bid_id}/materials`).then(res => {
         setMaterialList(res.data)
      })
   },
   
   getMaterialTypes = async () => {
      await  axios.get("/api/material/types").then(res => {
          console.log(res.data);
          setMaterialTypeList(res.data)
          console.log(materialTypeList);
 
       }) 
    },

   addLineItem = () => {
         axios.post("/api/bid/material", {bid_id}).then(() => {
            getBidMaterials() //just return using SQL
         })
         //take materials list 
         //splice (index, 0, insert value)
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
      getBidMaterials(); // return using SQL
   };
   
   
   console.log(props)
   console.log(materialTypeList)
   return(
      <div className="bid-container">
         <div className="bid-name-container">
            <h4>{bidInfo.bid_name}</h4> 
            <h4>{bidInfo.job_number}</h4> 
            <h4>{bidInfo.bid_location}</h4> 
         </div>
         <div className="bid-header-container">
      <button className="delete-button"> DELETE</button>
           
            <div className="column-names-container">
               <h4 className="column-one">#</h4>
               <h4 className="column-two">Quantity</h4>
               <h4 className="column-three">Material Type</h4>
               <h4 className="column-four">Material Name</h4>
               <h4 className="column-five">Description</h4>
               <h4 className="column-six">Task Type</h4>
               <h4 className="column-seven"> Unit Price</h4>
               <h4 className="column-eight">Total</h4>
            </div> 
         </div>
            {materialList.map((material, index) => {
               return <Material
                     key = {material.bid_line}
                     index = {index}
                     material = {material}
                     bidLineId = {material.bid_line}
                     materialQuantity = {material.material_quantity}
                     materialType = {material.material_type}
                     materialId = {material.material_id}
                     materialName = {material.material_name}
                     materialDescription = {material.description}
                     materialUnitCost = {material.unit_cost}
                     materialTaskType = {material.task_type}
                     materialTaskId = {material.task_id}

                     addLineItem = {addLineItem}
                     selectLineItem = {selectLineItem}
                     typeList = {materialTypeList}
               />})
            }
         <div>
         
            
         </div>
         <div className="bid-material-total-container">
         <button className="delete-button" onClick={() => deleteLineItems()}>DELETE</button>
         <h4 className="bid-total"> BID TOTAL</h4>
         </div>
            <BidSummary materialList = {materialList} 
                                    getBidMaterials = {getBidMaterials}
                                    />
      </div>
   )
}

const mapStateToProps = (reduxState) => reduxState.bid
export default connect(mapStateToProps, null)(Bid);


