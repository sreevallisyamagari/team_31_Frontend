import {
    NavLink,
    Outlet,
    useNavigate
} from "react-router-dom";

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
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                {/* Logo */}

<div
    style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingBottom: "25px",
        marginBottom: "20px",
        borderBottom: "1px solid #e5e7eb"
    }}
>

    <div
        style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#2563eb,#3b82f6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "34px",
            marginBottom: "18px",
            boxShadow: "0 8px 20px rgba(37,99,235,0.25)"
        }}
    >
        <FaGraduationCap />
    </div>

    <h2
        style={{
            margin: 0,
            color: "#2563eb",
            fontSize: "28px",
            fontWeight: "700",
            lineHeight: "1.2"
        }}
    >
        Student
        <br />
        Portal
    </h2>

    <span
        style={{
            marginTop: "8px",
            color: "#6b7280",
            fontSize: "14px",
            fontWeight: "500"
        }}
    >
        Placement Cell
    </span>

</div>

                {/* Menu */}

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
                                        ? "#eef4ff"
                                        : "transparent",

                                    color: isActive
                                        ? "#2563eb"
                                        : "#6b7280",

                                    boxShadow: isActive
                                        ? "0 2px 8px rgba(0,0,0,0.08)"
                                        : "none"

                                })}

                            >

                                <span
                                    style={{
                                        fontSize: "18px"
                                    }}
                                >
                                    {menu.icon}
                                </span>

                                {menu.name}

                            </NavLink>

                        ))

                    }

                </div>

                <div style={{ flex: 1 }} />

                {/* Logout */}

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