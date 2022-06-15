import React,{useState,useEffect} from 'react';



function TagTable() {
    const [data1,tagData]=useState([]);
    const URL1 = 'http://127.0.0.1:5000/tagstat';

    useEffect(() => {
        fetchtagData();
    }, [])

    const fetchtagData = () => {
        fetch(URL1)
            .then((res) =>
                res.json())

            .then((response) => {
                console.log(response);
                tagData(response);
            })
          }
    return (
        <>
        <h1>Tag Results Table</h1>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Report_Id</th>
                    <th>Tag_Name</th>
                    <th>Total_Test_Cases</th>
                    <th>Total_Test_Passed</th>
                    <th>Total_Test_Failed</th>
                    <th>Date_Time</th>
                </tr>
            </thead>
            <tbody>
                {data1.map((item, i) => (
                    <tr key={i}>
                        <td>{item.Id}</td>
                        <td>{item.Report_Id}</td>
                        <td>{item.Tag_Name}</td>
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

export default TagTable;

