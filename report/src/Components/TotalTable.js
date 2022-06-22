import React, { Component } from 'react';



export class TotalTable extends Component {  
    constructor(props) {  
            super(props);
    }

    
    render() { 
        // let newdata = {
        //     Id : "Id",
        //     Solution_Stack : "Solution",
        //     Total_Test_Cases : "Total_Test_Cases",
        //     Total_Test_Passed : "Total_Test_Passed",
        //     Total_Test_Failed : "Total_Test_Failed",
        //     Date_Time : "Date_Time"    ,
        
        // }
        // console.log("type of data :"+typeof(this.props.data));
    
        // var newData = Object.assign({},newdata,this.props.data)
        return (
            <>
            
                
                
             <tbody>
                <tr>
                <th>Id</th>
                <th>Solution</th>
                <th>Total_Test_Cases</th>
                <th>Total_Test_Passed</th>
                <th>Total_Test_Failed</th>
                <th>Date_Time</th>
                </tr>
                {/* {newData.data.map((item,i)=>(
                  <tr key={i} >
                  <td>{item.Id}</td>
                  <td>{item.Solution_Stack}</td>
                  <td>{item.Total_Test_Cases}</td>
                  <td>{item.Total_Test_Passed}</td>
                  <td>{item.Total_Test_Failed}</td>
                  <td>{item.Time_Stamp}</td>
              </tr>  
                ))} */}
                 {this.props.data.map((item, i) => (
                    <tr key={i} >
                        <td>{item.Id}</td>
                        <td>{item.Solution_Stack}</td>
                        <td>{item.Total_Test_Cases}</td>
                        <td>{item.Total_Test_Passed}</td>
                        <td>{item.Total_Test_Failed}</td>
                        <td>{item.Time_Stamp}</td>
                    </tr>
                ))}
            </tbody>
                    
        </>
        )  
}  
}  































// function TotalTable() {

//     // data = TotalTable({{data|tojson}});

//     const [data,setData]=useState([]);
//     const URL = 'http://127.0.0.1:5000/getrelease';
//     useEffect(() => {
//         fetchtotalData();
//     }, [])

//     const fetchtotalData = () => {
//         fetch(URL)
//             // .then((res) =>
//             //   res.json)
    
//             .then((response) => {
//               console.log(response);
//               setData(response);
//             })
//       }
//     return (
//         <>
//             <h1>Total Results Table</h1>
//             <thead>
//                 <tr>
//                     <th>Id</th>
//                     <th>Solution</th>
//                     {/* <th>Sprint</th> */}
//                     <th>Total_Test_Cases</th>
//                     <th>Total_Test_Passed</th>
//                     <th>Total_Test_Failed</th>
//                     <th>Date_Time</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {data.map((item, i) => (
//                     <tr key={i}>
//                         <td>{item.Id}</td>
//                         <td>{item.Solution_Stack}</td>
//                         {/* <td>{item.Sprint}</td> */}
//                         <td>{item.Total_Test_Cases}</td>
//                         <td>{item.Total_Test_Passed}</td>
//                         <td>{item.Total_Test_Failed}</td>
//                         <td>{item.Time_Stamp}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </>
//     );
// }

export default TotalTable;

