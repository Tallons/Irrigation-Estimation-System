import React, {useState, useEffect, useMemo} from "react";
import BidChart from "./BidChart"
import  "./BidSummary.scss";
import  axios from "axios"

const BidSummary = (props) => {
   const [isViewing, setViewing] = useState(false),
             [matCost, setMatCost] = useState(),
             [laborHours, setLaborHours] = useState(0),
             [laborCost, setLaborCost] = useState(0),
             [overheadCost, setOverheadCost] = useState(0);

            const materialMap = (list) => {
               let mapped = list.map((material,index) => {
                  return {type: material.material_type,
                  task: material.task_type,
                  cost: material.unit_cost * material.material_quantity}
               
               })
               console.log(mapped);
               return mapped
            }

      let cost = materialMap(props.bidSummaryData).reduce((acc, curr) => acc += +curr.cost, 0)


// let arr = props.bidSummaryData
//             for( let i = 0)

   useEffect (() => {
     setMatCost(cost);
   },[materialMap])

// let something = props.materialList || props.redux


            const laborMap = (list) => {
               // console.log(list)
               let mapped = list.map(task => {
                  return {type: task.task_type, cost: task.material_quantity / task.production_rate}
               })
               // console.log(mapped)
               return mapped
            }

      let hours = laborMap(props.bidSummaryData).reduce((acc, curr) => acc += curr.cost, 0)

      useEffect (() => {
         setLaborHours(hours);
       },[laborMap])

      useEffect (() => {
         setLaborCost(+(laborHours * 25).toFixed(2));
         setOverheadCost(+(laborHours * 2).toFixed(2))
       },[laborHours])

   // const materialBreakDown = (list) => {
   //    // console.log(materialMap(props.bidSummaryData))
   //     let breakDown = materialMap(list).reduce((acc, { type, cost }) => {
   //       (acc[type] = acc[type] || []).push(cost)
   //          return acc
   //       }, {})
   //       return breakDown
   // },

   const bidTotal = () => {
      return `${(matCost+ laborCost + overheadCost).toFixed(2)}`
   }


   // getProductionRates = () => { //  for loop send each  number or  push to array and SQL multiple numbers  or just an axios call with all the data
   //    // axios.get(`/api/task/${value}/production`).then(res => {
   //    //    console.log(res.data)
   //    // }).catch (err => console.log(err))
   // }
   console.log(matCost)
   console.log(laborCost)
   // console.log(props) 
   // console.log(materialBreakDown(props.bidSummaryData)) 
   return(
   <div className="bid-summary">
         <div className="view" >
            <div className="summary-container">
               <div className="row-summary"onClick={() => {setViewing(!isViewing)}}>
               <h3>Material</h3>
               <div className= "row-total">

               <h3 >Total:  </h3>
               <h3>{props.bidSummaryData ? `  $${matCost}` : 0}</h3>
               </div>
               </div>
               {isViewing
            ? (
                     <div className="expand-view">
                        {materialMap(props.bidSummaryData).map(material => { 
                        return (<>
                           <p>{material.type}</p>
                           <p>{material.cost}</p>
                        </> )
                        })}
                     </div>
            ) : null
            }  
               <div className="row-summary">
               <h3>Labor hours: 
               {props.bidSummaryData ? `  ${laborHours.toFixed(2)}`: 0}</h3>
               <div className="row-total">
               <h3>Total: </h3>
               <h3>{`  $${(laborCost).toFixed(2)}`}</h3>
               </div>
               </div>
               {isViewing
            ? (
                     <div className="expand-view">
                        <p> BID OVERVIEW</p>
                     </div>
            ) : null
            }  
               <div className="row-summary">
               <h3>Equipment</h3>
               <div className="row-total">
               <h3>Total: </h3>
               <h3>$0</h3>
               </div>
               </div>
               <div className="row-summary">
               <h3>Overhead</h3>
               <div className="row-total">
               <h3>Total: </h3>
               <h3>{`  $${(overheadCost).toFixed(2)}`}</h3>
               </div>
               </div>
               <div className="row-summary">
               <h3></h3>
               <div className="row-total">
               <h3>Total:  </h3>
               <h3>{`  $${bidTotal()}`}</h3>
               </div>
               </div>
            </div>
            <div className="chart-container">
         <div className="chart">
            <BidChart matCost = {matCost} 
                              laborCost = {laborCost}
                              overheadCost = {overheadCost}/>
         </div>
            </div>
         </div>
            
         </div>
   )
}
export default BidSummary;