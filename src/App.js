
import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Navbar from './components/navbar';
//import Layout from './components/layout'
import Home from './pages/home'
import Login from './pages/login';
import Register from './pages/register';
import About from './pages/about';
import { AuthContextProvider } from './context/AuthContext';
import { PrivateComponents } from './pages/register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthContextProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<><h3 className="mt-5">Hello , Welcome</h3><Home/></> }/>
        <Route path='/about' element={<About/>}/>
        <Route path='/logout' element={<h3>Logout</h3>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
