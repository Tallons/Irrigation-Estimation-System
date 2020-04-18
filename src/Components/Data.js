import React, {useState} from "react";

const Data = () => {

   return(
      <div className="data-container">
         <selector>MATERIAL TYPE</selector>
         <selector>MATERIAL NAME</selector>
            <h3 className="data-title">DATABASE</h3>
         <header>
            <div className="data-column-title-container">
               <h3 className="data-column-one">MATERIAL TYPE</h3>
               <h3 className="data-column-two">MATERIAL NAME</h3>
               <h3 className="data-column-three">MATERIAL DESCRIPTION</h3>
               <h3 className="data-column-four">UNIT PRICE</h3>
            </div>
         </header>
         <div className="data-edit-container">
            <select className="data-column-one"></select>
            <input className="data-column-two" />
            <input className="data-column-three" />
            <input className="data-column-four"/>
         </div>
      </div>
   )
}

export default Data;