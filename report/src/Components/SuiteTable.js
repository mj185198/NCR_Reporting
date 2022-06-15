import React,{useState,useEffect} from 'react';


function SuiteTable() {
    const [data2,suiteData]=useState([]);
    const URL2 = 'http://127.0.0.1:5000/suitestat';

    useEffect(() => {
      fetchsuiteData();
    }, [])

    const fetchsuiteData = () => {
      fetch(URL2)
        .then((res) =>
          res.json())

        .then((response) => {
          console.log(response);
          suiteData(response);
        })
    }

    return (
        <>
            <h1>Suite Results Table</h1>
              <thead>
                  <tr>
                      <th>Suite_Name</th>
                      <th>Total_Test_Cases</th>
                      <th>Total_Test_Passed</th>
                      <th>Total_Test_Failed</th>
                      <th>Date_Time</th>
                  </tr>
              </thead>
              <tbody>
                  {data2.map((item, i) => (
                      <tr key={i}>
                          <td>{item.Suite_Name}</td>
                          <td>{item.Total_Test_Cases}</td>
                          <td>{item.Total_Test_Passed}</td>
                          <td>{item.Total_Test_Failed}</td>
                          <td>{item.Time_Stamp}</td>
                      </tr>
                  ))}
              </tbody>
      </>
    );
  }

  export default SuiteTable;