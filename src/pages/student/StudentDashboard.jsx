import { Link, useNavigate } from "react-router-dom";

function StudentDashboard() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    const userName = localStorage.getItem("userName");

    return (

        <div style={{ display: "flex", height: "100vh" }}>

            {/* Sidebar */}

            <div
                style={{
                    width: "250px",
                    background: "#1e3a8a",
                    color: "white",
                    padding: "20px"
                }}
            >

                <h2>Student</h2>

                <hr />

                <p>
                    <Link to="/student" style={{ color: "white", textDecoration: "none" }}>
                        Dashboard
                    </Link>
                </p>

                <p>
                    <Link to="/drives" style={{ color: "white", textDecoration: "none" }}>
                        Company Drives
                    </Link>
                </p>

                <p>
                    <Link to="/applications" style={{ color: "white", textDecoration: "none" }}>
                        My Applications
                    </Link>
                </p>

                <p>
                    <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
                        Profile
                    </Link>
                </p>

                <p>
                    <Link to="/resume" style={{ color: "white", textDecoration: "none" }}>
                        My Resume
                    </Link>
                </p>

                <p>
                    <Link to="/notifications" style={{ color: "white", textDecoration: "none" }}>
                        Notifications
                    </Link>
                </p>

                <p>
                    <Link to="/results" style={{ color: "white", textDecoration: "none" }}>
                        Placement Results
                    </Link>
                </p>

                {/* NEW */}
                <p>
                    <Link to="/help" style={{ color: "white", textDecoration: "none" }}>
                        Help & Support
                    </Link>
                </p>

                <button
                    onClick={logout}
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        padding: "10px",
                        cursor: "pointer",
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "5px"
                    }}
                >
                    Logout
                </button>



            </div>

            {/* Content */}

            <div
                style={{
                    flex: 1,
                    padding: "30px",
                    background: "#f5f5f5"
                }}
            >

                <h1>Student Dashboard</h1>

                <h3>Welcome, {userName}</h3>

                <hr />

                <p>Use the menu on the left to:</p>

                <ul>
                    <li>View Company Drives</li>
                    <li>Apply for Drives</li>
                    <li>View My Applications</li>
                    <li>Check Placement Results</li>
                    <li>Update Your Profile</li>
                </ul>

            </div>

        </div>

    );

}

export default StudentDashboard;