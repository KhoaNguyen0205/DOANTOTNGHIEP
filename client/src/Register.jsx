/* eslint-disable no-unused-vars */
import {Link} from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

export default function RegisterPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cfpass,setCfPass] = useState('');
    const [dob,setDob] = useState('');
    const [sex, setSex] = useState('');

    async function registerUser(ev) {
        ev.preventDefault();
        if (password !== cfpass) {
            alert('Password and Confirm Password do not match');
            return; 
        }
        try {
            await axios.post('/register', {
                name,
                email,
                password,
                cfpass,
                dob,
                sex,
            });
            alert('Sign Up Success. You can now log in');
            window.location.reload();
        }catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Email is already in use. Please use a different email.');
            } else {
                alert('Something went wrong. Please try again.');
            }
        }
    }


    return(
        <div className="login-container">
           <div className="main-form">
                <img src="Images/Logo1.png" alt="" />
                <form className="form-login" onSubmit={registerUser} >          
                    <h1>Register</h1>
                    <input type="text" 
                           placeholder="your Name"
                           required
                           value={name}
                           onChange={ev => setName(ev.target.value)} />
                    <input type="email"
                           placeholder="your Email@gmail.com" 
                           required
                           value={email}
                           onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" 
                           placeholder="your Password" 
                           required
                           value={password}
                           onChange={ev => setPassword(ev.target.value)}/>
                    <input type="password" 
                           placeholder="confirm Password"
                           value={cfpass}
                           required
                           onChange={ev=>setCfPass(ev.target.value)} 
                           />
                    <div className="dob-sex" required>
                            <input type="date" 
                                   value={dob} 
                                   onChange={ev => setDob(ev.target.value)} />
                            <select required
                                    value={sex}
                                    onChange={ev => setSex(ev.target.value)}
                            >
                                    <option value="">Your Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                            </select>
                    </div>
                    <button>REGISTER</button>
                    <div className="to-register">
                        <h3>If you have account ?</h3>
                        <Link to={'/login'}>
                        <div>Login</div>
                        </Link>
                    </div>   
                </form>
           </div>
        </div>
    )
}