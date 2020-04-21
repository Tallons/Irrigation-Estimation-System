import React, {useState, useEffect} from "react";
import axios from "axios";


const Material = (props) => {

   const [materialQuantity, setMaterialQuantity] = useState(props.materialQuantity),
             [materialType, setMaterialType] = useState(props.materialType),
             [materialId, setMaterialId] = useState(props.materialId),
             [materialName, setMaterialName] = useState(props.materialName),
            [material, setMaterial] = useState({
                        material_id: props.materialId,
                        material_type: props.materialType,
                        material_name: props.materialName,
                        description: props.materialDescription,
                        unit_cost: props.materialUnitCost
            }),
             [materialTask, setMaterialTask] = useState(props.materialTaskType),
             [materialNameList, setMaterialNameList] = useState([]),
             [taskList, setTaskList] = useState([]);


      useEffect(() => {

      },[])
   const handleQuantity = (value) => {
         if (value === "" ||  value >= 0){
            console.log(value);
            setMaterialQuantity(value)
            console.log(materialQuantity)
         }
      },

      handleTypeSelector = (type) => {
         console.log(type);
         setMaterialType(type);
         setMaterialName("");
         setMaterialTask("");
         axios.get(`/api/materials/${type}`).then(res => {
            console.log(res.data)
            setMaterialNameList(res.data)
         })
      },

         handleNameSelector =  (id) => {
            console.log(+id)
            console.log(material.material_id)
            // setMaterialName(value)
               if (material.material_id !== +id){
                  getSetMaterial(id) 
               } else { // this allows current items to be changed without having to change material types
                  axios.get(`/api/materials/${materialType}`).then(res => {
                     setMaterialNameList(res.data)
                  })
               }
               getMaterialTasks(id)
               // put endpoint to save
               if (!materialQuantity){
                  setMaterialQuantity(1)
               }
         },

         getSetMaterial= (id) =>{
            axios.get(`/api/material/${id}`).then(res => {
               const { material_id, material_type, material_name, description, unit_cost} = res.data[0]
                  setMaterial({ material_id, 
                     material_type, 
                     material_name, 
                     description, 
                     unit_cost
                  })
            })
         },

         getMaterialTasks = (id) => {
            axios.get(`/api/material/${id}/tasks`).then(res => {
               setTaskList(res.data)
            })
         },

         handleTaskSelector = (value) => {
            const id = material.material_id
            console.log(id)
            if (materialTask !== value){
               console.log("axios") //axios request - save production type & task to material? or other  hook variable
            } else {
               getMaterialTasks(id);
            }
         }

         console.log("taskList: ", taskList)
         // console.log("material: ",material)
         // console.log(materialType)
         // console.log(materialNameList)
         // console.log(materialName)
   return(
      <div className="bid-product-container">
      <input className="delete-selector" type="checkbox"/>
      <div className="product-line">
      <h3 className="column-one">{props.index + 1} </h3>
      <input  className="column-two" value={materialQuantity} onChange={(event) => handleQuantity(event.target.value)}/> 
     
         <select id="existing-type" 
            className="column-three" onChange={(event) => handleTypeSelector(event.target.value)}>
            <option >{props.materialType}</option>

            {props.typeList.filter(el => el.material_type !== props.materialType && el.material_type !== null ).map(type => {
                     return <option value={`${type.material_type}`} > {type.material_type}  </option>
                  })
            }
         </select>
      
         <select id="existing-material" className="column-three" 
         onClick={(event) => handleNameSelector(event.target.value)}>
             <option value={materialId}>{materialName} </option>
                  {materialNameList.filter(el => el.material_name !== materialName && el.material_name !== null ).map(type => {
                        return <option value={`${type.material_id}`} > {type.material_name}  </option>
                     })
                  }
           </select>
      <h3 className="column-four">{material.description}</h3>
      {/* <h3 className="column-four">{props.material.description}</h3> */}
      <select className="column-five" onClick={(event) => handleTaskSelector(event.target.value)}>
            <option >{materialTask}</option>
            {taskList.filter(el => el.task_type !== materialTask && el.material_type !== null ).map(type => {
                        return <option value={`${type.task_type}`} > {type.task_type}  </option>
                     })
            }
      </select>
      <h3 className="column-six">{material.unit_cost}</h3>
      {/* <h3 className="column-six">{props.material.price}</h3> */}
      <h3 className="column-seven">{material.unit_cost  * materialQuantity}</h3>
      {/* <h3 className="column-seven">{props.material.price * materialQuantity}</h3> */}
      </div>
      <button className="new-line-button" onClick={()=> props.addLineItem()}>+</button>
      </div>
      )
      }
export default Material;