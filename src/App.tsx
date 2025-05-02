import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import About from "./pages/About";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />

      <Route element={<AuthLayout />}>
        <Route path="signup" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
