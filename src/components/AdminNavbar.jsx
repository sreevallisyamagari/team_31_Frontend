import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";

function AdminNavbar() {

    const userName = localStorage.getItem("userName");

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
                        position: "relative"
                    }}
                >

                    <FaBell
                        size={22}
                        style={{ cursor: "pointer" }}
                    />

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
                        3
                    </span>

                </div>

                <FaUserCircle
                    size={38}
                    color="#2563eb"
                />

            </div>

        </div>

    );

}

export default AdminNavbar;