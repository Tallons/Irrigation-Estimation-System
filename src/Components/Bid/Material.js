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

      const getMaterialInfo = async (id) => {
         await axios.get(`/api/material/${id}`).then(res => {
                     const { material_id, material_type, material_name, description, unit_cost} = res.data[0]
            setMaterial({ material_id, material_type, material_name, description, unit_cost})
         })
      },

      getMaterialNames =  (type) => {
          axios.get(`/api/materials/${type}`).then(res => {
            // console.log(res.data);
            setMaterialNameList(res.data);
         })
      },

      // add tasks to the state taskList based on material_id 
      getMaterialTasks = (id) => {
         axios.get(`/api/material/${id}/tasks`).then(res => {
            setTaskList(res.data)
         })
      },

      updateMaterial = (value, columnName) => {
      const {bidLineId} = props
      console.log("bidLineId ", bidLineId)
      console.log("value ", value)
      console.log("columnName ", columnName)
                        //   "/api/bid/material", {id, bidLineId}
      axios.put(`/api/bid/material/?column=${columnName}&value=${value}&id=${bidLineId}`).then(res => {
         console.log(res.data)
         })
      },

      handleNameSelector = (id) => { //material id
            // console.log(+id)
            // console.log(material.material_id)
            if (material.material_id !== +id){
                  getMaterialInfo(+id) 

               } else { // allows access to other Materials Names without having to change Material Types
                  getMaterialNames(materialType)
               }
               getMaterialTasks(id)

                  // put endpoint to save
                  // console.log(material)
               
               if (!materialQuantity){
                  setMaterialQuantity(1)
               }
            },

            handleQuantity = (value) => {
               if (value === "" ||  value >= 0){
                  // console.log(value);
                  setMaterialQuantity(value)
                  // console.log(materialQuantity)
               }
            },

            handleTaskSelector = (value) => {
            const id = material.material_id
            console.log(id)
            if (materialTask !== value){
               console.log("axios") //axios request - save production type & task to material? or other  hook variable 
               //axios.get("/api/task/:type/production" - 
            } else {
               getMaterialTasks(id);
            }
         },

         handleTypeSelector = async (type) => {
            console.log(type);
            await setMaterialName("");
            await setMaterialTask("");
            setMaterialType(type);
            getMaterialNames(type)
         }
         
         // console.log("taskList: ", taskList)
         // console.log("material: ",material)
         // console.log(materialType)
         // console.log(materialNameList)
         // console.log(materialName)
   return(
      <div className="bid-product-container">
         <input className="delete-selector" type="checkbox"/>
         <div className="product-line">
            <h3 className="line-item-column-one"> {props.index + 1} </h3>
            <input className="line-item-column-two" 
                        value={materialQuantity} 
                        onChange={(event) => handleQuantity(event.target.value)}
                        onBlur={(event) => updateMaterial(event.target.value,'material_quantity')
                        }/> 
         
            <select className="line-item-column-three" 
                         onChange={(event) => handleTypeSelector(event.target.value)}>
               <option >{props.materialType}</option>
               {props.typeList
                  .filter(el => el.material_type !== props.materialType && el.material_type !== null )
                  .map(type => <option value={`${type.material_type}`}>  {type.material_type} </option>)
               }
            </select>
      
            <select className="line-item-column-four" 
                         onClick={(event) => {
                            handleNameSelector(event.target.value)
                            updateMaterial(event.target.value,'material_id')
                            }}>
                <option value={materialId}>{materialName} </option>
                {materialNameList
                   .filter(el => el.material_name !== materialName && el.material_name !== null )
                   .map(type => <option value={`${type.material_id}`} > {type.material_name} </option>)
                }
            </select>

            <h3 className="line-item-column-five">{material.description}</h3>

            <select className="line-item-column-six" 
                         onClick={(event) => {
                            handleTaskSelector(event.target.value)
                            updateMaterial(event.target.value,'task_id')
                            }}>
                  <option >{materialTask}</option>
                  {taskList
                     .filter(el => el.task_type !== materialTask && el.material_type !== null )
                     .map(type => <option value={`${type.task_type}`} > {type.task_type} </option>)
                  }
            </select>

            <h3 className="line-item-column-seven">{material.unit_cost}</h3>
            <h3 className="line-item-column-eight">{material.unit_cost  * materialQuantity}</h3>
         </div>
         <button className="new-line-button" onClick={()=> props.addLineItem()}>+</button>
      </div>
      )
}
export default Material;