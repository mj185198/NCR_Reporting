
import React,{useState,useEffect} from 'react';
import Select from 'react-select';
import Axios from 'axios';
import TotalTable from './TotalTable';
import { BrowserRouter , Routes,Route} from "react-router-dom";


function Form(){
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
    return(
    <>
    <form action = "http://127.0.0.1:5000/release" method = 'POST'>
        <Select name="Organization"  options={Organization} />
        <Select name="SRT" options={SRT}/>
        <Select name="PI" options={PI}/>
        <Select name="Sprint" options={Sprint}/>
        <Select name="Solution" options={Solution}/>
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

function TagForm(){


    return (
        <form action="http://localhost:5000/tag" method='post'>
        <label>
        Report_Id
        <input type="number"  min={1} max={50000} />
        </label>
        <input type = "submit" value = "submit"/>
        </form>
    );

}

function Input(){
    const options = [
        {label:"Select_Filter",value:"Select_Filter"},
        { label: "Release_Stat", value: "Release_Stat" },
        { label: "Tag_Stat", value: "Tag_Stat" },
        { label: "Suite_Stat", value: "Suite_Stat" },
      ];
    const [filter, setFilter] = useState("");
    console.log(filter)

    function handleChange(e){
        console.log("Filter Selected!");
        setFilter(e.target.value);
    }

    if(filter === "Release_Stat"){
        return(<div>
             <Form />
             </div>
        );
     };
     if(filter === "Tag_Stat"){
        return(
            <div>
             <TagForm />
            </div>
        );
    }
    return(
        <>
        <form>
        <select value="Select_Filter" onChange={handleChange}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </form>
        </>
    );
}





export default Input;













// function onSubmitForm() {

    //     window.location = "localhost:8080/test/index.php?Title=" +

    //       document.querySelector('title').textContent;

    //   }
    // const url ="http://127.0.0.1:5000/release"
    // const [data,setData] = useState({
    //     Organization: "",
    //     SRT: "",
    //     PI: "",
    //     Sprint: "",
    //     Solution: ""
    // })
    // function handle(e){
    //     const newdata = {...data}
    //     newdata[e.target.id] = e.target.value
    //     setData(newdata)
    //     console.log(newdata)
    // }

    // function login(e){
    //     e.preventDefault();
    //     Axios.post(url, {
    //             Organization: data.Organization,
    //             SRT: data.SRT,
    //             PI: data.PI,
    //             Sprint: data.Sprint,
    //             Solution: data.Solution
    //         })
    //         .then((res) => {
    //             console.log(res.data);
    //         });
    // }