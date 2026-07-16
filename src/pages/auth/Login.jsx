import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await login({
                email,
                password
            });

            // Login failed
            if (response.data.message !== "Login Successful") {

                alert(response.data.message);

                return;

            }

            // Save logged-in user details
            localStorage.setItem("userId", response.data.id);
            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("userRole", response.data.role);

            alert(response.data.message);

            // Navigate based on role
            if (response.data.role === "ADMIN") {

                navigate("/admin");

            } else if (response.data.role === "STUDENT") {

                navigate("/student");

            }

        } catch (error) {

            console.error(error);

            if (error.response) {

                alert(error.response.data.message || "Login Failed");

            } else {

                alert("Server Error");

            }

        }

    };

    return (

        <div
            style={{
                width: "400px",
                margin: "80px auto",
                padding: "30px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}
        >

            <h2 style={{ textAlign: "center" }}>
                Placement Coordination System
            </h2>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px"
                    }}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px"
                    }}
                    required
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px"
                    }}
                >
                    Login
                </button>

            </form>

            <hr style={{ margin: "25px 0" }} />

            <div style={{ textAlign: "center" }}>

                <p>New Student?</p>

                <button
                    onClick={() => navigate("/register")}
                    style={{
                        background: "green",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        cursor: "pointer",
                        borderRadius: "5px"
                    }}
                >
                    Register Here
                </button>

            </div>

        </div>

    );

}

export default Login;