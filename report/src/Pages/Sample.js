import React,{useState, useEffect} from 'react'

export const Sample = () => {


  const [pi_data, setPIData] = useState([])
  const PI_URL = "http://127.0.0.1:5000/getPI";

  useEffect(() => {fetchPIData()}, [])
  const fetchPIData = () => {
      fetch(PI_URL)
      .then((res) =>res.json())
      .then((response) => {console.log(response);
        setPIData(response);})
    }
    console.log("PI data : " );
    console.log(pi_data);

  return (
    <div>
      
    </div>
  )
}

export default Sample;
