
import React,{useState,useEffect, Component} from 'react';

import Select from 'react-select';

function Form() {
    
    const Organization = [{label: "Banking Core", value: "Banking Core"}]
    const SRT = [{label: "EAB", value: "EAB"},
                 {label: "ICE", value: "ICE"}
                ]
    const PI = [
        { label: "21.1", value: 21.1 },
        { label: "21.2", value: 21.2 },
        { label: "21.3", value: 21.3 },
        { label: "21.4", value: 21.4 },
        { label: "22.1", value: 22.1 },
        { label: "22.2", value: 22.2 },
      ];
    const Sprint = [
        { label: "S1", value: "S1" },
        { label: "S2", value: "S2" },
        { label: "S3", value: "S3" },
        { label: "S4", value: "S4" },
        { label: "S5", value: "S5" },
        { label: "S6", value: "S6" },
      ];
      const Solution = [
        { label: "AE_CxM", value: "AE_CxM" },
        { label: "ESS_AE_CxTH_ISO", value: "ESS_AE_CxTH_ISO" },
        { label: "AE_IB", value: "AE_IB" },
        { label: "AE_CxTH-NDC", value: "AE_CxTH-NDC" },
        { label: "AE_NDCHOST", value: "AE_NDCHOST" },
        { label: "AE_CxTH-ISO", value: "AE_CxTH-ISO" },
      ];
      const [data, setData] = useState({
        org : "",
        srt : "",
        pi : "",
        sprint : "",
        solution : ""
      })
      // function handle(e){
      //   const newData = {...data};
      //   newData[e.target.id] = e.target.values;
      //   setData(newData);
      //   console.log(newData);
      // }
    return(
    <>
    <form action='http://127.0.0.1:5000/release' method='POST'>
        <Select name="Organization" id = 'org' options={Organization} />
        <Select name="SRT" id='srt' options={SRT}/>
        <Select name="PI" id='pi' options={PI}/>
        <Select name="Sprint" id='sprint' options={Sprint}/>
        <Select name="Solution" id='solution' options={Solution}/>
      <button>Submit</button>
    </form>
    {/* <form onSubmit={handle}>
        <select id="Organization" onChange={(e)=>setOrg(e.target.value)}>
            {Organization.map((Organization) => (
              <option value={Organization.value}>{Organization.label}</option>
            ))}
          </select>
        <select id="SRT" onChange={(e)=>setSRT(e.target.value)}>
            {SRT.map((SRT) => (
              <option value={SRT.value}>{SRT.label}</option>
            ))}
        </select>
        <select id="PI" onChange={(e)=>setPI(e.target.value)}>
            {PI.map((PI) => (
              <option value={PI.value}>{PI.label}</option>
            ))}
        </select>
        <select id="Sprint" onChange={(e)=>setSprint(e.target.value)}>
            {Sprint.map((Sprint) => (
              <option value={Sprint.value}>{Sprint.label}</option>
            ))}
        </select>
        <select id="Solution" onChange={(e)=>setSol(e.target.value)}>
            {Solution.map((Solution) => (
              <option value={Solution.value}>{Solution.label}</option>
            ))}
        </select>
      <button>Submit</button>
    </form> */}
    </>
    );
}


export default Form;

/* onSubmit={() => 
        
        // use python function directly here
        {

          // var data = eel.filterData();
          // console.log(data);

          fetch( "http://127.0.0.1:5000/release",{
          method: "POST",
          // make sure to serialize your JSON body
          body: JSON.stringify({
            Organization : Organization,
            SRT : SRT,
            PI : PI,
            Sprint : Sprint,
            Solution : Solution
          })
        }
        )
        .then( (response) => { 
          //do something awesome that makes the world a better place
          console.log(response);
        });

        }} */
        // const history = useHistory();

    // const routeChange = () =>{
    // let path = `newPath`;
    // history.push(path);
    // }
    // const [org,setOrg]=useState('');
    // const [srt,setSRT]=useState('');
    // const [pi,setPI]=useState(0);
    // const [sprint,setSprint]=useState('');
    // const [sol,setSol]=useState('');
    // const handle = (e)=>{
    //     e.preventDefault();
    //     const val = {org,srt,pi,sprint,sol};
    //     fetch('http://localhost:5000/release',{
    //         method: 'POST',
    //         headers: {"Content-Type":"application/json"},
    //         body: JSON.stringify(val)
    //         }).then(()=>{
    //         console.log('data sent');
    //     })
    // }
