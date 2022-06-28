import React, { Component } from 'react';
import Plot from 'react-plotly.js';


export class Linechart extends Component {  
        constructor(props) {  
                super(props);
        }
        render() {  
                return (  
                        <div> 
                        <Plot
                            data={[
                              {
                                mode: "lines+markers",
                                name:'Total Cases',
                                x:this.props.x_label,
                                y:this.props.totalCases,
                                // text: this.props.totalCases.map(String)
                              }, 
                              {
                                mode: "lines+markers",
                                name:'Passed',
                                x:this.props.x_label,
                                y:this.props.totalPass,
                                // text: this.props.totalPass.map(String)
                                },
                                {
                                mode: "lines+markers",
                                name:'Failed',
                                x:this.props.x_label,
                                y:this.props.totalFail,
                                // text: this.props.totalFail.map(String)
                                },
                              
                            ]}
                            layout={{width: 1500, height: 500, title: "Graph Example", }}
                        />
                            
                        </div>  
                )  
        }  
}  
  
export default Linechart;