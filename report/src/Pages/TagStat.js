import React,{useState,useEffect} from 'react';

import Barchart from "../Components/Barchart";
import Linechart from "../Components/Linechart";
import Piechart from "../Components/Piechart";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};


function TagStat() {
  const [data,setData]=useState([])
  const URL = "http://127.0.0.1:5000/tagstat";

  const [chart, setChart] = useState("bar");

  var totalCases = [];
  var totalPass = [];
  var totalFail = [];
  var x_label = [];
  const background1 = [];
  
  useEffect(() => {fetchData()}, [])
  const fetchData = () => {
      fetch(URL)
      .then((res) =>res.json())
      .then((response) => {console.log(response);
        setData(response);})
    }

      data.map((item, i) => {
          if(i < 20) {
              totalCases.push(item["Total_Test_Cases"])
              totalPass.push(item["Total_Test_Passed"])
              totalFail.push(item["Total_Test_Failed"])
              x_label.push(item["Tag_Name"])
        }
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        background1.push('rgba('+r+', '+g+', '+b+', 0.8)');
      })

    return <div>
            <button onClick={() => {setChart("bar")}}>Bar Chart</button>
            <button onClick={() => {setChart("line")}}>Line Chart</button>
            <button onClick={() => {setChart("pie")}}>Pie Chart</button>
            {chart === "bar" && <Barchart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {chart === "line" && <Linechart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} /> }
            {chart === "pie" && <Piechart x_label={x_label} totalCases={totalCases} totalPass={totalPass} totalFail={totalFail} background1={background1} /> }
          </div>;
    }
export default TagStat;