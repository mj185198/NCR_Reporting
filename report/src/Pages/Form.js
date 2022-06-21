import React, { useState } from "react";
import httpClient from "../httpClient";
import {Link} from 'react-router-dom';
import TotalTable from '../Components/TotalTable';
import Barchart from "../Components/Barchart";
import Linechart from "../Components/Linechart";
import Piechart from "../Components/Piechart";

const Form = () => {
    const [org,setOrg]=useState('');
    const [srt,setSRT]=useState('');
    const [pi,setPI]=useState(0);
    const [sprint,setSprint]=useState('');
    const [sol,setSol]=useState('');
    const [data, setData]=useState([]);
    const [chart, setChart] = useState("totaltable");
    
    
    var totalCases = [];
    var totalPass = [];
    var totalFail = [];
    var datetime = [];
    var id = [];
    var x_label = [];
    var solutionstack = [];
    const background1 = [];
    data.map((item, i) => {
       {
          totalCases.push(item["Total_Test_Cases"])
          totalPass.push(item["Total_Test_Passed"])
          totalFail.push(item["Total_Test_Failed"])
          datetime.push(item["Time_Stamp"])
          solutionstack.push(item["Solution_Stack"])
          id.push(item["Id"])
      x_label.push(i+1)
    }
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    background1.push('rgba('+r+', '+g+', '+b+', 0.8)');
  })

  const Filter = async () => {
    console.log(org,srt,pi,sprint,sol);
    // try {
      const resp = await httpClient.post("//localhost:5000/release", {
        org,
        srt,
        pi,
        sprint,
        sol,
      });
      console.log(resp.data);
      setData(resp.data);
  };
  const Organization = [ {id:0,label: "Select option", value: "Select option"},
    {id : 1,label: "Banking Core", value: "Banking Core"}]
        const SRT = [ {id:0,label: "Select option", value: "Select option"},
          {id : 1,label: "EAB", value: "EAB"},
                 {id : 1,label: "ICE", value: "ICE"}
                ]
        const PI = [
          {id:0,label: "Select option", value: "Select option"},
            { id : 1,label: "21.1", value: 21.1 },
            { id : 2,label: "21.2", value: 21.2 },
            { id : 3,label: "21.3", value: 21.3 },
            { id : 4,label: "21.4", value: 21.4 },
            { id : 5,label: "22.1", value: 22.1 },
            { id : 6,label: "22.2", value: 22.2 },
        ];
        const Sprint = [
          {id:0,label: "Select option", value: "Select option"},
            { id : 1,label: "S1", value: "S1" },
            { id : 2,label: "S2", value: "S2" },
            { id : 3,label: "S3", value: "S3" },
            { id : 4,label: "S4", value: "S4" },
            { id : 5,label: "S5", value: "S5" },
            { id : 6,label: "S6", value: "S6" },
        ];
        const Solution = [
          {id:0,label: "Select option", value: "Select option"},
            { id : 1,label: "AE_CxM", value: "AE_CxM" },
            { id : 2,label: "ESS_AE_CxTH_ISO", value: "ESS_AE_CxTH_ISO" },
            { id : 3,label: "AE_IB", value: "AE_IB" },
            { id : 4,label: "AE_CxTH-NDC", value: "AE_CxTH-NDC" },
            { id : 5,label: "AE_NDCHOST", value: "AE_NDCHOST" },
            { id : 6,label: "AE_CxTH-ISO", value: "AE_CxTH-ISO" },
        ];

  return (
    <div>
      <h1>Apply Filters</h1>
      <form>


        <select name="org" value={org?.value}  onChange={(e)=>{
          setOrg(e.target.value);
          console.log(org);
        }} >
            {Organization.map((Organization) => (
          <option key={Organization.id} value={Organization.value}>{Organization.label}</option>

          ))}
        </select>

        <select name="srt" id="" onChange={(e)=>setSRT(e.target.value)}>
            {SRT.map((SRT) => (
            <option key={SRT.id} value={SRT.value}>{SRT.label}</option>
            ))}
        </select>
        <select name="pi" id="" onChange={(e)=>setPI(e.target.value)}>
            {PI.map((PI) => (
            <option key={PI.id} value={PI.value}>{PI.label}</option>
            ))}
        </select>

        <select name="sprint" id="" onChange={(e)=>{
          setSprint(e.target.value);
          console.log(sprint);
        }
        }>
            {Sprint.map((Sprint) => (
            <option key={Sprint.id} value={Sprint.value}>{Sprint.label}</option>
            ))}

        </select>

        <select name = "sol" id="" onChange={(e)=>{
          setSol(e.target.value);
          console.log(sol);
        }} >
            {Solution.map((Solution) => (
            <option key={Solution.id} value={Solution.value}>{Solution.label}</option>
        ))}
        </select>

        <button type="button" onClick={() => Filter()}>
          Apply
        </button>

      </form>

      <div>
            <button onClick={() => {setChart("totaltable")}}>Table</button>
            <button onClick={() => {setChart("bar")}}>Bar Chart</button>
            <button onClick={() => {setChart("line")}}>Line Chart</button>
            <button onClick={() => {setChart("pie")}}>Pie Chart</button>
            {chart === "totaltable" && <TotalTable data ={data}/>}
            {chart === "bar" && <Barchart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {chart === "line" && <Linechart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {chart === "pie" && <Piechart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} background1={background1} /> }
            {/* {chart === "totaltable" && <TotalTable id={id} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} datetime={datetime} solutionstack={solutionstack}/>} */}
    </div>

      {/* <Link to={{
      pathname: '/totalstat',
      state: data
      }} >See Release Statistics</Link> */}

    </div>
  );
};

export default Form;












































/* onSubmit={() => 
        
        // use python function directly here
        {

          // var data = eel.filterData();
          // console.log(data);

          fetch( "http://127.0.0.1:5000/release",{
          method: "POST",
          // make sure to serialize your JSON body
          body: JSON.stringify({
            Organization : Organization,
            SRT : SRT,
            PI : PI,
            Sprint : Sprint,
            Solution : Solution
          })
        }
        )
        .then( (response) => { 
          //do something awesome that makes the world a better place
          console.log(response);
        });

        }} */
        // const history = useHistory();

    // const routeChange = () =>{
    // let path = `newPath`;
    // history.push(path);
    // }
    // const [org,setOrg]=useState('');
    // const [srt,setSRT]=useState('');
    // const [pi,setPI]=useState(0);
    // const [sprint,setSprint]=useState('');
    // const [sol,setSol]=useState('');
    // const handle = (e)=>{
    //     e.preventDefault();
    //     const val = {org,srt,pi,sprint,sol};
    //     fetch('http://localhost:5000/release',{
    //         method: 'POST',
    //         headers: {"Content-Type":"application/json"},
    //         body: JSON.stringify(val)
    //         }).then(()=>{
    //         console.log('data sent');
    //     })
    // }























































// import React,{useState,useEffect,Component} from 'react';
// import Select from 'react-select';

// export class Form extends Component(){
//     constructor(props) {  
//         super(props);
//     }
//     // const history = useHistory();
  
//     // const routeChange = () =>{ 
//     // let path = `newPath`; 
//     // history.push(path);
//     // }
//     // const [org,setOrg]=useState('');
//     // const [srt,setSRT]=useState('');
//     // const [pi,setPI]=useState(0);
//     // const [sprint,setSprint]=useState('');
//     // const [sol,setSol]=useState('');
//     // const handle = (e)=>{
//     //     e.preventDefault();
//     //     const val = {org,srt,pi,sprint,sol};
//     //     fetch('http://localhost:5000/release',{
//     //         method: 'POST',
//     //         headers: {"Content-Type":"application/json"},
//     //         body: JSON.stringify(val)
//     //         }).then(()=>{
//     //         console.log('data sent');
//     //     })         
//     // }
//     render() { 
//         const Organization = [{label: "Banking Core", value: "Banking Core"}]
//         const SRT = [{label: "EAB", value: "EAB"},
//                  {label: "ICE", value: "ICE"}
//                 ]
//         const PI = [
//             { label: "21.1", value: 21.1 },
//             { label: "21.2", value: 21.2 },
//             { label: "21.3", value: 21.3 },
//             { label: "21.4", value: 21.4 },
//             { label: "22.1", value: 22.1 },
//             { label: "22.2", value: 22.2 },
//         ];
//         const Sprint = [
//             { label: "S1", value: "S1" },
//             { label: "S2", value: "S2" },
//             { label: "S3", value: "S3" },
//             { label: "S4", value: "S4" },
//             { label: "S5", value: "S5" },
//             { label: "S6", value: "S6" },
//         ];
//         const Solution = [
//             { label: "AE_CxM", value: "AE_CxM" },
//             { label: "ESS_AE_CxTH_ISO", value: "ESS_AE_CxTH_ISO" },
//             { label: "AE_IB", value: "AE_IB" },
//             { label: "AE_CxTH-NDC", value: "AE_CxTH-NDC" },
//             { label: "AE_NDCHOST", value: "AE_NDCHOST" },
//             { label: "AE_CxTH-ISO", value: "AE_CxTH-ISO" },
//         ];
//         return (
//             <>
//             <form onSubmit={() =>{

//                 fetch( "http://127.0.0.1:5000/release",

//                 // method: "POST",

//                 //make sure to serialize your JSON body

//                 // body: JSON.stringify({

//                 //   Organization : Organization,

//                 //   SRT : SRT,

//                 //   PI : PI,

//                 //   Sprint : Sprint,

//                 //   Solution : Solution

//                 // })

//                 )

//                 .then( (response) => {

//                 //do something awesome that makes the world a better place

//                 console.log(response);

//                 });



//                 }}>
//                 
//             <button>Submit</button>
//             </form>
//             {/* <form onSubmit={handle}>
//                 <select id="Organization" onChange={(e)=>setOrg(e.target.value)}>
//                     {Organization.map((Organization) => (
//                     <option value={Organization.value}>{Organization.label}</option>
//                     ))}
//                 </select>
//                 <select id="SRT" onChange={(e)=>setSRT(e.target.value)}>
//                     {SRT.map((SRT) => (
//                     <option value={SRT.value}>{SRT.label}</option>
//                     ))}
//                 </select>
//                 <select id="PI" onChange={(e)=>setPI(e.target.value)}>
//                     {PI.map((PI) => (
//                     <option value={PI.value}>{PI.label}</option>
//                     ))}
//                 </select>
//                 <select id="Sprint" onChange={(e)=>setSprint(e.target.value)}>
//                     {Sprint.map((Sprint) => (
//                     <option value={Sprint.value}>{Sprint.label}</option>
//                     ))}
//                 </select>
//                 <select id="Solution" onChange={(e)=>setSol(e.target.value)}>
//                     {Solution.map((Solution) => (
//                     <option value={Solution.value}>{Solution.label}</option>
//                     ))}
//                 </select>
//             <button>Submit</button>
//             </form> */}
//             </>
//             );
//         }
// }

// export default Form;