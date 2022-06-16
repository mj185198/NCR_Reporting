import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import TotalStat from "./Pages/TotalStat";
import SuitStat from "./Pages/SuitStat";
import TagStat from "./Pages/TagStat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="totalstat" element={<TotalStat />}/>
        <Route path="suitstat" element={<SuitStat />} />
        <Route path="tagstat" element={<TagStat />} />
      </Routes>
    </BrowserRouter>
  );
}
