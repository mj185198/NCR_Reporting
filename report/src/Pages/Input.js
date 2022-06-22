import React,{useState} from "react";
import Form from "../Pages/Form"
import TagForm from "../Pages/TagForm"

const Input = () => {

  const [option, setOption] = useState(null);
  return (
    <div>
      <div>
        <button onClick={() => { setOption("total")
        }}>Release</button>
        <button onClick={() => { setOption("tag")
        }}>Tag</button>
        { option === "total" &&  <Form />}
        { option === "tag" &&  <TagForm />}
      </div>
    </div> );
  };


export default Input;





































// import React from 'react';
// import { ReactDOM } from 'react-dom';
// import TotalTable from '../Components/TotalTable';
// import { BrowserRouter , Routes,Route} from "react-router-dom";
// import Form from '../Components/Form';





























// // function TagForm(){


// //     return (
// //         <form action="http://localhost:5000/tag" method='post'>
// //         <label>
// //         Report_Id
// //         <input name="Report_Id" type="number"  min={1} max={50000} />
// //         </label>
// //         <input type = "submit" value = "submit"/>
// //         </form>
// //     );

// // }

// function Input(){
//     // const options = [
//     //     {label:"Select_Filter",value:"Select_Filter"},
//     //     { label: "Release_Stat", value: "Release_Stat" },
//     //     { label: "Tag_Stat", value: "Tag_Stat" },
//     //     { label: "Suite_Stat", value: "Suite_Stat" },
//     //   ];
//     const [filter, setFilter] = useState("");
//     console.log(filter)
    
//     // function handleChange(e){
//     //     console.log("Filter Selected!");
//     //     setFilter(e.target.value);
//     // }
//     //  if(filter === "Tag_Stat"){
//     //     return(
//     //         <div>
//     //          <TagForm />
//     //         </div>
//     //     ); 
//     // }
//     return(
//         <>
//         {/* <form>
//         <select value="Select_Filter" onChange={handleChange}>
//             {options.map((option) => (
//               <option value={option.value}>{option.label}</option>
//             ))}
//           </select>
//         </form> */}
//         <button onClick={() => {setFilter("Release_Stat")}}>Release</button>
//         <button onClick={() => {setFilter("Tag_Stat")}}>Tag</button>
//         {/* <button onClick={() => {setfilter("pie")}}>Pie Chart</button> */}
//         {filter === "Release_Stat" && <Form /> }
//         {filter === "Tag_Stat" && <Form /> }
//         </>
//     );
// }





// export default Input;













// function onSubmitForm() {

    //     window.location = "localhost:8080/test/index.php?Title=" +
      
    //       document.querySelector('title').textContent;
      
    //   }
    // const url ="http://127.0.0.1:5000/release"
    // const [data,setData] = useState({
    //     Organization: "",
    //     SRT: "",
    //     PI: "",
    //     Sprint: "",
    //     Solution: ""
    // })
    // function handle(e){
    //     const newdata = {...data}
    //     newdata[e.target.id] = e.target.value
    //     setData(newdata)
    //     console.log(newdata)
    // }

    // function login(e){
    //     e.preventDefault();
    //     Axios.post(url, {
    //             Organization: data.Organization,
    //             SRT: data.SRT,
    //             PI: data.PI,
    //             Sprint: data.Sprint,
    //             Solution: data.Solution
    //         })
    //         .then((res) => {
    //             console.log(res.data);
    //         });
    // }