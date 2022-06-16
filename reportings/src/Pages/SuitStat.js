import React,{useState,useEffect} from 'react';

import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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



function SuitStat() {
  const [data,setData]=useState([])
  const URL = 'http://127.0.0.1:5000/suitestat';

  useEffect(() => {fetchData()}, [])
  const fetchData = () => {
    fetch(URL)
    .then((res) =>res.json())
    .then((response) => {console.log(response);
      setData(response);})}
      // return JSON.stringify(data)
      const totalCases = []
      const totalPass = []
      const totalFail = []
      const x_label = []
      data.map((item, i) => {
        if(i < 1000) {
          totalCases.push(item["Total_Test_Cases"])
          totalPass.push(item["Total_Test_Passed"])
          totalFail.push(item["Total_Test_Failed"])
          x_label.push((item["Suite_Name"]))
        }
      })
      const dataset = {
        labels: x_label,
        datasets: [
          {
            label: 'Total Cases',
            data: totalCases,
            backgroundColor: 'rgb(90, 90, 90,0.2)',
            borderColor: 'rgb(90, 90, 90,1)',
            borderWidth: 1
          },
          {
            label: 'Passed',
            data: totalPass,
            backgroundColor: 'rgb(60, 179, 113,0.2)',
            borderColor: 'rgb(60, 179, 113,1)',
            borderWidth: 1
          },{
            label: 'failed',
            data: totalFail,
            backgroundColor: 'rgba(255, 26, 104, 0.2)',
            borderColor:'rgba(255, 26, 104, 1)',
            borderWidth: 1
          }],
      }
      return <Line options={options} data={dataset} />;
    }
export default SuitStat;