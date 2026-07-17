import {
    NavLink,
    Outlet,
    useNavigate
} from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";
import { FaGraduationCap } from "react-icons/fa";

import {
    FaHome,
    FaBuilding,
    FaFileAlt,
    FaUserGraduate,
    FaClipboardCheck,
    FaAward,
    FaUsers,
    FaChartBar,
    FaBell,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

function AdminLayout() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    const menus = [

        {
            name: "Dashboard",
            path: "/admin",
            icon: <FaHome />
        },

        {
            name: "Manage Drives",
            path: "/company-drives",
            icon: <FaBuilding />
        },

        {
            name: "Applications",
            path: "/applications-admin",
            icon: <FaFileAlt />
        },

        {
            name: "Eligible Students",
            path: "/eligible-students",
            icon: <FaUserGraduate />
        },

        {
            name: "Shortlisting",
            path: "/shortlisting",
            icon: <FaClipboardCheck />
        },

        {
            name: "Selected Students",
            path: "/selected-students",
            icon: <FaAward />
        },

        {
            name: "Students",
            path: "/students",
            icon: <FaUsers />
        },

        {
            name: "Reports",
            path: "/reports",
            icon: <FaChartBar />
        },

        {
            name: "Notifications",
            path: "/notifications-admin",
            icon: <FaBell />
        },

        {
            name: "Settings",
            path: "/settings",
            icon: <FaCog />
        }

    ];

    return (

        <div
            style={{
                display: "flex",
                height: "100vh",
                background: "#f4f7fb"
            }}
        >

            {/* Sidebar */}

            <div
                style={{
                    width: "240px",
                    background: "#f8fafc",
                    borderRight: "1px solid #e5e7eb",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "25px"
                    }}
                >

                    <div
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            background: "#2563eb",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontSize: "28px",
                            marginBottom: "10px"
                        }}
                    >

                        <FaGraduationCap />

                    </div>

                    <h2
                        style={{
                            margin: 0,
                            color: "#2563eb"
                        }}
                    >
                        Placement Portal
                    </h2>

                    <span
                        style={{
                            color: "#6b7280",
                            fontSize: "13px"
                        }}
                    >
                        Admin Panel
                    </span>

                </div>
                <div>

                    {

                        menus.map(menu => (

                            <NavLink

                                key={menu.path}

                                to={menu.path}

                                style={({ isActive }) => ({

                                    display: "flex",

                                    alignItems: "center",

                                    gap: "10px",

                                    padding: "10px 14px",

                                    marginBottom: "4px",

                                    borderRadius: "10px",

                                    textDecoration: "none",

                                    transition: ".25s",

                                    fontWeight: "600",

                                    background: isActive
                                        ? "#ffffff"
                                        : "transparent",

                                    color: isActive
                                        ? "#2563eb"
                                        : "#64748b",

                                    borderLeft: isActive
                                        ? "4px solid #2563eb"
                                        : "4px solid transparent",

                                    boxShadow: isActive
                                        ? "0 4px 15px rgba(37,99,235,0.15)"
                                        : "none"

                                })}

                            >

                                <span style={{ fontSize: "18px" }}>
                                    {menu.icon}
                                </span>

                                {menu.name}

                            </NavLink>

                        ))

                    }

                </div>
                <div style={{ flex: 1 }} />

                <button

                    onClick={logout}

                    style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        padding: "11px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px"
                    }}

                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

            {/* Main Content */}

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                }}
            >

                <AdminNavbar />

                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "20px"
                    }}
                >

                    <Outlet />

                </div>

            </div>

        </div>

    );

}

export default AdminLayout;