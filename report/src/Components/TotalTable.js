import React, { Component } from 'react';

export class TotalTable extends Component {  
    constructor(props) {  
            super(props);
    }
    render() {
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

export default TotalTable;

