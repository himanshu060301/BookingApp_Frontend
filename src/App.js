import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
