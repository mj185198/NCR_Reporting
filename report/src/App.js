import { BrowserRouter, Routes, Route } from "react-router-dom";
import React,{useState,useEffect} from 'react';
import './App.css';
import TotalTable from "./Components/TotalTable";
import TagTable from "./Components/TagTable";
import SuiteTable from "./Components/SuiteTable";
import TotalGraph from "./Components/TotalGraph";
import SuiteGraph from "./Components/SuiteGraph";
import TagGraph from "./Components/TagGraph";



export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="totaltable" element={<TotalTable />}/>
        <Route path="suitetable" element={<SuiteTable />} />
        <Route path="tagtable" element={<TagTable />}/>
        <Route path="totalgraph" element={<TotalGraph />}/>
        <Route path="suitegraph" element={<SuiteGraph />} />
        <Route path="taggraph" element={<TagGraph />} />
      </Routes>
    </BrowserRouter>
  );
}

