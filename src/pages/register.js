import { useState,useEffect, useContext } from "react"
import { Navigate, useNavigate ,Outlet} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../context/AuthContext";

  const Register = () => {
    const {RegisterUser} = useContext(AuthContext)
    const [name,setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
   
    const HandleSubmit = async (e) =>{
      e.preventDefault();
     /* if(!name || !email || !password){
        toast.error("Please fill all the fields")
        return false;
      }
      if(password.length < 6){
        toast.error("Password must at least 6 characters")
        return false;
    }*/
      RegisterUser(name , email , password)
     // if(!RegisterUser){
      //  toast.success("Account created Successfully , ow login")
    //  }
    }
    return(
        <>
        <ToastContainer autoClose={2000}/>
        <h2 className="mt-3">Register an Account</h2>
        <form>
  
    <div className="form-group">
      <label htmlFor="exampleInputEmail1" className="form-label mt-4">Username</label>
      <input type="name" className="form-control" id="exampleInputName" 
      aria-describedby="nameHelp" placeholder="Enter Username"
      onChange={(e) =>setName(e.target.value)} value={name}/>
    </div>
    <div className="form-group">
      <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" 
      aria-describedby="emailHelp" placeholder="example@gmail.com"
      onChange={(e) => setEmail(e.target.value)} value={email}/>
    </div>
    <div>
      <label htmlFor="exampleInputPassword1" className="form-label mt-4">Create Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" 
      placeholder="Enter Password" autoComplete="off"
      onChange={(e) => setPassword(e.target.value)} value={password}/>
    </div>
    
    <button type="submit" className="btn btn-primary mt-5" onClick={HandleSubmit}>Submit</button><br/><br/>
    <p>Already have an account . <a href="/login">Login</a></p>
</form>
        </>
    )
}
export default Register