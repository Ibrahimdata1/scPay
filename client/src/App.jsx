import { BrowserRouter, Routes, Route } from "react-router-dom";
import WalletConnect from "./pages/WalletConnect";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WalletConnect />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
