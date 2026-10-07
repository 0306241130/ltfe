import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Notes from "./pages/Notes";
import PrivateNotes from "./pages/PrivateNotes";
import Settings from "./pages/Setting";
import { ThemeProvider } from "./context/ThemeContext";
const Home = () => "This is Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Settings />}></Route>
              <Route path="/Notes" element={<Notes />}></Route>
              <Route path="/PrivateNotes" element={<PrivateNotes />}></Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
