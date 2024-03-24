/* eslint-disable no-unused-vars */
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ResetPass() {

    const { id } = useParams();
    const [customer, setCustomer] = useState('');

    const [password,setPassword] = useState('');
    const [cfpass,setCfPass] = useState('');
    const [err,setErr] = useState(false);

    useEffect(() => {
        axios.get(`/api/user/${id}`).then(response => {
            setCustomer(response.data)
            console.log(response.data) 
        })
    }, [id])

    return (
        <>
            <div className="login-container">
                <div className="reset-pass-container">
                    <h2>Reset password</h2>
                    <div>Wellcome {customer.name}</div>
                    <form action="" className="reset-pass-form">
                        <input type="text" placeholder="your new password" value={password} required />
                        <input type="text" placeholder="your new password" value={cfpass} required />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}