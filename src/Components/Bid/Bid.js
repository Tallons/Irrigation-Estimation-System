import React, {useState, useEffect} from "react";
import Material from "./Material";
import BidSummary from "../BidSummary/BidSummary";
import axios from "axios";
import {connect} from "react-redux"

import "./Bid.scss"

const Bid = (props) => {
   const  [bidName, setBidName] = useState(),
            [jobNumber, setJobNumber] = useState(),
            [bidLocation, setBidLocation] = useState(),
            [bid_id, setBid_id] = useState(props.bidId),
            [isEditing, setIsEditing] = useState(false),
            [materialList, setMaterialList] = useState([]),
            [materialTypeList, setMaterialTypeList] = useState([]),
            [selectedLineItems, setSelectedLineItems] = useState([]),
            [bidSummaryData, setBidSummaryData] = useState([])

   
   useEffect(() => {
      axios.get(`api/bid/${bid_id}/info`).then(res => {
         const {bid_name, job_number, bid_location} = res.data[0]
         setBidName(bid_name)
         setJobNumber(job_number)
         setBidLocation(bid_location);
      });
   },[]) 

   useEffect(() => {
      getBidMaterials(); // remove  this and just use getBidSummary - create material list
   },[]) 
   useEffect(() => {
      getBidSummary();
   },[bid_id])

   useEffect(() => {
      getMaterialTypes();
   },[]) 

   const renameBid = async () => {
      await axios.put(`/api/bid/${bid_id}`, {bidName, jobNumber, bidLocation})
      // recieve new values for bid name, job number, bid location send to DB
   },

   getBidMaterials = () => {
      console.log(bid_id)
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
         }).catch (err => console.log(err))
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
         console.log(selectedLineItems[i])
         await axios.delete(`/api/bid/${selectedLineItems[i]}`)
      }
      getBidMaterials(); // return using SQL
   },

   getBidSummary = () => {
      axios.get(`/api/bid/${props.bidId}/summary`).then(res => {
         setBidSummaryData(res.data)
      }).catch (err => console.log(err))
   }
   
   
   console.log(bid_id)
   // console.log(materialList)
   // console.log(bidSummaryData)
   // console.log(props)
   // console.log(materialTypeList)
   return(
      <div className="bid-container">
            {!isEditing ? (
               <div className="bid-name-container" onClick={() => setIsEditing(!isEditing)}>
                  <h4 onClick={() => setIsEditing(!isEditing)}>{bidName}</h4> 
                  <h4 onClick={() => setIsEditing(!isEditing)}># {jobNumber}</h4> 
                  <h4 onClick={() => setIsEditing(!isEditing)}>{bidLocation}</h4> 
               </div>
            ) : (
               <div className="bid-name-container"
               onDoubleClick={(event) => {
                  setIsEditing(!isEditing)
                  renameBid(event.target)
                  }}>
                  <h4 onChange = {event => setBidName(event.target.value)}>
                     <input value={bidName} placeholder="Bid Name"/>
                     </h4>
                  <h4 onChange = {event => setJobNumber(event.target.value)}>
                     <input value={jobNumber} placeholder="Job Number"/>
                  </h4>
                  <h4 onChange = {event => setBidLocation(event.target.value)}>
                     <input value={bidLocation} placeholder="Location"/>
                  </h4>
               </div>
            )}
         <div className="bid-header-container">
      <button className="delete-button"> DELETE</button>
           
            <div className="column-names-container">
               <h4 className="column-one">#</h4>
               <h4 className="column-two">Quantity</h4>
               <h4 className="column-three">Material Type</h4>
               <h4 className="column-four">Material Name</h4>
               <h4 className="column-five">Description</h4>
               <h4 className="column-six">Task Type</h4>
               <h4 className="column-seven"> Unit Cost</h4>
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
                     getBidSummary = {getBidSummary}
               />})
            }
         <div>
         
            
         </div>
         <div className="bid-material-total-container">
         <button className="delete-button-two" onClick={() => deleteLineItems()}>DELETE</button>
         </div>
            <BidSummary materialList = {materialList} 
                                    getBidMaterials = {getBidMaterials}
                                    bidSummaryData = {bidSummaryData}
                                    />
      </div>
   )
}

const mapStateToProps = (reduxState) => reduxState.bid
export default connect(mapStateToProps, null)(Bid);