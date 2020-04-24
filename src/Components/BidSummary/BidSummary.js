import React, {useState, useEffect} from "react";
import BidChart from "./BidChart"
import  "./BidSummary.scss";
import  axios from "axios"

const BidSummary = (props) => {
   const [isViewing, setViewing] = useState(false),
            [materialList, setMaterialList] = useState(),
            [laborList, setLaborList] = useState(),
            [data, setData] = useState(props.bidSummaryData)
            // [materialcost, setMaterialCost] = 

   useEffect (() => {
      // props.getBidSummary()
   },[])


   const materialCost = (list) => {
      let cost = materialMap(list).reduce((acc, curr) => acc += +curr.cost, 0)
      return `$${cost.toFixed(2)}`
   },

   materialMap = (list) => {
      let mapped = list.map(material => {
         return {type: material.material_type,
         cost: material.unit_cost * material.material_quantity}
      })
      return mapped
   },

   // laborMap = (list) => {
   //    let mapped = list.map(task => {
   //       return {type: task.task_type,
   //       cost: task.material_quantity * task.production_rate}
   //    })
   //    return mapped
   // },

   // laborCost = (list) => {
   //    let cost = laborMap(list).reduce((acc, curr) => acc += curr.cost, 0)
   //    return `$${cost.toFixed(2)}`
   // },


   getProductionRates = () => { //  for loop send each  number or  push to array and SQL multiple numbers  or just an axios call with all the data
      // axios.get(`/api/task/${value}/production`).then(res => {
      //    console.log(res.data)
      // }).catch (err => console.log(err))
   }
   console.log(data)
   console.log(props)
   console.log(props.materialList)
   return(
   <div className="bid-summary">
         <div className="view" >
            <div className="summary-container">
               <div className="row-summary"onClick={() => {setViewing(!isViewing)}}>
               <h3>Material</h3>
               <h3>Total:</h3>
               <h3>{props.materialList ? (materialCost(props.materialList)) : 0}</h3>
               </div>
               {isViewing
            ? (
            // <div className="expand-view">
            //       <div className="description-container" >
                     <div className="expand-view">
                        {materialMap(props.materialList).map(material => { 
                        return (<>
                           <p>{material.type}</p>
                           <p>{material.cost}</p>
                        </> )
                        })}
                     </div>
            //       </div>
            // </div>
            ) : null
            }  
               <div className="row-summary">
               <h3>Labor</h3>
               <h3>Hours</h3>
               <h3>{}</h3>
               <h3>Total:</h3>
               <h3>#</h3>
               </div>
               {isViewing
            ? (
            // <div className="expand-view">
            //       <div className="description-container" >
                     <div className="expand-view">
                        <p> BID OVERVIEW</p>
                     </div>
            //       </div>
            // </div>
            ) : null
            }  
               <div className="row-summary">
               <h3>Equipment</h3>
               <h3>Total:</h3>
               <h3>#</h3>
               </div>
               <div className="row-summary">
               <h3>Overhead</h3>
               <h3>Total:</h3>
               <h3>#</h3>
               </div>
            </div>
            <div className="chart-container">
         <div className="chart">
            <BidChart />
         </div>
            </div>
         </div>
            
         </div>
   )
}
export default BidSummary;