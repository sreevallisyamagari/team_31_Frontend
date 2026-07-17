import "./Register.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/AuthService";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaBuilding,
    FaGraduationCap,
    FaClipboardList,
    FaPhone,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import loginImage from "../../assets/images/login.png";

function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [student, setStudent] = useState({
        name: "",
        email: "",
        password: "",
        department: "",
        cgpa: "",
        backlogs: "",
        phone: ""
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await register(student);

            alert(response.data);

            navigate("/");

        } catch (error) {

            alert("Registration Failed");

            console.log(error);

        }

    };

    return (

        <div className="register-page">

            {/* Left Side */}

            <div className="register-left">

                <img
                    src={loginImage}
                    alt="Placement Portal"
                    className="register-image"
                />

            </div>

            {/* Right Side */}

            <div className="register-right">

                <div className="register-card">

                    <h1>Create Account</h1>

                    <p>Join the Placement Portal</p>

                    <form onSubmit={handleRegister}>

                        <label>Full Name</label>

                        <div className="input-box">

                            <FaUser className="input-icon"/>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={student.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <label>Email</label>

                        <div className="input-box">

                            <FaEnvelope className="input-icon"/>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={student.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <label>Password</label>

                        <div className="input-box">

                            <FaLock className="input-icon"/>

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                value={student.password}
                                onChange={handleChange}
                                required
                            />

                            <span
                                className="eye-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {
                                    showPassword
                                        ? <FaEyeSlash/>
                                        : <FaEye/>
                                }
                            </span>

                        </div>

                        <label>Department</label>

                        <div className="input-box">

                            <FaBuilding className="input-icon"/>

                            <input
                                type="text"
                                name="department"
                                placeholder="Department"
                                value={student.department}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <label>CGPA</label>

                        <div className="input-box">

                            <FaGraduationCap className="input-icon"/>

                            <input
                                type="number"
                                step="0.01"
                                name="cgpa"
                                placeholder="CGPA"
                                value={student.cgpa}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <label>Backlogs</label>

                        <div className="input-box">

                            <FaClipboardList className="input-icon"/>

                            <input
                                type="number"
                                name="backlogs"
                                placeholder="Backlogs"
                                value={student.backlogs}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <label>Phone Number</label>

                        <div className="input-box">

                            <FaPhone className="input-icon"/>

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={student.phone}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="register-btn"
                        >
                            Register
                        </button>

                    </form>

                    <div className="divider">

                        <span>OR</span>

                    </div>

                    <div className="login-text">

                        Already have an account?

                        <span
                            onClick={() => navigate("/")}
                        >
                            Login
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;