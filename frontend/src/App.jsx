import React from "react";
import { Route , Routes , BrowserRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Notes from "./components/Notes";
import PrivateNotes from "./components/PrivateNotes";

const Home = () => "This is Home";

function App(){
  return <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>}></Route>
            <Route path="/Notes" element={<Notes/>}></Route>
            <Route path="/PrivateNotes" element={<PrivateNotes/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  </>
}

export default App