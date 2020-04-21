const [materialQuantity, setMaterialQuantity] = useState(0),
//  [type,setType]= useState(document.getElementById("type").value),
[materialTypeList, setMaterialTypeList] = useState([]),
 [materialNameList, setMaterialNameList] = useState([]),
 [adjust, setAdjust] = useState(false),
 [taskTypeList, setTaskTypeList] = useState([]),
 [materialType, setMaterialType] = useState(props.materialType),
 [materialName, setMaterialName] = useState(props.materialName),
 [materialTaskType, setMaterialTaskType] = useState()

useEffect (() => {
// if (props.materialName)
getMaterialTypes();

//get  all materoals/tasktype info
},[])

const getMaterialTypes = async () => {
await  axios.get("/api/material/types").then(res => {
//  console.log(res.data);
setMaterialTypeList(res.data)
// setMaterialTypeList(materialTypeList.push(res.data))
//  console.log(materialTypeList);

}) 
},

// const getBidData = () => {
//    const {material_id, material_type, material_name, description, unit_cost} = material
//    if (props.material){
//       console.log(props.material)

//    }
//if bid data exists set material to all states  -- maybe use a ternary
// setMaterial 
// }

handleQuantity = (value) => {
if (value === "" ||  value >= 0){
console.log(value);
setMaterialQuantity(value)
console.log(materialQuantity)
}
},

handleTypeSelector = (value) => {
console.log(value);
setMaterialType(value);
const type = materialType;
axios.get(`/api/material/${type}`).then(res => {
console.log(res.data)
props.setMaterialNameList(res.data)
console.log(materialNameList)
})
setMaterialName(null);
},

handleNameSelector = (value) => {
console.log(value)
let type = materialType;
console.log(type)
if  (type){

let index = document.getElementById("material").value
console.log("index: ",index, "type: ", type )
axios.get(`/api/material/${type}`).then(res => {
console.log(res.data)
props.setMaterialNameList(res.data)
console.log(materialNameList)

})
type = "";
}
// if (index){
// const {material_id, material_type, material_name, description, unit_cost} = materialNameList[index]
// setMaterial({...material_id, 
//    material_type, 
//    material_name, 
//    description, 
//    unit_cost}) 
// }
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


{/* {console.log("price: ", props.material.unit_cost)}
{console.log("props:type: ", props.materialType)}
{consoleMaterialTypeList: ", materialTypeList)} */}
console.log(materialTypeList)
// console.log(type)
return(
<div className="bid-product-container">
<input className="delete-selector" type="checkbox" onClick={(event) => props.selectLineItem(props.bid_line, event)}/>
<div className="product-line">
<h3 className="column-one">{props.index + 1}</h3>
<input  className="column-two" 
      value={materialQuantity} 
      onChange={(event) => handleQuantity(event.target.value)}/> 
{/* {onChange={() => handleTypeSelector()} } */}
{materialType !== null ? (
   <select id="existing-type" 
      className="column-three"
      onChange={(event) => handleTypeSelector(event.target.value)}>
      <option defaultValue={`${props.materialType}`}> 
         {props.materialType} 
         </option>
            {materialTypeList.filter(el => el.material_type !== props.materialType && el.material_type !== null ).map(type => {
                     return <option value={`${type.material_type}`} > {type.material_type}  </option>
                  })
            }
   </select>
) : (   <select id="type" 
      className="column-three" >
      <option value={""}>{""}</option>
          {materialTypeList.filter(el => el.material_type !== null).map(type => {
                     return <option value={`${type.material_type}`} > {type.material_type}  </option>
                  })
         }
    </select>
)}
{/* {onClick={() => handleTypeSelector()} }*/}
{props.materialName !== null ? (
   <select id="existing-material" className="column-three" >
   <option value={props.materialName} selected>
      {props.materialName}</option>
      {materialNameList.map((el, index) => {
         return  <option value={index} > {el.material_name}  </option>
      })}
   </select>
) : (
<select id="material" className="column-three" onClick={(e) => handleNameSelector(e.target.value)} >
   <option value={""}>{""}</option>
      {materialNameList.map((el, index) => {
         return  <option value={el.material_name}> {el.material_name}  </option>
      })}
</select>
)}
<h3 className="column-four">{props.materialDescription}</h3>
{/* <h3 className="column-four">{props.material.description}</h3> */}
<select className="column-five">Task Type
      <option> Test </option>
      <option> Test1 </option>
</select>
<h3 className="column-six">{props.materialUnitCost}</h3>
{/* <h3 className="column-six">{props.material.price}</h3> */}
<h3 className="column-seven">{props.materialUnitCost * materialQuantity}</h3>
{/* <h3 className="column-seven">{props.material.price * materialQuantity}</h3> */}
</div>
<button className="new-line-button" onClick={()=> props.addLineItem()}>+</button>
</div>
)
}
