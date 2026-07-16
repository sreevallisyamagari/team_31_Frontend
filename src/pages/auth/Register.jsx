import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/AuthService";

function Register() {

    const navigate = useNavigate();

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

        <div
            style={{
                width: "450px",
                margin: "50px auto",
                padding: "30px",
                border: "1px solid #ddd",
                borderRadius: "10px"
            }}
        >

            <h2>Student Registration</h2>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />

                <input
                    type="number"
                    step="0.01"
                    name="cgpa"
                    placeholder="CGPA"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />

                <input
                    type="number"
                    name="backlogs"
                    placeholder="Backlogs"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "green",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Register
                </button>

            </form>

            <p style={{ textAlign: "center", marginTop: "20px" }}>
                Already have an account?{" "}
                <span
                    style={{
                        color: "blue",
                        cursor: "pointer"
                    }}
                    onClick={() => navigate("/")}
                >
                    Login
                </span>
            </p>

        </div>

    );

}

export default Register;