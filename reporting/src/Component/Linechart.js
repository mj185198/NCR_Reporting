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
                                    data:this.props.totalCases,
                                    backgroundColor:'orange',
                                    },
                                    {
                                    data:this.props.totalPass,
                                    backgroundColor:'green',
                                    },
                                    {
                                    data:this.props.totalFail,
                                    backgroundColor:'red',
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