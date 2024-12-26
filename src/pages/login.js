import {useContext, useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const {loginUser} = useContext(AuthContext);
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
 // const [error , setError] = useState(false);
const HandleSubmit = async (e) =>{
  e.preventDefault();
  loginUser(email , password);
}
    return(
        <>
        <ToastContainer autoClose={3000}/>
            <h2 className="mt-3">Account Login</h2>
        <form>
  
    <div className="form-group">
      <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
       placeholder="example@gmail.com" 
       onChange={(e) => setEmail(e.target.value)} value={email}/>
    </div>
    <div>
      <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" 
      placeholder="Enter Password" autoComplete="off" 
      onChange={(e) => setPassword(e.target.value)} value={password}/>
    </div>
    <button type="submit" className="btn btn-primary mt-5" onClick={HandleSubmit} >Submit</button><br/><br/>
    <p>Don't have an account . <a href="/register">Create One</a></p>
</form>
</>
    )
}
export default Login