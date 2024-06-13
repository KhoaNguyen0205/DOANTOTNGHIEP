import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ResetPass() {
    const { id } = useParams();
    const [customer, setCustomer] = useState('');
    const [password, setPassword] = useState('');
    const [cfpass, setCfPass] = useState('');
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        axios.get(`/api/user/${id}`).then(response => {
            setCustomer(response.data)
            console.log(response.data);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== cfpass) {
            setErr(true);
            return;
        }

        try {
            const response = await axios.put(`/api/user/${id}`, { password });
            console.log(response.data);
            setSuccess(true);
            window.location.reload()
        } catch (error) {
            console.error(error);
            // Xử lý lỗi nếu cần
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="reset-pass-container">
                    <h2>Reset password</h2>
                    <b>Welcome {customer.email}</b>
                    <form className="reset-pass-form" onSubmit={handleSubmit}>
                        <input type="password" placeholder="Your new password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <input type="password" placeholder="Confirm new password" value={cfpass} onChange={(e) => setCfPass(e.target.value)} required />
                        {err && <p>Passwords do not match</p>}
                        {success && <p>Password updated successfully</p>}
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
