import { useEffect, useState } from "react";
import {
    FaBell,
    FaUserCircle,
    FaBars
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";
import { getPendingCount } from "../services/SupportService";

function AdminNavbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const userName = localStorage.getItem("userName");

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

    const getPageDetails = () => {
        const path = location.pathname;
        if (path.startsWith("/edit-drive/")) {
            return {
                title: "Edit Company Drive",
                subtitle: "Update recruitment drive parameters and eligibility criteria."
            };
        }
        if (path.startsWith("/edit-student/")) {
            return {
                title: "Edit Student",
                subtitle: "Update personal and academic records for the student."
            };
        }
        if (path.startsWith("/student-details/")) {
            return {
                title: "Student Details",
                subtitle: "View academic status, applications history, and resume files."
            };
        }
        
        switch (path) {
            case "/admin":
                return {
                    title: "Admin Dashboard",
                    subtitle: `Welcome back, ${userName || "TPO Admin"} 👋`
                };
            case "/company-drives":
                return {
                    title: "Manage Drives",
                    subtitle: "Configure active hiring drives and eligibility criteria."
                };
            case "/applications-admin":
                return {
                    title: "Applications",
                    subtitle: "Manage and update student application statuses."
                };
            case "/eligible-students":
                return {
                    title: "Eligible Students",
                    subtitle: "Review list of students matching drive criteria."
                };
            case "/shortlisting":
                return {
                    title: "Shortlisting",
                    subtitle: "Advance eligible candidates through selection rounds."
                };
            case "/selected-students":
                return {
                    title: "Selected Students",
                    subtitle: "Track students who secured job offers."
                };
            case "/students":
                return {
                    title: "Students",
                    subtitle: "Manage all student registration records."
                };
            case "/reports":
                return {
                    title: "Reports",
                    subtitle: "Analyze and export placement metrics."
                };
            case "/notifications-admin":
                return {
                    title: "Notifications",
                    subtitle: "Send alerts and broadcasts to student portals."
                };
            case "/settings":
                return {
                    title: "Settings",
                    subtitle: "Manage security, credentials, and configurations."
                };
            case "/add-drive":
                return {
                    title: "Add Company Drive",
                    subtitle: "Register a new recruitment drive in the portal."
                };
            default:
                return {
                    title: "Admin Panel",
                    subtitle: ""
                };
        }
    };

    const { title, subtitle } = getPageDetails();

    return (

        <div
            style={{
                height: "80px",
                background: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 30px",
                borderBottom: "1px solid #e5e7eb"
            }}
        >

            {/* Left */}

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}
            >

                <FaBars
                    size={20}
                    style={{ cursor: "pointer", color: "#64748b" }}
                />

                <div>

                    <h2
                        style={{
                            margin: 0,
                            color: "#1e293b",
                            fontSize: "20px",
                            fontWeight: "700"
                        }}
                    >
                        {title}
                    </h2>

                    {subtitle && (
                        <span
                            style={{
                                color: "#64748b",
                                fontSize: "14px",
                                fontWeight: "500",
                                display: "block",
                                marginTop: "2px"
                            }}
                        >
                            {subtitle}
                        </span>
                    )}

                </div>

            </div>

            {/* Right */}

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px"
                }}
            >

                <div
                    style={{
                        position: "relative",
                        cursor: "pointer",
                        color: "#64748b",
                        display: "flex",
                        alignItems: "center"
                    }}
                    onClick={() => navigate("/notifications-admin")}
                >

                    <FaBell size={20} />

                    {

                        pendingCount > 0 && (

                            <span
                                style={{
                                    position: "absolute",
                                    top: "-6px",
                                    right: "-6px",
                                    background: "#ef4444",
                                    color: "white",
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "50%",
                                    fontSize: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "bold"
                                }}
                            >
                                {pendingCount}
                            </span>

                        )

                    }

                </div>

                <div
                    onClick={() => navigate("/settings")}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        cursor: "pointer",
                        padding: "6px 10px",
                        borderRadius: "10px",
                        transition: ".2s"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                    }}
                >
                    <div
                        style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#16a34a",
                            fontWeight: "700",
                            fontSize: "14px",
                            border: "1px solid #bbf7d0",
                            boxShadow: "0 2px 4px rgba(22,163,74,0.05)"
                        }}
                    >
                        {userName ? (
                            userName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
                        ) : (
                            <FaUserCircle size={38} color="#cbd5e1" />
                        )}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}
                    >
                        <span
                            style={{
                                color: "#1e293b",
                                fontWeight: "700",
                                fontSize: "14px",
                                lineHeight: "1.2"
                            }}
                        >
                            {userName || "TPO Admin"}
                        </span>
                        <span
                            style={{
                                color: "#64748b",
                                fontWeight: "500",
                                fontSize: "12px",
                                marginTop: "2px"
                            }}
                        >
                            TPO Admin
                        </span>
                    </div>
                </div>

            </div>

        </div>

    );

}

export default AdminNavbar;