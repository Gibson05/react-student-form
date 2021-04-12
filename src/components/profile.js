import "./profile.css";
import { useSelector } from 'react-redux';
import { selectUserName } from '../app/userSlice';
import { useHistory } from "react-router-dom"
// import { useState } from "react"

export default function Profile() {
    const userName = useSelector(selectUserName)
    const history = useHistory()

    function logout() {
        history.push("/login")
        localStorage.setItem("token", "")
    }

    function dashboard() {
        history.push("/")
    }

    return (
        <div className="profile-container">
            <div className="btn-group">
                <button className="logout-btn" onClick={dashboard}>Dashboard</button>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
            <div className="avatar">
                <img src={userName.avatar} alt="avatar"></img>
            </div>
            <div className="information">
                <div><b>Name:</b> {userName.name}</div>
                <div><b>Email:</b> {userName.email}</div>
                <div><b>Birthday:</b> {userName.birthday}</div>
                <div><b>Gender:</b> {userName.gender}</div>
                <div><b>Phone Number:</b> {userName.phone}</div>
            </div>
        </div>
    )
}