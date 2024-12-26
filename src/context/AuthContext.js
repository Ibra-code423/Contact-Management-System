import { children, createContext, useState ,useEffect} from "react";
import { replace, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer , toast } from "react-toastify";
const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const[user , setUser] = useState();
   // const[token, setToken] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        isUserloggedIn()
    }, [])
   //check if user is logged in
   const isUserloggedIn = async  () =>{
    try {
        const res = await fetch("http://localhost:4600/api/me" , {
            method : "GET",
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`,
            }
        })
        const result = await res.json();
        if(!result.error){
            console.log(result)
        }else{
            console.log(result)
        }
    } catch (error) {
        console.log(error)
    }
   }
    //login request
    const loginUser = async (email , password) =>{
        
        try {
            let LoginRes = await fetch("http://localhost:4600/api/login" , {
                method : "POST",
                body: JSON.stringify({email , password}),
                headers : {
                    "Content-Type" : "application/json",
                }
            })
             const result = await LoginRes.json();
             if(!result.error){
                localStorage.setItem("token" , result.token);
                setUser(result.user)
                toast.success ("You have successfully logged In")
              navigate("/", {replace : true})
               //setUser(result.user)
             }else{
                console.log(result.error)
                toast.error("Invalid Login Please Try again ")
                return false;
             } 
        } catch (error) {
            console.log(error)
        }
    };
    //register request
   const RegisterUser = async (name , email , password) =>{
        try {
            let RegRes = await fetch("http://localhost:4600/api/register" , {
                method : "Post",
                body : JSON.stringify({name , email , password}),
                headers : {
                    "Content-Type" : "application/json",
                }
            })
            const Rresult = await RegRes.json()
            if(!Rresult.error){
                console.log(Rresult)
                localStorage.setItem("User", JSON.stringify(Rresult))
                alert("Account created successfully.Please login into your account");
                navigate("/login")
            }else{
                console.log(Rresult.error)
                toast.error("Registration Failed Please try again"  )
                return false;
            };
            
        } catch (error) {
            console.log(error)
        }
    }


    return <AuthContext.Provider value ={{loginUser , RegisterUser, user , setUser }} >
        <ToastContainer autoClose={2000}/>
        {children}</AuthContext.Provider>
}
export default AuthContext


/*
 useEffect(() => {
        const auth = localStorage.getItem('token')
        if (auth){
            navigate('/')
        }
    }, [])
    */