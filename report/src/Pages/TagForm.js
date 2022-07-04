import React, { useState, useRef } from "react";
import httpClient from "../httpClient";
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
  // const [comment, setComment] = useState("");
  const [noteButtonClick, setNoteButtonClick] = useState(false);

const [note, setNote] = useState("");

const [addNoteButton, setAddNoteButton] = useState(false);

  var filter = "";
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
  var x_label1 = [];

  var total = [];
  var pass = [];
  var fail = [];
  var xlabel = [];

  var background1=[];
  var background2=[];

  var count = [];
  var comparecount = [];
  var comparefail = [];
  var totalFail1 = [];

  const fetchNoteFromDb = async(fil) => {
    // if(button === "filter"){
    // filter = org+srt+pi+sprint+sol+solStack;}
    // else{
    //   filter = org+srt+pi+sol;
    // }
    filter = fil;
    console.log(filter);

    const db_note = await httpClient.post("//localhost:5000/getNote", {

      filter,

    });

    console.log("DB_Note :")

    console.log(db_note.data);
    setNote(db_note.data);

  }
  const fetchNote = async (fil) => {

    // console.log(org,srt,pi,sol);

    // if(org === '' && srt === '' && pi === 0  && sol === ''){

    const tarea = document.getElementById("addNoteArea");

    tarea.setAttribute("value","");

    //   window.alert("Please select a filter before clicking apply !")
    // filter = org+srt+pi+sprint+sol+solStack;
    // if(button === "filter"){
    //   filter = org+srt+pi+sprint+sol+solStack;}
    //   else{
    //     filter = org+srt+pi+sol;
    //   }
    filter = fil;
    console.log(filter);

    // }

    // else{
      // setFilter(org+srt+pi+sprint+sol+solstack);
      console.log("fetchNote parameters :")

      console.log(filter,note)

      const note_resp = await httpClient.post("//localhost:5000/addNote", {

        filter,

        note,

      });

      console.log("note_resp :")

      console.log(note_resp.data);

      // if(resp.data.length === 0){

      //   window.alert("No data to show for the selected filters");

      // }

      // else{

      setNote(note_resp.data);

  };

  data.map((item, i) => {
    {
      totalCases.push(item["Total_Test_Cases"]);
      totalPass.push(item["Total_Test_Passed"]);
      totalFail.push(item["Total_Test_Failed"]);
      x_label.push(item["Test_Execution_Id"]+"_"+item["Time_Stamp"].slice(4,8)+"_"+item["Id"]+"_"+item["Report_Id"]);
      x_label1.push(item["Test_Execution_Id"]+"_"+item["Time_Stamp"].slice(4,8));
      count.push(Math.round(((item["Total_Test_Passed"]*100)/item["Total_Test_Cases"])));
      totalFail1.push(Math.round(((item["Total_Test_Failed"]*100)/item["Total_Test_Cases"])));
    }
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    background1.push("rgba(" + r + ", " + g + ", " + b + ", 0.8)");
  });

  compareData.map((item, i) => {
    {
   total.push(item["total"]);
   pass.push(item["totalPass"]);
   fail.push(item["totalFail"]);
   comparecount.push(Math.round(((item["totalPass"]*100)/item["total"])));
   comparefail.push(Math.round(((item["totalFail"]*100)/item["total"])));
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

  const Compare = async (fil) => {
    console.log(fil);
    fetchNoteFromDb(fil);
    console.log(org, srt, pi, tagname);
    var elem = document.getElementById("sprint");
    elem.style.display = 'none';
    var elem1 = document.getElementById("sol");
    elem1.style.display = 'none';
    var elem2 = document.getElementById("solstack");
    elem2.style.display = 'none';

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

  const Filter = async (fil) => {
    console.log(fil);
    fetchNoteFromDb(fil);
    console.log(org, srt, pi, tagname, sol);
    var elem = document.getElementById("sprint");
    elem.style.display = 'initial';
    var elem1 = document.getElementById("sol");
    elem1.style.display = 'initial';
    var elem2 = document.getElementById("solstack");
    elem2.style.display = 'initial';
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
      solStack,
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
        >
          {PI.map((PI) => (
            <option key={PI.label} value={PI.value}>
              {PI.label}
            </option>
          ))}
        </select>

        <select
          name="sprint"
          id="sprint"
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
          id="sol"
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
          name="solstack"
          id="solstack"
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
            setAddNoteButton(false);
            setButton("filter");
            setClick(true);
            
            var val = org+srt+pi+sprint+tagname+sol+solStack;
            Filter(val);
          }}
        >
          Apply
        </button>

        <button
          type="button"
          onClick={() => {
            setButton("compare");
            setClick(true);
            var val2 = org+srt+pi+tagname;
            Compare(val2);
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
            {click === true && data.length > 0 && button==="filter" &&   <h1><center>Tag-wise Results for PI {pi} Sprint {sprint} - {tagname}</center></h1> }
            {click === true && data.length > 0 && button==="compare" && <h1><center>Tag-wise Results for PI {pi} Tag - {tagname}</center></h1> }
            {totalCases.length > 0 && button==="filter" && click === true && chart === "bar" && <Barchart x_label={x_label} x_label1={x_label1} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {click === true && button==="filter" && chart === "tagtable" && <TagTable data ={data}/>}
            {click === true && button==="filter" && chart === "line" && <Linechart x_label={x_label} x_label1={x_label1} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {click === true && button==="filter" && chart === "stackedbar" && <StackedBarchart x_label={x_label} x_label1={x_label1} totalPass={count} totalFail={totalFail1} /> }
            {totalCases.length > 0 && button==="compare" && click === true && chart === "bar" && <Barchart x_label={xlabel} totalPass={pass} totalFail={fail} /> }
            {click === true && button==="compare" && chart === "tagtable" && <CompareTagTable compareData ={compareData}/>}
            {click === true && button==="compare" && chart === "line" && <Linechart x_label={xlabel} totalCases={total} totalPass={pass} totalFail={fail} /> }
            {click === true && button==="compare" && chart === "stackedbar" && <StackedBarchart x_label={xlabel} totalPass={comparecount} totalFail={comparefail} /> }
            {<p>{note}</p>}
            <br/> <br/>
            
        </div>
        {noteButtonClick === false && addNoteButton === false && click === true && data.length > 0  && <button id="note" onClick={() => {setNoteButtonClick(true)}} >Add/Edit note</button>}<br/>

            {noteButtonClick === true &&  <textarea placeholder="Add a note here" id="addNoteArea" onInput={(e)=> {setNote(e.target.value)} }/>}<br/>

            {button === "filter" && click === true && data.length > 0 && noteButtonClick === true && <button id="addNote" onClick={() => {setAddNoteButton(true); fetchNote(org+srt+pi+sprint+tagname+sol+solStack);

            document.getElementById("addNoteArea").value = "";
            
            }} >Set note</button>}
            {button === "compare" && click === true && data.length > 0 && noteButtonClick === true && <button id="addNote" onClick={() => {setAddNoteButton(true); fetchNote(org+srt+pi+tagname);

            document.getElementById("addNoteArea").value = "";

            }} >Set note</button>}

            {click === true && data.length > 0 && noteButtonClick === true && <button name="cancel" id="cancel" onClick = {() => {fetchNoteFromDb(); setNoteButtonClick(false);}} >Cancel</button>}
      </div>
    </div>
  );
};

export default TagForm;
