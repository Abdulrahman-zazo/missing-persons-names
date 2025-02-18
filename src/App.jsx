import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";

import { ConfigProvider } from "antd";

function App() {
  return (
    <div className="w-[90%] m-auto max-[600px]:w-full">
      <ConfigProvider direction="rtl">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </div>
  );
}

export default App;
