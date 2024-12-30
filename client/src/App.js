import { Container } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signin from "./pages/Signin";

import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";

function App() {

  const user=JSON.parse(localStorage.getItem('profile'))

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={"/posts"}/>} />
          <Route path="/posts" element={<Home/>} />
          <Route path="/posts/search" element={<Home/>} />
          <Route path="/signin" element={!user ? <Signin/> : <Navigate to={"/posts"}/> }/>
          <Route path="/signup" element={!user ? <SignUp/> : <Navigate to={"/posts"}/> }/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
