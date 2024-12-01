import "./App.css";
import "./index.css";
import Home from "./Pages/Home/Home";
import { ThemeProvider } from "./components/theme-provider";
import { ReactLenis } from "lenis/react";
import { Routes, Route } from "react-router-dom";
import DashBoardPage from "./Pages/Home/Dashboard";
import { OktoProvider, BuildType } from 'okto-sdk-react';

function App() {
  return (
    <ReactLenis root>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <OktoProvider apiKey={"8abd0bbb-2cc7-4f97-8649-1d0b3ad31c3f"} buildType={BuildType.SANDBOX}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashBoardPage />} />
          </Routes>
        </OktoProvider>
      </ThemeProvider>
    </ReactLenis>
  );
}

export default App;