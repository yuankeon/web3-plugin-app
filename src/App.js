import './App.css'
import { Route, Routes } from "react-router-dom";
import { Home } from './page/home';
import { Login } from './page/login';

function App() {
  return (
    <>
      <div className="background-radial-gradient"></div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
