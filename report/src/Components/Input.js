
import React,{useState,useEffect} from 'react';
import Select from 'react-select';
// import eel from 'eel';
import Axios from 'axios';
import Form from './Form'
import TotalTable from './TotalTable';
import { BrowserRouter , Routes,Route} from "react-router-dom";




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
