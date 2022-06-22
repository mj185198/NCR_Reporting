import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';  
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export class Linechart extends Component {  
        constructor(props) {  
                super(props);
        }
        render() {  
                return (  
                        <div> 
                            <Line
                                data={{
                                    labels:this.props.x_label,
                                    datasets:[{
                                    label:'Total Cases',
                                    data:this.props.totalCases,
                                    backgroundColor:'rgba(255, 99, 71,1)',
                                    borderColor:'rgba(255, 165, 0,0.4)'
                                    },
                                    {
                                    label:'Passed',
                                    data:this.props.totalPass,
                                    backgroundColor:'#007d18',
                                    borderColor:'#00ff00'
                                    },
                                    {
                                    label:'Failed',
                                    data:this.props.totalFail,
                                    backgroundColor:'rgba(255, 0, 0,1)',
                                    borderColor:'rgba(255, 0, 0,0.3)'
                                    }]
                                }
                                }
                                >
                            </Line>
                        </div>  
                )  
        }  
}  
  
export default Linechart;