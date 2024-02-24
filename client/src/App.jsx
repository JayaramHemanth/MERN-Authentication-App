import Login from './components/Login';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Createuser from './components/Createuser'
import Update from './components/Update'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/createuser' element={<Createuser/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/signup' element={<Register />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
