import "./App.css";
import { Login, Register, Dashboard, Navbar, Links, Analytics, Settings } from "./pages/index.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/links" element={<Links />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
