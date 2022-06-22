import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';  
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export class Barchart extends Component {  
        constructor(props) {  
                super(props);
        }
        render() {  
                return (  
                        <div> 
                            <Bar
                                data={{
                                    labels:this.props.x_label,
                                    datasets:[{
                                    label:'Total Cases',
                                    data:this.props.totalCases,
                                    backgroundColor:'orange',
                                    barThickness:12
                                    },
                                    {
                                    label:'Passed',
                                    data:this.props.totalPass,
                                    backgroundColor:'green',
                                    barThickness:12
                                    },
                                    {
                                    label:'Failed',
                                    data:this.props.totalFail,
                                    backgroundColor:'red',
                                    barThickness:12
                                    },
                                    ]
                                }}
                                options={{
                                    tooltips:{
                                    mode:'index',
                                    callbacks:{
                                        label:function(toolTipItem){
                                        return ("Revenue: $"+toolTipItem.value)
                                        }
                                    }

                                    },
                                }}
                                >

                                </Bar>
                        </div>  
                )  
        }  
}  
  
export default Barchart;