import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUserShield,
    FaEnvelope,
    FaLock,
    FaKey,
    FaSignOutAlt
} from "react-icons/fa";

import "./Settings.css";

function Settings() {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const changePassword = () => {

        if (password === "") {

            alert("Enter New Password");

            return;

        }

        // Backend API can be added later

        alert("Password Changed Successfully");

        setPassword("");

    };

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <div className="settings-container">

            <div className="settings-header">

                <div>

                    <h1>Settings</h1>

                    <p>
                        Manage your account settings and security.
                    </p>

                </div>

            </div>

            <div className="settings-grid">

                <div className="profile-card">

                    <div className="profile-title">

                        <FaUserShield />

                        <h2>Admin Profile</h2>

                    </div>

                    <p>

                        <FaUserShield />

                        <strong>Name :</strong>

                        Placement Coordinator

                    </p>

                    <p>

                        <FaEnvelope />

                        <strong>Email :</strong>

                        admin@gmail.com

                    </p>

                </div>

                <div className="password-card">

                    <div className="profile-title">

                        <FaLock />

                        <h2>Change Password</h2>

                    </div>

                    <input
                        type="password"
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="change-btn"
                        onClick={changePassword}
                    >

                        <FaKey />

                        Change Password

                    </button>

                </div>

            </div>

            <div className="logout-section">

                <button
                    className="logout-btn"
                    onClick={logout}
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Settings;