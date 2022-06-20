import { BrowserRouter , Routes,Route} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import React from 'react';
import './App.css';
import Input from "./Pages/Input";
import Form from "./Pages/Form";
import TagStat from "./Pages/TagStat";
import TotalStats from "./Pages/TotalStats";
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
//        <Route path="/totalstat" element={<TotalStats/>}/>
        <Route path="/tagstat" element = {<TagStat/>} />
        {/* <Route path="tagstat" element={<TagStat/>}/>  */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

