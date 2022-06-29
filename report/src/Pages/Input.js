import React,{useState} from "react";
import Form from "../Pages/Form"
import TagForm from "../Pages/TagForm"
import httpClient from "../httpClient";

const Input = () => {

  const [option, setOption] = useState(null);

  const [pi_data, setPIData] = useState([])
  const [org_data, setOrgData] = useState([])
  const [sprint_data, setSprintData] = useState([])
  const [srt_data, setSrtData] = useState([])
  const [sol_data, setSolData] = useState([])
  const [solstack_data, setSolStackData] = useState([])
  const [tag_data, setTagData] = useState([])
  
  
    const fetchData = async() => {

      try {
        const pi_response = await httpClient.get("//localhost:5000/getPI");
        const org_response = await httpClient.get("//localhost:5000/getOrg");
        const sprint_response = await httpClient.get("//localhost:5000/getSprint");
        const srt_response = await httpClient.get("//localhost:5000/getSRT");
        const sol_response = await httpClient.get("//localhost:5000/getSol");
        const solstack_response = await httpClient.get("//localhost:5000/getSolutionStack");
        const tag_response = await httpClient.get("//localhost:5000/getTagName");
        console.log(pi_response.data);
        setPIData(pi_response.data);
        setOrgData(org_response.data);
        setSprintData(sprint_response.data);
        setSrtData(srt_response.data);
        setSolData(sol_response.data);
        setSolStackData(solstack_response.data);
        setTagData(tag_response.data);
      }
      catch(error){
        console.log(error.response);
      }
      setOption("total");
      console.log("pi_data :");
      console.log(pi_data);
    };


    const fetchTagData = async() => {

      try {
        const pi_response = await httpClient.get("//localhost:5000/getPI");
        const org_response = await httpClient.get("//localhost:5000/getOrg");
        const sprint_response = await httpClient.get("//localhost:5000/getSprint");
        const srt_response = await httpClient.get("//localhost:5000/getSRT");
        const sol_response = await httpClient.get("//localhost:5000/getSol");
        const solstack_response = await httpClient.get("//localhost:5000/getSolutionStack");
        const tag_response = await httpClient.get("//localhost:5000/getTagName");
        console.log(pi_response.data);
        setPIData(pi_response.data);
        setOrgData(org_response.data);
        setSprintData(sprint_response.data);
        setSrtData(srt_response.data);
        setSolData(sol_response.data);
        setSolStackData(solstack_response.data);
        setTagData(tag_response.data);
      }
      catch(error){
        console.log(error.response);
      }
      setOption("tag");
      console.log("pi_data :");
      console.log(pi_data);
    };




  return (
    <div>
      <div>
        <button name = "totalButton" onClick={() => {  fetchData(); 
        }}>Test Results</button>
        <button onClick={() => { fetchTagData();
        }}>Tag</button>
        { option === "total" &&  <Form  pidata = {pi_data} orgdata = {org_data} srtdata = {srt_data} soldata = {sol_data} solstackdata = {solstack_data} sprintdata = {sprint_data}/>}
        { option === "tag" &&  <TagForm pidata = {pi_data} orgdata = {org_data} srtdata = {srt_data} soldata = {sol_data} solstackdata = {solstack_data} sprintdata = {sprint_data} tagdata = {tag_data} />}
      </div>
    </div> );
  };


export default Input;

