import { BrowserRouter , Routes,Route} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import React from 'react';
import './App.css';
import Input from "./Pages/Input";
import Form from "./Pages/Form";
import TagForm from "./Pages/TagForm";


 const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Input/>}/>
        <Route path="/form" element={<Form/>}/>
        <Route path="/tagform" element={<TagForm/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

