import React, { useState,useRef,useEffect } from "react";
import httpClient from "../httpClient";
import {Link} from 'react-router-dom';
import TotalTable from '../Components/TotalTable';
import Barchart from "../Components/Barchart";
import Linechart from "../Components/Linechart";
import Input from "./Input";
import StackedBarchart from "../Components/StackedBarchart";
import {useReactToPrint} from "react-to-print";
import axios from "axios";
import AsyncSelect from "react-select"




const xlsx = require('xlsx');

const Form = (props) => {  

  const [org,setOrg]=useState('');
const [srt,setSRT]=useState('');
const [pi,setPI]=useState(0);
const [sprint,setSprint]=useState('');
const [sol,setSol]=useState('');
const [solstack, setSolStack] = useState('');
const [data, setData]=useState([]);
const [chart, setChart] = useState("bar");
const [click , setClick] = useState(false);

const [compareData, setCompareData] = useState([]);

var PI = [];
var Org = [];
var Srt = [];
var Sol = [];
var SolStack = [];
var Sprint = []

console.log(props.pidata);



  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



  

    const background1 = [];
    const background2 = [];
    
    var totalCases = [];
    var totalPass = [];
    var totalFail = [];

    var x_label = [];


    data.map((item, i) => {
      {
         totalCases.push(item["Total_Test_Cases"]);
         totalPass.push(item["Total_Test_Passed"]);
         totalFail.push(item["Total_Test_Failed"]);
        
         x_label.push("PI "+item["PI"]+"_"+item["Sprint"]+"_"+item["Test_Execution_Id"]+"_"+item["Time_Stamp"].slice(4,8))
        
   }
   const r = Math.floor(Math.random() * 255);
   const g = Math.floor(Math.random() * 255);
   const b = Math.floor(Math.random() * 255);
   background1.push('rgba('+r+', '+g+', '+b+', 0.8)');

 })




  const export_to_excel = (data, name) => {
    console.log(data);
    if(data.length > 0){
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, name);
    xlsx.write(workbook, {bookType : 'xlsx', type : "buffer"});
    xlsx.write(workbook,{bookType:"xlsx",type:"binary"});
    xlsx.writeFile(workbook,name+".xlsx");
    }
    else{
      window.alert("Empty data cannot be exported !");
    }

}

const [compareSprint, setCompareSprint] = useState( {
  totalCases : [],
  totalPass : [],
  totalFail : [],
})

const Compare = async () => {
  console.log(org,srt,pi,sol);
    const resp = await httpClient.post("//localhost:5000/compare", {
      org,
      srt,
      pi,
      sol,
    });
    console.log(resp.data);


    setCompareData(resp.data);


};

//Filter


  const Filter = async () => {

    if(org === '' && srt === '' && pi === 0 && sprint === '' && sol === ''){
      window.alert("Please select a filter before clicking apply !")
    }


    // console.log(org,srt,pi,sprint,sol);
    // try {
    else{
      const resp = await httpClient.post("//localhost:5000/release", {
        org,
        srt,
        pi,
        sprint,
        sol,
        solstack
      });
      console.log(resp.data);

      if(resp.data.length === 0){
        window.alert("No data to show for the selected filters");
      }
      else{
      setData(resp.data);
      console.log("Data : ");
      console.log(data);
      }
    }

   
  };
  // const Organization = [ {id:0,label: "Select Organization", value: ""},
  //   {id : 1,label: "Banking Core", value: "Banking Core"}]
  //       const SRT = [ {id:0,label: "Select SRT", value: ""},
  //         {id : 1,label: "EAB", value: "EAB"},
  //                {id : 1,label: "ICE", value: "ICE"}
  //               ]


       

  

  //       const Sprint = [
  //         {id:0,label: "Select Sprint", value: ""},
  //           { id : 1,label: "S1", value: "S1" },
  //           { id : 2,label: "S2", value: "S2" },
  //           { id : 3,label: "S3", value: "S3" },
  //           { id : 4,label: "S4", value: "S4" },
  //           { id : 5,label: "S5", value: "S5" },
  //           { id : 6,label: "S6", value: "S6" },
  //       ];
  //       const Solution = [
  //         {id:0,label: "Select Solution", value: ""},
  //           { id : 1,label: "AE_CxM", value: "AE_CxM" },
  //           { id : 2,label: "ESS_AE_CxTH_ISO", value: "ESS_AE_CxTH_ISO" },
  //           { id : 3,label: "AE_IB", value: "AE_IB" },
  //           { id : 4,label: "AE_CxTH-NDC", value: "AE_CxTH-NDC" },
  //           { id : 5,label: "AE_NDCHOST", value: "AE_NDCHOST" },
  //           { id : 6,label: "AE_CxTH-ISO", value: "AE_CxTH-ISO" },
  //       ];
  Org.push({ id : -1 , label : "Select Organization" , value : '' });
  for(var i = 0; i < props.orgdata.length; i++){
    Org.push({ id : i , label : props.orgdata[i][0] , value : props.orgdata[i][0] });
}
Srt.push({ id : -1 , label : "Select SRT" , value : '' });
for(var i = 0; i < props.srtdata.length; i++){
  Srt.push({ id : i , label : props.srtdata[i][0] , value : props.srtdata[i][0] });
}
PI.push({ id : -1 , label : "Select PI" , value : '' });
console.log(PI);
for(var i = 0; i < props.pidata.length; i++){
  PI.push({ id : i , label : props.pidata[i][0] , value : props.pidata[i][0] });
}
Sprint.push({ id : -1 , label : "Select Sprint" , value : '' });
for(var i = 0; i < props.sprintdata.length; i++){
  Sprint.push({ id : i , label : props.sprintdata[i][0] , value : props.sprintdata[i][0] });
}
Sol.push({ id : -1 , label : "Select Solution" , value : '' });
for(var i = 0; i < props.soldata.length; i++){
  Sol.push({ id : i , label : props.soldata[i][0] , value : props.soldata[i][0] });
}
SolStack.push({ id : -1 , label : "Select Solution Stack" , value : '' });
for(var i = 0; i < props.solstackdata.length; i++){
  SolStack.push({ id : i , label : props.solstackdata[i][0] , value : props.solstackdata[i][0] });
}

      console.log("PI[] :");
      console.log(PI);

  return (
    <div>
      <h2 style={{textAlign:"center"}}>Test Results</h2>
      <div className="print-button">
          <button style={{float: "right"}} onClick={handlePrint}>Export to PDF</button>
          <button style={{float: "right"}} onClick={() => export_to_excel(data,pi+"_"+sprint+"_"+sol)}>Export to Excel</button>
      </div>
      <h3>Filter Options</h3>
      <form>
        <select name="org" value={org?.value}  onInput={(e)=>{
          setOrg(e.target.value);
          console.log(org);
        }} >
            {Org.map((Org) => (
          <option key={Org.label} value={Org.value}>{Org.label}</option>

          ))}
        </select>

        <select name="srt" id="" onInput={(e)=>setSRT(e.target.value)}>
            {Srt.map((Srt) => (
            <option key={Srt.label} value={Srt.value}>{Srt.label}</option>
            ))}
        </select>
        <select name="pi" id="" onInput={(e)=>setPI(e.target.value)}>
            {PI.map((PI) => (
            <option key={PI.label} value={PI.value}>{PI.label}</option>
            ))}
        </select>
        <select name="sprint" id="" onInput={(e)=>{
          setSprint(e.target.value);
          console.log(sprint);
        }
        }>
            {Sprint.map((Sprint) => (
            <option key={Sprint.label} value={Sprint.value}>{Sprint.label}</option>
            ))}

        </select>

        <select name = "sol" id="" onInput={(e)=>{
          setSol(e.target.value);
          console.log(sol);
        }} >
            {Sol.map((Sol) => (
            <option key={Sol.label} value={Sol.value}>{Sol.label}</option>
        ))}
        </select>

        <select name = "solstack" id="" onInput ={(e)=>{
          setSolStack(e.target.value);
          console.log(solstack);
        }} >
            {SolStack.map((SolStack) => (
            <option key={SolStack.label} value={SolStack.value}>{SolStack.label}</option>
        ))}
        </select>
        <button type="button" onClick={() => {
          setClick(true);
          if(org != '' && srt != '' && sprint != '' && pi != '' && sol != '' && solstack != ''){Filter()}
          else{ window.alert("Select all filters before applying !")}
          }}>
          Apply
        </button>

      </form>

      <div >
            <button onClick={() => {setChart("bar")}}>Bar Chart</button>
            <button onClick={() => {setChart("totaltable")}}>Table</button>
            <button onClick={() => {setChart("line")}}>Line Chart</button>
            <button onClick={() => {setChart("stackedbar")}}>StackedBar Chart</button>
            <div ref = {componentRef}>
            {totalCases.length > 0 && click === true && chart === "bar" && <Barchart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {click === true && chart === "totaltable" && <TotalTable data ={data}/>}
            {click === true && chart === "line" && <Linechart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {click === true && chart === "stackedbar" && <StackedBarchart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} background1={background1} /> }
            </div>
    </div>

  

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