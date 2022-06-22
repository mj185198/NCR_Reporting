import { BrowserRouter , Routes,Route} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import React from 'react';
import './App.css';
import Input from "./Pages/Input";
import Form from "./Pages/Form";
import TagForm from "./Pages/TagForm";
// import SuiteForm from "./Pages/SuiteForm";
// import TagStat from "./Pages/TagStat";
// import TotalStat from "./Pages/TotalStat";
// import TotalStat from "./Pages/TotalStat";
// import SuiteStat from "./Pages/SuiteStat";
// import TagStat from "./Pages/TagStat";





 const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Input/>}/>
        <Route path="/form" element={<Form/>}/>
        <Route path="/tagform" element={<TagForm/>}/> 
        {/* <Route path="/suiteform" element = {<SuiteForm/>} /> */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

