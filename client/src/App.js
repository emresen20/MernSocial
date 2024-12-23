import { Container } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
