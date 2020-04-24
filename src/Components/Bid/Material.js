import React, {useState, useEffect} from "react";
import axios from "axios";

const Material = (props) => {

   const [materialQuantity, setMaterialQuantity] = useState(props.materialQuantity),
             [materialType, setMaterialType] = useState(props.materialType),
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


      useEffect (() => {
         console.log("true")
      },[])

      
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
            console.log("hit")
         })
      },

      updateMaterial = (columnName, value) => {
      const {bidLineId} = props
      console.log("bidLineId ", bidLineId)
      console.log("value ", value)
      console.log("columnName ", columnName)
      if (columnName === "material_quantity" && value === props.materialQuantity){
         console.log("no change in quantity")
      } else if (columnName && value >= 0 ){
      axios.put(`/api/bid/material/?column=${columnName}&value=${value}&id=${bidLineId}`).then(res => {
         console.log(res.data)
         }).catch (err => console.log(err))
      } else {
         console.log("error")
      }
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
            },

            handleQuantity = (value) => {
               if (value === "" ||  value >= 0){
                  setMaterialQuantity(value)
               }
            },

            handleTaskSelector = (value) => {
            const id = material.material_id
            console.log(id)
            console.log(value)
            if (props.materialTaskId !== +value){
               // axios.get(`/api/task/${value}/production`).then(res => {
               //    console.log(res.data)
               // }).catch (err => console.log(err))
                  //axios request - save production type & task to material? or other  hook variable 
               //axios.get("/api/task/:type/production" - 
            } else {
               getMaterialTasks(id);
            }
         },

         handleTypeSelector = async (type) => {
            console.log(type);
            await updateMaterial('task_id', 0)
            await setMaterialTask("");
            await setMaterialName("");
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
                        onBlur={(event) => updateMaterial('material_quantity', event.target.value)
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
                         onClick={(event) => handleNameSelector(event.target.value)}
                         onChange={(event) => updateMaterial('material_id', event.target.value)}>
                <option value={props.materialId}>{materialName} </option>
                {materialNameList
                   .filter(el => el.material_name !== materialName && el.material_name !== null )
                   .map(type => <option value={`${type.material_id}`} > {type.material_name} </option>)
                }
            </select>

            <h3 className="line-item-column-five">{material.description}</h3>

            <select className="line-item-column-six" 
                         onClick={(event) => handleTaskSelector(event.target.value)}
                         onChange={(event) => updateMaterial('task_id',event.target.value)}>
                  <option value={`${props.materialTaskId}`}>{materialTask}</option>
                  {taskList
                     .filter(el => el.task_type !== materialTask && el.material_type !== null )
                     .map(type => <option value={`${type.task_id}`} > {type.task_type} </option>)
                  }
            </select>

            <h3 className="line-item-column-seven">{`$${material.unit_cost}`}</h3>
            <h3 className="line-item-column-eight">{`$${material.unit_cost  * materialQuantity}`}</h3>
         </div>
         <button className="new-line-button" onClick={()=> props.addLineItem()}>+</button>
      </div>
      )
}
export default Material;