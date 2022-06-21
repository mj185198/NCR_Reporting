import React, { useState } from "react";
import httpClient from "../httpClient";
import {Link} from 'react-router-dom';
import TagTable from '../Components/TagTable';
import Barchart from "../Components/Barchart";
import Linechart from "../Components/Linechart";
import Piechart from "../Components/Piechart";

const TagForm = () => {
    const [org,setOrg]=useState('');
    const [srt,setSRT]=useState('');
    const [pi,setPI]=useState(0);
    const [sprint,setSprint]=useState('');
    const [sol,setSol]=useState('');
    const [data, setData]=useState([]);
    const [chart, setChart] = useState("bar");
    const [table, setTable] = useState("");
    
    var totalCases = [];
    var totalPass = [];
    var totalFail = [];
    var datetime = [];
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
          x_label.push(item["Tag_Name"])
    }
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    background1.push('rgba('+r+', '+g+', '+b+', 0.8)');
  })

  const Filter = async () => {
    console.log(org,srt,pi,tagname,sol);
    // try {
      const resp = await httpClient.post("//localhost:5000/tag", {
        org,
        srt,
        pi,
        tagname,
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
        const tagname = [
          {id:0,label: "Select option", value: "Select option"},
            { id : 1,label: "DynamicSubAccount", value: "DynamicSubAccount" },
            { id : 2,label: "", value: "S2" },
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
            <button onClick={() => {setChart("bar")}}>Bar Chart</button>
            <button onClick={() => {setChart("line")}}>Line Chart</button>
            <button onClick={() => {setChart("pie")}}>Pie Chart</button>
            <button onClick={() => {setTable("tagtable")}}>Table</button>
            {chart === "bar" && <Barchart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {chart === "line" && <Linechart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {chart === "pie" && <Piechart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} background1={background1} /> }
            {table === "tagtable" && <TagTable x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} datetime={datetime} solutionstack={solutionstack}/>}
    </div>

      {/* <Link to={{
      pathname: '/totalstat',
      state: data
      }} >See Release Statistics</Link> */}
      
    </div>
  );
};

export default TagForm;

