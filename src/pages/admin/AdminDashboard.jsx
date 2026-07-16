import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FaUsers,
    FaBuilding,
    FaFileAlt,
    FaUserCheck
} from "react-icons/fa";

import { getDashboard } from "../../services/AdminService";
import AdminNavbar from "../../components/AdminNavbar";
import DashboardCard from "../../components/DashboardCard";

function AdminDashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        totalStudents: 0,
        totalDrives: 0,
        totalApplications: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboard();

            setDashboard(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <div
            style={{
                display: "flex",
                height: "100vh",
                background: "#f5f7fb"
            }}
        >

            {/* Sidebar */}

            <div
                style={{
                    width: "260px",
                    background: "#0f172a",
                    color: "white",
                    padding: "20px"
                }}
            >

                <h2 style={{ textAlign: "center" }}>
                    Placement Portal
                </h2>

                <hr />

                <p>
                    <Link
                        to="/admin"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        🏠 Dashboard
                    </Link>
                </p>

                <p>
                    <Link
                        to="/company-drives"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        💼 Manage Drives
                    </Link>
                </p>

                <p>
                    <Link
                        to="/applications-admin"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        📄 Applications
                    </Link>
                </p>

                <p>
                    <Link
                        to="/eligible-students"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        👨‍🎓 Eligible Students
                    </Link>
                </p>

                <p>
                    <Link
                        to="/shortlisting"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        ⭐ Shortlisting
                    </Link>
                </p>

                <p>
                    <Link
                        to="/selected-students"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        🏆 Selected List
                    </Link>
                </p>

                <p>
                    <Link
                        to="/students"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        👥 Students
                    </Link>
                </p>

                <p>
                    <Link
                        to="/support-tickets"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        🛠 Support Tickets
                    </Link>
                </p>

                <p>
                    <Link
                        to="/reports"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        📊 Reports
                    </Link>
                </p>

                <p>
                    <Link
                        to="/notifications-admin"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        🔔 Notifications
                    </Link>
                </p>

                <p>
                    <Link
                        to="/settings"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        ⚙ Settings
                    </Link>
                </p>

                <button
                    onClick={logout}
                    style={{
                        width: "100%",
                        marginTop: "30px",
                        padding: "12px",
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>

            </div>

            {/* Main Content */}

            <div
                style={{
                    flex: 1,
                    overflowY: "auto"
                }}
            >

                <AdminNavbar />

                <div
                    style={{
                        padding: "30px"
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                            flexWrap: "wrap"
                        }}
                    >

                        <DashboardCard
                            title="Total Students"
                            value={dashboard.totalStudents}
                            color="#2563eb"
                            icon={<FaUsers color="#2563eb" />}
                        />

                        <DashboardCard
                            title="Company Drives"
                            value={dashboard.totalDrives}
                            color="#22c55e"
                            icon={<FaBuilding color="#22c55e" />}
                        />

                        <DashboardCard
                            title="Applications"
                            value={dashboard.totalApplications}
                            color="#f59e0b"
                            icon={<FaFileAlt color="#f59e0b" />}
                        />

                        <DashboardCard
                            title="Selected Students"
                            value="0"
                            color="#ef4444"
                            icon={<FaUserCheck color="#ef4444" />}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;