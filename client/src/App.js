import { Container } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<Signin/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
