import { useEffect, useState } from "react";
import {
    FaBell,
    FaUserCircle,
    FaBars
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { getUnreadCount } from "../services/NotificationService";

function StudentNavbar() {

    const navigate = useNavigate();

    const userName = localStorage.getItem("userName");
    const studentId = localStorage.getItem("userId");

    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {

        loadUnreadCount();

    }, []);

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

    return (

        <div
            style={{
                height: "70px",
                background: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 30px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
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
                    size={22}
                    style={{ cursor: "pointer" }}
                />

                <div>

                    <h2
                        style={{
                            margin: 0
                        }}
                    >
                        Student Dashboard
                    </h2>

                    <span
                        style={{
                            color: "gray"
                        }}
                    >
                        Welcome back, {userName} 👋
                    </span>

                </div>

            </div>

            {/* Right */}

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "25px"
                }}
            >

                <div
                    style={{
                        position: "relative",
                        cursor: "pointer"
                    }}
                    onClick={() => navigate("/notifications")}
                >

                    <FaBell size={22} />

                    {unreadCount > 0 && (

                        <span
                            style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-8px",
                                background: "#ef4444",
                                color: "white",
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                fontSize: "11px",
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

                <FaUserCircle
                    size={38}
                    color="#2563eb"
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={() => navigate("/profile")}
                />

            </div>

        </div>

    );

}

export default StudentNavbar;