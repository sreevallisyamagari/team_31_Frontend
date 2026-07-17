import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

        <div>

            <h2>Settings</h2>

            <hr />

            <h3>Admin Profile</h3>

            <p><b>Name :</b> Placement Coordinator</p>

            <p><b>Email :</b> admin@gmail.com</p>

            <br />

            <h3>Change Password</h3>

            <input
                type="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={changePassword}>

                Change Password

            </button>

            <br /><br />

            <button
                onClick={logout}
                style={{
                    background: "red",
                    color: "white",
                    padding: "10px",
                    border: "none",
                    cursor: "pointer"
                }}
            >

                Logout

            </button>

        </div>

    );

}

export default Settings;