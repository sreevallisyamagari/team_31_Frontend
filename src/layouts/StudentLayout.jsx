import {
    NavLink,
    Outlet,
    useNavigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getUnreadCount } from "../services/NotificationService";

import StudentNavbar from "../components/StudentNavbar";

import {
    FaHome,
    FaBuilding,
    FaFileAlt,
    FaUser,
    FaFileUpload,
    FaBell,
    FaAward,
    FaLifeRing,
    FaGraduationCap,
    FaSignOutAlt
} from "react-icons/fa";

function StudentLayout() {

    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);
    const studentId = localStorage.getItem("userId");

    useEffect(() => {
        if (studentId) {
            getUnreadCount(studentId)
                .then((response) => {
                    setUnreadCount(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [studentId]);

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    const menus = [

        {
            name: "Dashboard",
            path: "/student",
            icon: <FaHome />
        },

        {
            name: "Company Drives",
            path: "/drives",
            icon: <FaBuilding />
        },

        {
            name: "My Applications",
            path: "/applications",
            icon: <FaFileAlt />
        },

        {
            name: "Profile",
            path: "/profile",
            icon: <FaUser />
        },

        {
            name: "My Resume",
            path: "/resume",
            icon: <FaFileUpload />
        },

        {
            name: "Notifications",
            path: "/notifications",
            icon: <FaBell />
        },

        {
            name: "Placement Results",
            path: "/results",
            icon: <FaAward />
        },

        {
            name: "Help & Support",
            path: "/help",
            icon: <FaLifeRing />
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
                    width: "260px",
                    background: "#ffffff",
                    borderRight: "1px solid #e5e7eb",
                    padding: "20px 16px",
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                {/* Logo */}

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        paddingBottom: "20px",
                        marginBottom: "20px",
                        borderBottom: "1px solid #e5e7eb"
                    }}
                >
                    <div
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff",
                            fontSize: "18px",
                            boxShadow: "0 4px 10px rgba(37,99,235,0.2)"
                        }}
                    >
                        <FaGraduationCap />
                    </div>
                    <h2
                        style={{
                            margin: 0,
                            color: "#2563eb",
                            fontSize: "18px",
                            fontWeight: "700"
                        }}
                    >
                        Placement Portal
                    </h2>
                </div>

                {/* Menu */}

                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>

                    {

                        menus.map(menu => (

                            <NavLink

                                key={menu.path}

                                to={menu.path}

                                style={({ isActive }) => ({

                                    display: "flex",

                                    alignItems: "center",

                                    gap: "12px",

                                    padding: "10px 14px",

                                    borderRadius: "10px",

                                    textDecoration: "none",

                                    transition: ".25s",

                                    fontWeight: "600",

                                    background: isActive
                                        ? "#eef4ff"
                                        : "transparent",

                                    color: isActive
                                        ? "#2563eb"
                                        : "#6b7280",

                                    boxShadow: isActive
                                        ? "0 2px 8px rgba(0,0,0,0.04)"
                                        : "none"

                                })}

                            >

                                <span
                                    style={{
                                        fontSize: "18px",
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    {menu.icon}
                                </span>

                                <span style={{ flex: 1 }}>{menu.name}</span>

                                {menu.name === "Notifications" && unreadCount > 0 && (
                                    <span
                                        style={{
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "50%",
                                            background: "#2563eb"
                                        }}
                                    />
                                )}

                            </NavLink>

                        ))

                    }

                    {/* Logout as a menu item */}
                    <button
                        onClick={logout}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "10px 14px",
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            borderRadius: "10px",
                            textAlign: "left",
                            cursor: "pointer",
                            fontWeight: "600",
                            color: "#6b7280",
                            transition: ".25s",
                            fontFamily: "inherit",
                            fontSize: "16px"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#fee2e2";
                            e.currentTarget.style.color = "#ef4444";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#6b7280";
                        }}
                    >
                        <span style={{ fontSize: "18px", display: "flex", alignItems: "center" }}>
                            <FaSignOutAlt />
                        </span>
                        <span>Logout</span>
                    </button>

                </div>

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

                <StudentNavbar />

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

export default StudentLayout;