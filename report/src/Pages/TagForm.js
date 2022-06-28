import React, { useState, useRef } from "react";
import httpClient from "../httpClient";
import TagTable from "../Components/TagTable";
import CompareTagTable from "../Components/CompareTagTable";
import Barchart from "../Components/Barchart";
import Linechart from "../Components/Linechart";
import StackedBarchart from "../Components/StackedBarchart";
import { useReactToPrint } from "react-to-print";

const xlsx = require("xlsx");

const TagForm = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [org, setOrg] = useState("");
  const [srt, setSRT] = useState("");
  const [pi, setPI] = useState(0);
  const [sprint, setSprint] = useState("");
  const [tagname, setTagname] = useState("");
  const [sol, setSol] = useState("");
  const [data, setData] = useState([]);
  const [chart, setChart] = useState("bar");
  const [click, setClick] = useState(false);
  const [compareData, setCompareData] = useState([]);
  const[button,setButton] = useState("");

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

  var count = [];
  var comparecount = [];
  var comparefail = [];
  var totalFail1 = [];

  data.map((item, i) => {
    {
      totalCases.push(item["Total_Test_Cases"]);
      totalPass.push(item["Total_Test_Passed"]);
      totalFail.push(item["Total_Test_Failed"]);
      x_label.push(item["Time_Stamp"].slice(4,8)+"_"+item["Sprint"]+"_"+item["Test_Execution_Id"]+"__"+"PI "+item["PI"]+"_"+item["Id"]+"_"+item["Report_Id"]);
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

  const Compare = async () => {
    console.log(org, srt, pi, sol);
    var elem = document.getElementById("sprint");
    elem.style.display = 'none';
    var elem1 = document.getElementById("sol");
    elem1.style.display = 'none';

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
    var elem = document.getElementById("sprint");
    elem.style.display = 'initial';
    var elem1 = document.getElementById("sol");
    elem1.style.display = 'initial';
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
      window.alert("No data to show for the selected filters");
    
    }
    else{
      setData(resp.data);
      console.log("Data variable = "+String(data));
    }
  }
  };
  const Organization = [
    { id: 0, label: "Select Organization", value: "" },
    { id: 1, label: "Banking Core", value: "Banking Core" },
  ];
  const SRT = [
    { id: 0, label: "Select SRT", value: "Select option" },
    { id: 1, label: "EAB", value: "EAB" },
    { id: 1, label: "ICE", value: "ICE" },
  ];
  const PI = [
    { id: 0, label: "Select PI", value: "Select option" },
    { id: 1, label: "21.1", value: 21.1 },
    { id: 2, label: "21.2", value: 21.2 },
    { id: 3, label: "21.3", value: 21.3 },
    { id: 4, label: "21.4", value: 21.4 },
    { id: 5, label: "22.1", value: 22.1 },
    { id: 6, label: "22.2", value: 22.2 },
  ];
  const Tagname = [
    { id: 0, label: "Select Tagname", value: "" },
    { id: 1, label: "DynamicSubAccount", value: "DynamicSubAccount" },
    { id: 2, label: "IB", value: "IB" },
    { id: 3, label: "Fee", value: "Fee" },
    { id: 4, label: "Withdrawal", value: "Withdrawal" },
    { id: 5, label: "CashPayment", value: "CashPayment" },
    { id: 6, label: "EndDeposit", value: "EndDeposit" },
    { id: 7, label: "Broadbased", value: "Broadbased" },
    { id: 8, label: "DCCVISA", value: "DCCVISA" },
    { id: 9, label: "MultiLanguage", value: "MultiLanguage" },
    { id: 10, label: "DCCGood", value: "DCCGood" },
    { id: 11, label: "Good", value: "Good" },
    { id: 12, label: "ESSCashD", value: "ESSCashD" },
    { id: 13, label: "ChainingDisable", value: "ChainingDisable" },
    { id: 14, label: "FeeOverride", value: "FeeOverride" },
    { id: 15, label: "Mini Statement Good", value: "Mini Statement Good" },
    { id: 16, label: "Grouping", value: "Grouping" },
    { id: 17, label: "WithoutReceipt", value: "WithoutReceipt" },
    { id: 18, label: "ReciptOption4", value: "ReciptOption4" },
    { id: 19, label: "OtherAmount", value: "OtherAmount" },
    { id: 20, label: "Pinchange", value: "Pinchange" },
    { id: 21, label: "BillMix", value: "BillMix" },
    { id: 22, label: "MiniStatementMultiplePages", value: "MiniStatementMultiplePages" },
    { id: 23, label: "FastCash", value: "FastCash" },
    { id: 24, label: "Unchained", value: "Unchained" },
    { id: 25, label: "Deletepreferences", value: "Deletepreferences" },
    { id: 26, label: "ExistingCustomer", value: "ExistingCustomer" },
    { id: 27, label: "ChangePin", value: "ChangePin" },
    { id: 28, label: "Preferences", value: "Preferences" },
    { id: 29, label: "MixedMedia", value: "MixedMedia" },
    { id: 30, label: "Accounts", value: "Accounts" },
    { id: 31, label: "DepositContinuation", value: "DepositContinuation" },
    { id: 32, label: "EnhancedCashDeposit", value: "EnhancedCashDeposit" },
    { id: 33, label: "MiniStatement", value: "MiniStatement" },
    { id: 34, label: "CXM", value: "CXM" },
    { id: 35, label: "Generic Transaction", value: "Generic Transaction" },
    { id: 36, label: "EnhancedDeposit", value: "EnhancedDeposit" },
    { id: 37, label: "Targeted marketing", value: "Targeted marketing" },
    { id: 38, label: "Transfer", value: "Transfer" },
    { id: 39, label: "CxM_Prferences", value: "CxM_Prferences" },
    { id: 40, label: "OAR", value: "OAR" },
    { id: 41, label: "MixedMediaDeposit", value: "MixedMediaDeposit" },
    { id: 42, label: "CashDeposit", value: "CashDeposit" },
    { id: 43, label: "HostDenial", value: "HostDenial" },
    { id: 44, label: "ESSCashDep", value: "ESSCashDep" },
    { id: 45, label: "Withdrawal Fee timeout", value: "Withdrawal Fee timeout" },
    { id: 46, label: "NonGrouping", value: "NonGrouping" },
    { id: 47, label: "GenericTransaction", value: "GenericTransaction" },
    { id: 48, label: "DynamicTextVG", value: "DynamicTextVG" },
    { id: 49, label: "UserError", value: "UserError" },
    { id: 50, label: "TargetMarketing", value: "TargetMarketing" },
    { id: 51, label: "ESSAccDnld", value: "ESSAccDnld" },
    { id: 52, label: "NDCPreferences", value: "NDCPreferences" },
    { id: 53, label: "Chained", value: "Chained" },
    { id: 54, label: "Sanity", value: "Sanity" },
    { id: 55, label: "Regression", value: "Regression" },
    { id: 56, label: "Progressive", value: "Progressive" },
    { id: 57, label: "DCC", value: "DCC" },
    { id: 58, label: "Denial", value: "Denial" },
    { id: 59, label: "Electronicpayment", value: "Electronicpayment" },
    { id: 60, label: "Balance", value: "Balance" },
    { id: 61, label: "EMV", value: "EMV" },
    { id: 62, label: "AccDnld", value: "AccDnld" },
    { id: 63, label: "CardBeforeCash", value: "CardBeforeCash" },
    { id: 64, label: "MultiplePages", value: "MultiplePages" },
    { id: 65, label: "Chaining", value: "Chaining" },
    { id: 66, label: "CheckPayment", value: "CheckPayment" },

  ];
  const Sprint = [
    { id: 0, label: "Select Sprint", value: "" },
    { id: 1, label: "S1", value: "S1" },
    { id: 2, label: "S2", value: "S2" },
    { id: 3, label: "S3", value: "S3" },
    { id: 4, label: "S4", value: "S4" },
    { id: 5, label: "S5", value: "S5" },
    { id: 6, label: "S6", value: "S6" },
  ];
  const Solution = [
    { id: 0, label: "Select Solution", value: "" },
    { id: 1, label: "AE_CxM", value: "AE_CxM" },
    { id: 2, label: "ESS_AE_CxTH_ISO", value: "ESS_AE_CxTH_ISO" },
    { id: 3, label: "AE_IB", value: "AE_IB" },
    { id: 4, label: "AE_CxTH-NDC", value: "AE_CxTH-NDC" },
    { id: 5, label: "AE_NDCHOST", value: "AE_NDCHOST" },
    { id: 6, label: "AE_CxTH-ISO", value: "AE_CxTH-ISO" },
  ];

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
          {Organization.map((Organization) => (
            <option key={Organization.label} value={Organization.value}>
              {Organization.label}
            </option>
          ))}
        </select>

        <select
          name="srt"
          id=""
          onChange={(e) => setSRT(e.target.value)}
        >
          {SRT.map((SRT) => (
            <option key={SRT.label} value={SRT.value}>
              {SRT.label}
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
          {Tagname.map((Tagname) => (
            <option key={Tagname.label} value={Tagname.value}>
              {Tagname.label}
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
          {Solution.map((Solution) => (
            <option key={Solution.label} value={Solution.value}>
              {Solution.label}
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
            {totalCases.length > 0 && button==="filter" && click === true && chart === "bar" && <Barchart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {click === true && button==="filter" && chart === "tagtable" && <TagTable data ={data}/>}
            {click === true && button==="filter" && chart === "line" && <Linechart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {click === true && button==="filter" && chart === "stackedbar" && <StackedBarchart x_label={x_label} totalPass={count} totalFail={totalFail1} /> } 
            {totalCases.length > 0 && button==="compare" && click === true && chart === "bar" && <Barchart x_label={xlabel} totalPass={pass} totalFail={fail} /> }
            {click === true && button==="compare" && chart === "tagtable" && <CompareTagTable compareData ={compareData}/>}
            {click === true && button==="compare" && chart === "line" && <Linechart x_label={xlabel} totalCases={total} totalPass={pass} totalFail={fail} /> }
            {click === true && button==="compare" && chart === "stackedbar" && <StackedBarchart x_label={xlabel} totalPass={comparecount} totalFail={comparefail} /> }
        </div>
      </div>
    </div>
  );
};

export default TagForm;
