import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Articles } from "./components/Articles/Articles";
import { Login } from "./components/Login/Login";
import { Screen404 } from "./components/Screen404/Screen404";

const App = (): ReactElement => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/recent-articles" element={<Articles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Screen404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
