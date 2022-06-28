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
                                text: this.props.totalPass.map(String)
                                },
                                {
                                type: "bar",
                                name:'Failed',
                                x:this.props.x_label,
                                y:this.props.totalFail,
                                text: this.props.totalFail.map(String)
                                },
                              
                            ]}
                            layout={{ barmode: 'stack',width: 1500, height: 500, title: "Graph Example", }}
                        />
                        </div>  
                )  
        }  
}  
  
export default StackedBarchart;