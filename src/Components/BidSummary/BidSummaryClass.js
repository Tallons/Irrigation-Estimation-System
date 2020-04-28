import React from "react"
import BidChart from "./BidChart"
import  "./BidSummary.scss";

class BidSummary extends React.Component {
   constructor(props){
   super(props)
    this.state = {
      isViewing: false,
      materialList: [],
      laborHours: 0,
      bidTotal: 0
   }
}
componentDidUpdate(prevProps, props){
   this.setState({materialList: this.materialMap(this.props.bidSummaryData)})
   this.setState({laborHours: this.laborCost(this.props.bidSummaryData)})
}

materialMap  (list)  {
   let mapped = list.map(material => {
      return {type: material.material_type,
         cost: material.unit_cost * material.material_quantity}
      })
      // this.setState({materialList: mapped})
      return mapped
   }
   
   materialCost ()  {
      let cost = this.materialMap(this.props.bidSummaryData).reduce((acc, curr) => acc += +curr.cost, 0)
      return `$${cost.toFixed(2)}`
   }
      laborMap = (list) => {
         console.log(list)
         let mapped = list.map(task => {
            return {type: task.task_type, cost: task.material_quantity / task.production_rate}
         })
         console.log(mapped)
         return mapped
      }
   
      laborCost = () => {
         let hours = this.laborMap(this.props.bidSummaryData).reduce((acc, curr) => acc += curr.cost, 0)
         console.log(hours)
         // this.setState({laborHours: hours})
         return hours;
      }
   
   
      materialBreakDown = (list) => {
         // console.log(materialMap(this.props.bidSummaryData))
          let breakDown = this.materialMap(list).reduce((acc, { type, cost }) => {
            (acc[type] = acc[type] || []).push(cost)
               return acc
            }, {})
            return breakDown
      }
   
   
      getProductionRates = () => { //  for loop send each  number or  push to array and SQL multiple numbers  or just an axios call with all the data
         // axios.get(`/api/task/${value}/production`).then(res => {
         //    console.log(res.data)
         // }).catch (err => console.log(err))
      }

      render(){
      console.log(this.props) 
      console.log(this.materialBreakDown(this.props.bidSummaryData)) 
      console.log(this.state.laborHours) 
      return(
      <div className="bid-summary">
            <div className="view" >
               <div className="summary-container">
                  <div className="row-summary"onClick= {() => this.setState({isViewing: !this.state.isViewing})}>
                  <h3 className="row-title">Material</h3>
                  <div className="row-total">
                     <h3 className="row-title-total">Total:</h3>
                     <h3 className="row-total-amount">{this.props.bidSummaryData ? (this.materialCost()) : 0}</h3>
                  </div>
                  </div>
                  {this.state.isViewing
               ? (
               // <div className="expand-view">
               //       <div className="description-container" >
                        <div className="expand-view">
                           {this.materialMap(this.props.bidSummaryData).map(material => { 
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
                  <h3>Labor hours</h3>
                  <h3>{this.props.bidSummaryData ? this.state.laborHours : 0}</h3>
                  <h3>Total:</h3>
                  <h3>{`${(this.laborCost(this.props.bidSummaryData) * 25).toFixed(2)}`}</h3>
                  </div>
                  {this.state.isViewing
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
                  <h3>{`${(this.laborCost()* 5).toFixed(2)}`}</h3>
                  </div>
                  <div className="row-summary">
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
      )}
   }
   export default BidSummary;