import React, { useState, useRef } from "react";
import httpClient from "../httpClient";
import { Link } from "react-router-dom";
import TagTable from "../Components/TagTable";
import CompareTagTable from "../Components/CompareTagTable";
import Barchart from "../Components/Barchart";
import Linechart from "../Components/Linechart";
import StackedBarchart from "../Components/StackedBarchart";
import { useReactToPrint } from "react-to-print";

const xlsx = require("xlsx");

const TagForm = (props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  console.log(props.tagdata);

  const [org, setOrg] = useState("");
  const [srt, setSRT] = useState("");
  const [pi, setPI] = useState(0);
  const [sprint, setSprint] = useState("");
  const [tagname, setTagname] = useState("");
  const [sol, setSol] = useState("");
  const [data, setData] = useState([]);
  const [chart, setChart] = useState("bar");
  const [click, setClick] = useState(false);
  const[solStack, setSolStack] = useState("");
  const [compareData, setCompareData] = useState([]);
  const[button,setButton] = useState("");
  const [comment, setComment] = useState("");

  var PI = [];
  var Org = [];
  var Srt = [];
  var Sol = [];
  var SolStack = [];
  var Sprint = [];
  var Tag = [];

  var totalCases = [];
  var totalPass = [];
  var totalFail = [];
  var x_label = [];

  var total = [];
  var pass = [];
  var fail = [];
  var xlabel = [];

  var background1=[];
  var background2=[];

  data.map((item, i) => {
    {
      totalCases.push(item["Total_Test_Cases"]);
      totalPass.push(item["Total_Test_Passed"]);
      totalFail.push(item["Total_Test_Failed"]);
      x_label.push(
        "PI " +
          item["PI"] +
          "_" +
          item["Sprint"] +
          "_" +
          item["Test_Execution_Id"] +
          "_" +
          item["Time_Stamp"].slice(4, 8)
      );
    }
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    background1.push("rgba(" + r + ", " + g + ", " + b + ", 0.8)");
  });

  compareData.map((item, i) => {
    {
   total.push(item["total"])
   pass.push(item["totalPass"])
   fail.push(item["totalFail"])
   xlabel.push("PI "+item["PI"]+"_"+item["Sprint"])
          
     }
     const r = Math.floor(Math.random() * 255);
     const g = Math.floor(Math.random() * 255);
     const b = Math.floor(Math.random() * 255);
     background2.push('rgba('+r+', '+g+', '+b+', 0.8)');
   })

  const export_to_excel = (data, name) => {
    console.log(data);
    if (data.length > 0) {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, name);
      xlsx.write(workbook, { bookType: "xlsx", type: "buffer" });
      xlsx.write(workbook, { bookType: "xlsx", type: "binary" });
      xlsx.writeFile(workbook, name + ".xlsx");
    } else {
      window.alert("Empty data cannot be exported !");
    }
  };

  const Compare = async () => {
    console.log(org, srt, pi, sol);
    // try {
      if(org === '' && srt === '' && pi === 0 && tagname === ''){
        window.alert("Please select a filter before clicking apply !");
      }
      else{
    const resp = await httpClient.post("//localhost:5000/tagcompare", {
      org,
      srt,
      pi,
      tagname,
    });
    console.log(resp.data);

    setCompareData(resp.data);
  }
    // console.log("Compare Data : "+compareData);
    
  };

  const Filter = async () => {
    console.log(org, srt, pi, tagname, sol);

    if(org === '' && srt === '' && pi === 0 && sprint === '' && sol === '' && tagname === ''){
      window.alert("Please select a filter before clicking apply !");
    }
    else{
    const resp = await httpClient.post("//localhost:5000/tag", {
      org,
      srt,
      pi,
      sprint,
      tagname,
      sol,
    });
    console.log(resp.data);
    if(resp.data.length === 0){
      setData([]);
      window.alert("No data to show for the selected filters");
    
    }
    else{
      setData(resp.data);
      console.log("Data variable = "+String(data));
    }
  }
  };
  Org.push({ id : -1 , label : "Select Organization" , value : '' });
  for(var i = 0; i < props.orgdata.length; i++){
    Org.push({ id : i , label : props.orgdata[i][0] , value : props.orgdata[i][0] });
}
Srt.push({ id : -1 , label : "Select SRT" , value : '' });
for( i = 0; i < props.srtdata.length; i++){
  Srt.push({ id : i , label : props.srtdata[i][0] , value : props.srtdata[i][0] });
}
PI.push({ id : -1 , label : "Select PI" , value : '' });
console.log(PI);
for( i = 0; i < props.pidata.length; i++){
  PI.push({ id : i , label : props.pidata[i][0] , value : props.pidata[i][0] });
}
Sprint.push({ id : -1 , label : "Select Sprint" , value : '' });
for( i = 0; i < props.sprintdata.length; i++){
  Sprint.push({ id : i , label : props.sprintdata[i][0] , value : props.sprintdata[i][0] });
}
Sol.push({ id : -1 , label : "Select Solution" , value : '' });
for( i = 0; i < props.soldata.length; i++){
  Sol.push({ id : i , label : props.soldata[i][0] , value : props.soldata[i][0] });
}
SolStack.push({ id : -1 , label : "Select Solution Stack" , value : '' });
for( i = 0; i < props.solstackdata.length; i++){
  SolStack.push({ id : i , label : props.solstackdata[i][0] , value : props.solstackdata[i][0] });
}
Tag.push({ id : -1 , label : "Select Tag Name" , value : '' });
for( i = 0; i < props.tagdata.length; i++){
  Tag.push({ id : i , label : props.tagdata[i][0] , value : props.tagdata[i][0] });
}
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Tag-wise Report</h2>
      <div className="print-button">
        <button style={{ float: "right" }} onClick={handlePrint}>
          Export to PDF
        </button>
        <button
          style={{ float: "right" }}
          onClick={() => export_to_excel(data, pi + "_" + sprint + "_" + sol)}
        >
          Export to Excel
        </button>
      </div>
      <h3>Filter Options</h3>
      <form>
        <select
          required={true}
          name="org"
          value={org?.value}
          onChange={(e) => {
            setOrg(e.target.value);
            console.log(org);
          }}
        >
          {Org.map((Org) => (
            <option key={Org.label} value={Org.value}>
              {Org.label}
            </option>
          ))}
        </select>

        <select
          name="srt"
          id=""
          onChange={(e) => setSRT(e.target.value)}
          // required = {true}
        >
          {Srt.map((Srt) => (
            <option key={Srt.label} value={Srt.value}>
              {Srt.label}
            </option>
          ))}
        </select>
        <select
          name="pi"
          id=""
          onChange={(e) => setPI(e.target.value)}
          // required = {true}
        >
          {PI.map((PI) => (
            <option key={PI.label} value={PI.value}>
              {PI.label}
            </option>
          ))}
        </select>

        <select
          name="sprint"
          id=""
          onChange={(e) => {
            setSprint(e.target.value);
            console.log(sprint);
          }}
        >
          {Sprint.map((Sprint) => (
            <option key={Sprint.label} value={Sprint.value}>
              {Sprint.label}
            </option>
          ))}
        </select>

        <select
          name="tagname"
          id=""
          onChange={(e) => {
            setTagname(e.target.value);
          }}
          required
        >
          {Tag.map((Tag) => (
            <option key={Tag.label} value={Tag.value}>
              {Tag.label}
            </option>
          ))}
        </select>

        <select
          name="sol"
          id=""
          onChange={(e) => {
            setSol(e.target.value);
            console.log(sol);
          }}
          required
        >
          {Sol.map((Sol) => (
            <option key={Sol.label} value={Sol.value}>
              {Sol.label}
            </option>
          ))}
        </select>
        <select
          name="sol"
          id=""
          onChange={(e) => {
            setSolStack(e.target.value);
            console.log(solStack);
          }}
          required
        >
          {SolStack.map((SolStack) => (
            <option key={SolStack.label} value={SolStack.value}>
              {SolStack.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => {
            setButton("filter");
            setClick(true);
            Filter();
          }}
        >
          Apply
        </button>

        <button
          type="button"
          onClick={() => {
            setButton("compare");
            setClick(true);
            Compare();
          }}
        >
          Compare by sprint
        </button>
      </form>

      <div>
        <button
          onClick={() => {
            setChart("bar");
          }}
        >
          Bar Chart
        </button>
        <button
          onClick={() => {
            setChart("tagtable");
          }}
        >
          Table
        </button>
        <button
          onClick={() => {
            setChart("line");
          }}
        >
          Line Chart
        </button>
        <button
          onClick={() => {
            setChart("stackedbar");
          }}
        >
          StackedBar Chart
        </button>
        <div ref={componentRef}>
            {click === true && data.length > 0 &&   <h1><center>Tag-wise Results for PI {pi} Sprint {sprint}</center></h1> }
            {totalCases.length > 0 && button==="filter" && click === true && chart === "bar" && <Barchart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {click === true && button==="filter" && chart === "tagtable" && <TagTable data ={data}/>}
            {click === true && button==="filter" && chart === "line" && <Linechart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {click === true && button==="filter" && chart === "stackedbar" && <StackedBarchart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> } 
            {totalCases.length > 0 && button==="compare" && click === true && chart === "bar" && <Barchart x_label={xlabel} totalCases={total} totalPass={pass} totalFail={fail} /> }
            {click === true && button==="compare" && chart === "tagtable" && <CompareTagTable compareData ={compareData}/>}
            {click === true && button==="compare" && chart === "line" && <Linechart x_label={xlabel} totalCases={total} totalPass={pass} totalFail={fail} /> }
            {click === true && button==="compare" && chart === "stackedbar" && <StackedBarchart x_label={xlabel} totalCases={total} totalPass={pass} totalFail={fail} /> }
            <br/> <br/>
            {click === true && data.length > 0 && <p>{comment}</p>}
            {click === true && data.length > 0 && <label for = "comment">Comments :</label> } <br /><br />
            {click === true && data.length > 0 && <input type = "text" name = "comment" /> } 
            {click === true && data.length > 0 && <input type = "button" name = "comment" /> } 
        </div>
      </div>

      {/* <Link to={{
      pathname: '/totalstat',
      state: data
      }} >See Release Statistics</Link> */}
    </div>
  );
};

export default TagForm;
