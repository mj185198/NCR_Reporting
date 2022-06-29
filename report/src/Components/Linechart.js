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
                                marker: {
                                    color: 'rgb(61,176,0)'
                                  }
                                },
                                {
                                mode: "lines+markers",
                                name:'Failed',
                                x:this.props.x_label,
                                y:this.props.totalFail,
                                marker: {
                                color: 'rgb(255,0,0)'
                                    }
                                },
                              
                            ]}
                            layout={{xaxis: {
                                tickmode: "array",
                                tickvals:this.props.x_label,
                                ticktext:this.props.x_label1,
                              },width: 1500, height: 500,}}
                        />
                            
                        </div>  
                )  
        }  
}  
  
export default Linechart;