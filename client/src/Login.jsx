/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "./userContext";
import axios from "axios";

export default function LoginPage()
{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try{
            const {data}  = await axios.post('/login', {email,password});
            if((data.email)){
              alert('Login successful');
              setRedirect(true);
            }else{
              alert('Login Failed');    
            }
        }catch(e){
            alert('login Failed');
        }
    }

    if (redirect) {
        window.location.href = '/';
      }

    return(
        <div className="login-container">
           <div className="main-form">
                <img src="Images/Logo1.png" alt="" />
                <form className="form-login" onSubmit={handleLoginSubmit}>
                    <h1>Login</h1>
                    <input type="email"  
                           placeholder="your Email@gmail.com"
                           value={email}
                           onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" 
                           placeholder="your Password"
                           value={password}
                           onChange={ev => setPassword(ev.target.value)} />
                    <button>LOGIN</button>
                    <div className="to-register">
                        <h3>If you don't have account ?</h3>
                        <Link to={'/register'}>
                        <div>Register</div>
                        </Link>
                    </div>                   
                </form>
           </div>
        </div>
    )
}