import toast from "react-hot-toast";
import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";


import loginImage from "../../assets/images/login.png";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await login({
                email,
                password
            });

            if(response.data.message !== "Login Successful") {

                toast.error(response.data.message);

                return;

            }

            localStorage.setItem("userId", response.data.id);
            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("userRole", response.data.role);

            toast.success(response.data.message);

            if (response.data.role === "ADMIN") {

                navigate("/admin");

            } else if (response.data.role === "STUDENT") {

                navigate("/student");

            }

        } catch (error) {

            console.error(error);

            if (error.response) {

                toast.error(error.response.data.message || "Login Failed");

            } else {

                toast.error("Server Error");

            }

        }

    };

    return (

        <div className="login-page">

            {/* Left Section */}

            <div className="login-left">



                <img
                    src={loginImage}
                    alt="Placement Login"
                    className="login-image"
                />


            </div>

            {/* Right Section */}

            <div className="login-right">

                <div className="login-card">

                    <h1>

                        Welcome Back

                    </h1>

                    <p>

                        Login to your account to continue

                    </p>

                    <form onSubmit={handleLogin}>

                        <label>

                            Email

                        </label>

                        <div className="input-box">

                            <FaUser className="input-icon" />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                        </div>

                        <label>

                            Password

                        </label>

                        <div className="input-box">

                            <FaLock className="input-icon" />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <span
                                className="eye-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            >

                                {

                                    showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />

                                }

                            </span>

                        </div>

                        <div className="login-options">

                            <label className="remember">

                                <input type="checkbox" />

                                <span>Remember Me</span>

                            </label>

                            <span className="forgot">

                                Forgot Password?

                            </span>

                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                        >

                            Login

                        </button>

                    </form>

                    <div className="divider">

                        <span>OR</span>

                    </div>

                    <div className="register-text">

                        New Here?

                        <span
                            onClick={() => navigate("/register")}
                        >

                            Register

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;
