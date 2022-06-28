import React, { Component } from 'react';


export default class CompareTagTable extends Component { 
    constructor(props) {  
            super(props);
    }
    render() {  
        return (  
            <>
             <thead>
                <tr>
                     <th>PI</th>
                     <th>Sprint</th>
                     <th>Tag_Name</th>
                     <th>Total_Test_Cases</th>
                     <th>Total_Test_Passed</th>
                     <th>Total_Test_Failed</th>
                     
                 </tr>
            </thead>
             <tbody>
                 {this.props.compareData.map((item, i) => (
                    <tr key={i} >
                        <td>{item.PI}</td>
                        <td>{item.Sprint}</td>
                        <td>{item.Tag_Name}</td>
                        <td>{item.total}</td>
                        <td>{item.totalPass}</td>
                        <td>{item.totalFail}</td>
                    </tr>
                ))}
            </tbody>
                    
        </>
        )
}  
}  