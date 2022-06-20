import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';  
export class Barchart extends Component {  
        constructor(props) {  
                super(props);
        }
        render() {  
                return (  
                        <div>  
                           <Pie
                                data={{
                                    labels:this.props.x_label,
                                    datasets:[{
                                    data:this.props.totalCases,
                                    backgroundColor:this.props.background1,
                                    },
                                    {
                                    data:this.props.totalPass,
                                    backgroundColor:this.props.background1,
                                    },
                                    {
                                    data:this.props.totalFail,
                                    backgroundColor:this.props.background1,
                                    }]
                                }
                                }
                                >
                            </Pie>
                        </div>  
                )  
        }  
}  
  
export default Barchart;