function DashboardCard({ title, value, color, icon }) {

    return (

        <div
            style={{
                flex: 1,
                minWidth: "220px",
                background: "white",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 5px 12px rgba(0,0,0,0.08)",
                borderLeft: `6px solid ${color}`
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <div>

                    <h4
                        style={{
                            margin: 0,
                            color: "#666"
                        }}
                    >
                        {title}
                    </h4>

                    <h1
                        style={{
                            marginTop: "15px",
                            marginBottom: "5px"
                        }}
                    >
                        {value}
                    </h1>

                    <span
                        style={{
                            color: "gray",
                            fontSize: "13px"
                        }}
                    >
                        Updated just now
                    </span>

                </div>

                <div
                    style={{
                        fontSize: "35px"
                    }}
                >
                    {icon}
                </div>

            </div>

        </div>

    );

}

export default DashboardCard;