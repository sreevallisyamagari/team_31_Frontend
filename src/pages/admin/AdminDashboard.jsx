import { useEffect, useState } from "react";
import {
    FaUsers,
    FaBuilding,
    FaFileAlt,
    FaUserCheck
} from "react-icons/fa";

import { getDashboard } from "../../services/AdminService";
import DashboardCard from "../../components/DashboardCard";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState({
        totalStudents: 0,
        totalDrives: 0,
        totalApplications: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboard();

            setDashboard(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>

            <h2>Admin Dashboard</h2>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginTop: "20px"
                }}
            >

                <DashboardCard
                    title="Total Students"
                    value={dashboard.totalStudents}
                    color="#2563eb"
                    icon={<FaUsers color="#2563eb" />}
                />

                <DashboardCard
                    title="Company Drives"
                    value={dashboard.totalDrives}
                    color="#22c55e"
                    icon={<FaBuilding color="#22c55e" />}
                />

                <DashboardCard
                    title="Applications"
                    value={dashboard.totalApplications}
                    color="#f59e0b"
                    icon={<FaFileAlt color="#f59e0b" />}
                />

                <DashboardCard
                    title="Selected Students"
                    value="0"
                    color="#ef4444"
                    icon={<FaUserCheck color="#ef4444" />}
                />

            </div>

        </>

    );

}

export default AdminDashboard;