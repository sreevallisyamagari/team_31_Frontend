import {
    FaBell,
    FaUserCircle,
    FaBars
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPendingCount } from "../services/SupportService";

function AdminNavbar() {

    const navigate = useNavigate();

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
                    onClick={() =>
                        alert("Sidebar collapse will be added during UI redesign")
                    }
                />

                <div>

                    <h2 style={{ margin: 0 }}>
                        Admin Dashboard
                    </h2>

                    <span style={{ color: "gray" }}>
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
                    onClick={() => navigate("/notifications-admin")}
                >

                    <FaBell size={22} />

                    {

                        pendingCount > 0 && (

                            <span
                                style={{
                                    position: "absolute",
                                    top: "-8px",
                                    right: "-8px",
                                    background: "red",
                                    color: "white",
                                    width: "18px",
                                    height: "18px",
                                    borderRadius: "50%",
                                    fontSize: "11px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                {pendingCount}
                            </span>

                        )

                    }

                </div>

                <FaUserCircle
                    size={38}
                    color="#2563eb"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/settings")}
                />

            </div>

        </div>

    );

}

export default AdminNavbar;