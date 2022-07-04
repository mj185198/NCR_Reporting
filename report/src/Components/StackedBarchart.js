import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export class StackedBarchart extends Component {  
        constructor(props) {  
                super(props);
        }
        render() {  
                return (  
                        <div> 
                        <Plot
                            data={[
                              {
                                type: "bar",
                                name:'Passed',
                                x:this.props.x_label,
                                y:this.props.totalPass,
                                text: this.props.totalPass.map(String),
                                textangle: 0,
                                textfont: {
                                    family:"Arial Black"
                                  },
                                marker: {
                                    color: 'rgb(61,176,0)'
                                  }
                                },
                                {
                                type: "bar",
                                name:'Failed',
                                x:this.props.x_label,
                                y:this.props.totalFail,
                                text: this.props.totalFail.map(String),
                                textangle: 0,
                                textfont: {
                                    family:"Arial Black",
                                  },
                                marker: {
                                color: 'rgb(255,0,0)'
                                    }
                                },
                              
                            ]}
                            layout={{ barmode: 'stack',xaxis: {
                                tickmode: "auto",
                                tickvals:this.props.x_label,
                                ticktext:this.props.x_label1,
                              },
                              yaxis:{
                                ticksuffix : "%",
                              }
                              ,width: 1500, height: 500,}}
                        />
                        </div>  
                )  
        }  
}  
  
export default StackedBarchart;