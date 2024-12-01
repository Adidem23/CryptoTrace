import "./App.css";
import "./index.css";
import Home from "./Pages/Home/Home";
import { ThemeProvider } from "./components/theme-provider";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dropdown from "./components/CustomComponents/Dropdown/Dropdown";
import DropdownPage from "./Pages/Home/Dashboard";
import DashBoardPage from "./Pages/Home/Dashboard";
function App() {
  const lenis = useLenis(({ scroll }) => {
    // Your Lenis scroll logic can go here
  });

  return (
      <ReactLenis root>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
        </Routes>
      </ThemeProvider>
    </ReactLenis>
  );
}

export default App;