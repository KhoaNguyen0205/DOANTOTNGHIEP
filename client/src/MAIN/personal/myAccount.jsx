/* eslint-disable no-unused-vars */
import { useContext } from "react"
import { UserContext } from "../../userContext"
import PersonalPage from "./Personal"
import Navbar from "../../navbar"

export default function MyAccount() {


    const { user } = useContext(UserContext)

    return (
        <>
            <PersonalPage />
            <div className="myacc-container">
                <div className="mc-top">
                    <b style={{fontSize:'25px'}}>My Profile</b>
                    <b>Manage account information</b>
                </div>
                <div className="mc-bot">
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                    <div></div>
                </div>
            </div>
        </>
    )
}