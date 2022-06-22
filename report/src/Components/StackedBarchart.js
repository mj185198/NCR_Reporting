import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
export const options = {
plugins: {
title: {
display: true,
text: 'Chart.js Bar Chart - Stacked',
},
},
responsive: true,
scales: {
x: {
stacked: true,
},
y: {
stacked: true,
},
},
};
export class StackedBar extends Component {
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
label:'Total Pass Cases',
data:this.props.totalPass,
backgroundColor:'green',
barThickness:12
},
{
label:'Total Fail Cases',
data:this.props.totalFail,
backgroundColor:'red',
barThickness:12
},
]
}}
options={{
tooltips:{
mode:'index',
// callbacks:{
// label:function(toolTipItem){
// return ("Revenue: $"+toolTipItem.value)
// }
// }



},
scales: {
x: {
stacked: true,
},
y: {
stacked: true,
},
},
}}
>



</Bar>
</div>
)
}
}

export default StackedBar;