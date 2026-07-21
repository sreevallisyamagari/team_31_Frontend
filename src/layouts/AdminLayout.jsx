import {
    NavLink,
    Outlet,
    useNavigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getPendingCount } from "../services/SupportService";

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
    FaSignOutAlt,
    FaUserShield
} from "react-icons/fa";

function AdminLayout() {

    const navigate = useNavigate();
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        loadPendingCount();
    }, []);

    const loadPendingCount = async () => {
        try {
            const response = await getPendingCount();
            setPendingCount(response.data);
        } catch (error) {
            console.log(error);
        }
    };

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
    name: "Manage Admins",
    path: "/admin/add-admin",
    icon: <FaUserShield />
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
                    width: "260px",
                    background: "#0f172a",
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
                        borderBottom: "1px solid #1e293b"
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
                    <div>
                        <h2
                            style={{
                                margin: 0,
                                color: "#ffffff",
                                fontSize: "16px",
                                fontWeight: "700"
                            }}
                        >
                            Placement Portal
                        </h2>
                        <span
                            style={{
                                color: "#64748b",
                                fontSize: "11px",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px"
                            }}
                        >
                            Admin Panel
                        </span>
                    </div>
                </div>

                {/* Menu */}

                <div style={{ display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto", flex: 1, paddingRight: "4px" }}>

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

                                    fontSize: "14px",

                                    background: isActive
                                        ? "#2563eb"
                                        : "transparent",

                                    color: isActive
                                        ? "#ffffff"
                                        : "#94a3b8",

                                    boxShadow: isActive
                                        ? "0 4px 12px rgba(37,99,235,0.25)"
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

                                {menu.name === "Notifications" && pendingCount > 0 && (
                                    <span
                                        style={{
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "50%",
                                            background: "#ef4444"
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
                            color: "#94a3b8",
                            transition: ".25s",
                            fontFamily: "inherit",
                            fontSize: "14px",
                            marginTop: "10px"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#fee2e2";
                            e.currentTarget.style.color = "#ef4444";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#94a3b8";
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

                <AdminNavbar />

                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "24px",
                        background: "#f8fafc"
                    }}
                >

                    <Outlet />

                </div>

            </div>

        </div>

    );

}

export default AdminLayout;