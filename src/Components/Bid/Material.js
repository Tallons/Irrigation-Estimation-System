import React, {useState, useEffect} from "react";
import axios from "axios";

const Material = (props) => {
   const [materialQuantity, setMaterialQuantity] = useState(0),
             [materialTypeList, setMaterialTypeList] = useState([]),
             [materialNameList, setMaterialNameList] = useState([]),
             [adjust, setAdjust] = useState(false),
             [taskTypeList, setTaskTypeList] = useState([])
   
   useEffect (() => {
      // getBidData();
      getTypes();

      //get  all materoals/tasktype info
   },[])

   // const getBidData = () => {
   //    const {material_id, material_type, material_name, description, unit_cost} = material
   //    if (props.material){
   //       console.log(props.material)

   //    }
      //if bid data exists set material to all states  -- maybe use a ternary
      // setMaterial 
   // }

   const getTypes = async () => {
     await  axios.get("/api/material/types").then(res => {
         console.log(res.data);
         setMaterialTypeList(res.data)
         // setMaterialTypeList(materialTypeList.push(res.data))
         console.log(materialTypeList);

      }) 
   }
   
   const handleTypeSelector = () => {
      let type = document.getElementById("type").value
      axios.get(`/api/material/${type}`).then(res => {
         setMaterialNameList(res.data)
         console.log(materialNameList)
      })
   }

   const handleQuantity = (value) => {
      if (value === "" ||  value >= 0){
         console.log(value);
         setMaterialQuantity(value)
         console.log(materialQuantity)
      }
   }
   
   const handleNameSelector = () => {
      let index = document.getElementById("material").value
      console.log(index)
      if (index){
         const {material_id, material_type, material_name, description, unit_cost} = materialNameList[index]
         // setMaterial({...material_id, 
         //    material_type, 
         //    material_name, 
         //    description, 
         //    unit_cost}) 
         }
         // console.log(material)
         if (materialQuantity == 0 || materialQuantity === ""){
            setMaterialQuantity(1);
      }
   }

      // console.log(props.material)
      // axios.get(`/api/material/${type}` ).then(res => {
      //    console.log(res.data)
      // })
      // setMaterialQuantity()
   // }
   // select options will probably be an axios request for the list of products and task types

   // pass function as props for the checkbox delete and add button

   return(
         <div className="bid-product-container">
            {/* {console.log("price: ", props.material.unit_cost)}
            {console.log("props:type: ", props.materialType)}
            {console.log("typeList: ", materialTypeList)} */}
            <input className="delete-selector" type="checkbox" onClick={(event) => props.selectLineItem(props.bid_line, event)}/>
         <div className="product-line">
            <h3 className="column-one">{props.index + 1}</h3>
            <input  className="column-two" 
                  value={materialQuantity} 
                  onChange={(event) => handleQuantity(event.target.value)}/> 
            <select id="type" className="column-three"
            onChange={() => handleTypeSelector()} >
               {props.material.material_type ? (
                              <option 
                                 value={`${props.materialType}`} selected> {props.materialType} </option>

               )
               : (
                  materialTypeList.map(type => {
                     return  <option 
                                       value={`${type.material_type}`} selected > {type.material_type}  </option>,
                                       <option 
                                       value={""} > {""}  </option>
                               }))
               }
            </select>
            <select id="material" className="column-three" 
            onClick={() => handleNameSelector()}>
                  {materialNameList.map((type, index) => {
                  return  <option 
                                    value={index} > {type.material_name}  </option>
               })}

            </select>
            <h3 className="column-four">{props.material.description}</h3>
            {/* <h3 className="column-four">{props.material.description}</h3> */}
            <h3 className="column-five">Task Type</h3>
            <h3 className="column-six">{props.material.unit_cost}</h3>
            {/* <h3 className="column-six">{props.material.price}</h3> */}
            <h3 className="column-seven">{props.material.unit_cost * materialQuantity}</h3>
            {/* <h3 className="column-seven">{props.material.price * materialQuantity}</h3> */}
         </div>
            <button className="new-line-button" onClick={()=> props.addLineItem()}>+</button>
      </div>
   )
}

export default Material;