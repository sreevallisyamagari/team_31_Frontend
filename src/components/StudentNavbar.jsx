import { useEffect, useState } from "react";
import {
    FaBell,
    FaUserCircle,
    FaBars
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";

import { getUnreadCount } from "../services/NotificationService";
import { getProfile } from "../services/StudentService";

function StudentNavbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const userName = localStorage.getItem("userName");
    const studentId = localStorage.getItem("userId");

    const [unreadCount, setUnreadCount] = useState(0);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadUnreadCount();
        loadStudentProfile();
    }, [studentId]);

    const loadUnreadCount = () => {

        if (!studentId) return;

        getUnreadCount(studentId)
            .then((response) => {

                setUnreadCount(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    };

    const loadStudentProfile = () => {
        if (!studentId) return;

        getProfile(studentId)
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getPageDetails = () => {
        switch (location.pathname) {
            case "/student":
                return {
                    title: "Student Dashboard",
                    subtitle: `Welcome back, ${profile?.name || userName || "Student"} 👋`
                };
            case "/drives":
                return {
                    title: "Company Drives",
                    subtitle: "Explore and apply for the latest placement opportunities."
                };
            case "/applications":
                return {
                    title: "My Applications",
                    subtitle: "Track all your placement applications in one place."
                };
            case "/profile":
                return {
                    title: "My Profile",
                    subtitle: "Manage your personal and academic information."
                };
            case "/resume":
                return {
                    title: "My Resume",
                    subtitle: "Upload and update your placement resume."
                };
            case "/notifications":
                return {
                    title: "Notifications",
                    subtitle: "Stay updated with latest placement notifications."
                };
            case "/results":
                return {
                    title: "Placement Results",
                    subtitle: "Check your selected placement drive results."
                };
            case "/help":
                return {
                    title: "Help & Support",
                    subtitle: "Get assistance from the placement coordination team."
                };
            default:
                return {
                    title: "Student Portal",
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
                    onClick={() => navigate("/notifications")}
                >

                    <FaBell size={20} />

                    {unreadCount > 0 && (

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
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: "bold"
                            }}
                        >
                            {unreadCount}
                        </span>

                    )}

                </div>

                <div
                    onClick={() => navigate("/profile")}
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
                            overflow: "hidden",
                            border: "1px solid #bfdbfe",
                            boxShadow: "0 2px 4px rgba(37,99,235,0.05)"
                        }}
                    >
                        {profile?.profilePictureUrl ? (
                            <img
                                src={profile.profilePictureUrl}
                                alt={profile.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        ) : profile?.name ? (
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    background: "linear-gradient(135deg,#eff6ff,#dbeafe)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "#2563eb",
                                    fontWeight: "700"
                                }}
                            >
                                {profile.name
                                    .split(" ")
                                    .map(n => n[0])
                                    .join("")
                                    .substring(0, 2)
                                    .toUpperCase()}
                            </div>
                        ) : (
                            <FaUserCircle
                                size={38}
                                color="#cbd5e1"
                            />
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
                            {profile?.name || userName || "Student"}
                        </span>
                        <span
                            style={{
                                color: "#64748b",
                                fontWeight: "500",
                                fontSize: "12px",
                                marginTop: "2px"
                            }}
                        >
                            {profile?.department ? `${profile.department} - Final Year` : "CSE - Final Year"}
                        </span>
                    </div>
                </div>

            </div>

        </div>

    );

}

export default StudentNavbar;