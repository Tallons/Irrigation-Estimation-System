import React, {useState, useEffect} from "react";
import axios from "axios";

const Material = (props) => {
   const [materialQuantity, setMaterialQuantity] = useState(0),
            [materialTypeList, setMaterialTypeList] = useState([]),
             [materialNameList, setMaterialNameList] = useState([]),
             [taskTypeList, setTaskTypeList] = useState([]);
   
   useEffect (() => {
      //get  all materoals/tasktype info
      //get material type : setMaterialTypeList
      // axios.get("/api/material/type").then(res => {
      //    for( let i = 0; i < res.data.length; i++){
      //       console.log("loop",res.data[i]);
      //    }
      //    console.log(res.data[0]);
      //    console.log(res.data[1]);
      //    console.log(res.data[2]);
      //    setMaterialTypeList([...res.data])
      //    console.log(materialTypeList);
      // })
      axios.get("/api/material/type").then(res => {
         
         console.log(res.data[0]);
         // console.log(res.data[1]);
         // console.log(res.data[2]);
         setMaterialTypeList([...res.data])
         console.log(materialTypeList);
      })

   },[])

   const handleQuantity = (value) => {
      if (value === "" ||  value >= 0){
         console.log(value);
         setMaterialQuantity(value)
         console.log(materialQuantity)
      }
   }
   const handleNameSelector = (id, type) => {
      console.log(props.material)
      axios.get(`/api/material/${id}/${type}` ).then(res => {
         console.log(res.data)
      })
      setMaterialQuantity()
   }
   // select options will probably be an axios request for the list of products and task types

   // pass function as props for the checkbox delete and add button
   return(
         <div className="bid-product-container">
            {console.log("price: ", props.material)}
            <input className="delete-selector" type="checkbox" />
         <div className="product-line">
            <h3 className="column-one">{props.index + 1}</h3>
            <input  className="column-two" 
                  value={materialQuantity} 
                  onChange={(event) => handleQuantity(event.target.value)}/> 
            <select className="column-three" >
               {/* {materialTypeList.map()} */}
            <option value={`${props.material.name}`}>{props.material.name}</option>
            </select>
            <select className="column-three" onClick={() => handleNameSelector()}>
            <option value={`${props.material.name}`}>{props.material.name}</option>
            </select>
            <h3 className="column-four">Description</h3>
            <h3 className="column-five">Task Type</h3>
            <h3 className="column-six">{props.material.price}</h3>
            <h3 className="column-seven">{props.material.price * materialQuantity}</h3>
         </div>
            <button className="new-line-button">+</button>
      </div>
   )
}

export default Material;