import React, { Component } from 'react';


export default class TagTable extends Component { 
    constructor(props) {  
            super(props);
    }
    render() {  
        return (  
            <>
             <thead>
                <tr>
                     <th>Report_Id</th>
                     <th>Solution</th>
                     <th>Solution_Stack</th>
                     <th>Sprint</th>
                     <th>Tag_Name</th>
                     <th>Total_Test_Cases</th>
                     <th>Total_Test_Passed</th>
                     <th>Total_Test_Failed</th>
                     <th>Date_Time</th>
                 </tr>
            </thead>
             <tbody>
                 {this.props.data.map((item, i) => (
                    <tr key={i} >
                        <td>{item.Report_Id}</td>
                        <td>{item.Solution}</td>
                        <td>{item.Solution_Stack}</td>
                        <td>{item.Sprint}</td>
                        <td>{item.Tag_Name}</td>
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
