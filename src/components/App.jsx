import "../index.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import FinderPage from "./FinderPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/finder" element={<FinderPage />} />
    </Routes>
  );
}

export default App;
