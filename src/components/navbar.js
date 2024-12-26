import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext";
import { ToastContainer } from "react-toastify";

//import { Link } from "react-router-dom";
const Navbar = () =>{
  const navigate = useNavigate();
  const {user , setUser} = useContext(AuthContext);
 // const {token , setToken} = useContext(AuthContext);
    return (
      <div> 
  <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">CONTACT MANAGEMENT SYSTEM</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav ms-auto">
        { 
        user ? <>
        <li className="nav-item">
          <a className="nav-link" href="###">My Contacts</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="###">Add Contacts</a>
          </li>
        <li className="nav-item"  onClick={() =>{
            setUser(null);
            localStorage.clear();
            navigate("/login");
          }}>
          <button className="btn" href=""> Logout</button>
        </li></> 
          :
        <> <li className="nav-item">
          <a className="nav-link" href="/login">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/register">Register</a>
        </li></>
       
        }
       
       
       
        </ul>
    </div>
  </div>
</nav>
</div>
    )
}
export default Navbar;