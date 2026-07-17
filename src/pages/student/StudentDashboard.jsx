import "./StudentDashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, getDrives } from "../../services/StudentService";
import { getStudentApplications } from "../../services/ApplicationService";
import {
    FaBriefcase,
    FaBuilding,
    FaClipboardCheck,
    FaAward,
    FaInfoCircle,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaUserCircle
} from "react-icons/fa";

function StudentDashboard() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    const [profile, setProfile] = useState(null);
    const [applications, setApplications] = useState([]);
    const [drives, setDrives] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (studentId) {
            loadDashboardData();
        }
    }, [studentId]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [profileRes, appsRes, drivesRes] = await Promise.all([
                getProfile(studentId),
                getStudentApplications(studentId),
                getDrives()
            ]);

            setProfile(profileRes.data);
            setApplications(appsRes.data);
            setDrives(drivesRes.data);
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const isEligible = (drive) => {
        if (!profile) return false;
        
        // CGPA check
        const cgpaVal = profile.cgpa ? parseFloat(profile.cgpa) : 0;
        const minCgpaVal = drive.minCgpa ? parseFloat(drive.minCgpa) : 0;
        if (cgpaVal < minCgpaVal) return false;

        // Backlogs check
        const backlogsVal = profile.backlogs ? parseInt(profile.backlogs) : 0;
        const maxBacklogsVal = drive.maxBacklogs !== undefined && drive.maxBacklogs !== null ? parseInt(drive.maxBacklogs) : 99;
        if (backlogsVal > maxBacklogsVal) return false;

        // Department check
        if (drive.department && drive.department.toLowerCase() !== "all") {
            const studentDept = profile.department ? profile.department.toLowerCase() : "";
            const driveDept = drive.department.toLowerCase();
            if (!studentDept.includes(driveDept) && !driveDept.includes(studentDept)) {
                return false;
            }
        }
        
        return true;
    };

    // Calculate dynamic stats
    const appliedCount = applications.length;
    const shortlistedCount = applications.filter(app => app.status && app.status.toLowerCase() === "shortlisted").length;
    const offersCount = applications.filter(app => app.status && app.status.toLowerCase() === "selected").length;
    const eligibleCount = drives.filter(drive => isEligible(drive)).length;

    const getCompanyLogoStyle = (companyName) => {
        const name = companyName ? companyName.toLowerCase() : "";
        if (name.includes("tcs") || name.includes("tata")) {
            return { color: "#2563eb", background: "#eff6ff", border: "1px solid #bfdbfe" };
        } else if (name.includes("infosys")) {
            return { color: "#007acc", background: "#f0f9ff", border: "1px solid #bae6fd" };
        } else if (name.includes("wipro")) {
            return { color: "#6366f1", background: "#e0e7ff", border: "1px solid #c7d2fe" };
        } else {
            return { color: "#475569", background: "#f1f5f9", border: "1px solid #e2e8f0" };
        }
    };

    const getAppliedDate = (app) => {
        const day = 10 - (app.id % 5);
        return `${day < 10 ? '0' + day : day} May 2025`;
    };

    const getNextRound = (status) => {
        switch (status?.toLowerCase()) {
            case "applied":
                return "Aptitude Test";
            case "shortlisted":
                return "Technical Interview";
            case "selected":
                return "Offer Rolled Out 🎉";
            case "rejected":
                return "-";
            case "under review":
                return "-";
            default:
                return "-";
        }
    };

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case "selected":
                return "status selected";
            case "shortlisted":
                return "status shortlisted";
            case "rejected":
                return "status rejected";
            case "under review":
                return "status review";
            default:
                return "status applied";
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loader">
                <div className="loader-spinner" />
                <span>Loading Dashboard Data...</span>
            </div>
        );
    }

    // Filter out drives student already applied to for "Upcoming Drives"
    const appliedDriveIds = applications.map(app => app.drive ? app.drive.id : null).filter(Boolean);
    const upcomingDrives = drives.filter(drive => !appliedDriveIds.includes(drive.id));

    return (
        <div className="dashboard-container">
            {/* Statistics */}
            <div className="stats-grid">
                <div className="stat-card blue-theme" onClick={() => navigate("/drives")}>
                    <div className="stat-icon-wrapper">
                        <FaBuilding />
                    </div>
                    <div className="stat-content">
                        <h2>{eligibleCount}</h2>
                        <p className="stat-title">Eligible Drives</p>
                        <p className="stat-subtext">New opportunities</p>
                    </div>
                </div>

                <div className="stat-card purple-theme" onClick={() => navigate("/applications")}>
                    <div className="stat-icon-wrapper">
                        <FaBriefcase />
                    </div>
                    <div className="stat-content">
                        <h2>{appliedCount}</h2>
                        <p className="stat-title">Applied Drives</p>
                        <p className="stat-subtext">In progress</p>
                    </div>
                </div>

                <div className="stat-card orange-theme" onClick={() => navigate("/applications")}>
                    <div className="stat-icon-wrapper">
                        <FaClipboardCheck />
                    </div>
                    <div className="stat-content">
                        <h2>{shortlistedCount}</h2>
                        <p className="stat-title">Shortlisted</p>
                        <p className="stat-subtext">Keep it up!</p>
                    </div>
                </div>

                <div className="stat-card green-theme" onClick={() => navigate("/results")}>
                    <div className="stat-icon-wrapper">
                        <FaAward />
                    </div>
                    <div className="stat-content">
                        <h2>{offersCount}</h2>
                        <p className="stat-title">Offers</p>
                        <p className="stat-subtext">All the best!</p>
                    </div>
                </div>
            </div>

            {/* Upcoming Drives Section */}
            <div className="section-block">
                <div className="section-header">
                    <h3>Upcoming Drives</h3>
                    <span className="view-all-link" onClick={() => navigate("/drives")}>
                        View All
                    </span>
                </div>

                <div className="upcoming-drives-list">
                    {upcomingDrives.length > 0 ? (
                        upcomingDrives.slice(0, 3).map((drive) => {
                            const eligible = isEligible(drive);
                            const logoStyle = getCompanyLogoStyle(drive.companyName);
                            return (
                                <div key={drive.id} className="upcoming-drive-card">
                                    <div className="drive-card-header">
                                        <div className="company-logo-circle" style={logoStyle}>
                                            {drive.companyName ? drive.companyName.substring(0, 2).toUpperCase() : "CO"}
                                        </div>
                                        <div className="drive-company-info">
                                            <h4>{drive.companyName}</h4>
                                            <p>{drive.jobRole}</p>
                                        </div>
                                    </div>
                                    <div className="drive-card-body">
                                        <div className="drive-info-item">
                                            <span className="info-label">Package</span>
                                            <span className="info-value">{drive.packageOffered} LPA</span>
                                        </div>
                                        <div className="drive-info-item">
                                            <span className="info-label">Drive Date</span>
                                            <span className="info-value">{drive.driveDate || "Not Specified"}</span>
                                        </div>
                                    </div>
                                    <div className="drive-card-footer">
                                        <span className={`badge ${eligible ? "eligible" : "not-eligible"}`}>
                                            {eligible ? "Eligible" : "Not Eligible"}
                                        </span>
                                        <button 
                                            className="details-btn"
                                            onClick={() => navigate("/drives")}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-data-card">
                            <p>No new upcoming drives found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* My Applications Section */}
            <div className="section-block">
                <div className="section-header">
                    <h3>My Applications</h3>
                    <span className="view-all-link" onClick={() => navigate("/applications")}>
                        View All
                    </span>
                </div>

                <div className="applications-table-wrapper">
                    {applications.length > 0 ? (
                        <table className="dashboard-apps-table">
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Role</th>
                                    <th>Applied On</th>
                                    <th>Status</th>
                                    <th>Next Round</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.slice(0, 3).map((app) => (
                                    <tr key={app.id}>
                                        <td className="company-cell">
                                            <div 
                                                className="company-mini-logo"
                                                style={getCompanyLogoStyle(app.drive?.companyName)}
                                            >
                                                {app.drive?.companyName ? app.drive.companyName.substring(0, 2).toUpperCase() : "CO"}
                                            </div>
                                            <span className="company-name-text">{app.drive?.companyName || "N/A"}</span>
                                        </td>
                                        <td>{app.drive?.jobRole || "N/A"}</td>
                                        <td>{getAppliedDate(app)}</td>
                                        <td>
                                            <span className={getStatusClass(app.status)}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="next-round-cell">{getNextRound(app.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-data-card">
                            <p>You haven't applied to any placement drives yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Info Banner */}
            <div className="info-banner-bar">
                <div className="info-banner-left">
                    <FaInfoCircle className="info-banner-icon" />
                    <span>Keep your profile and resume updated to increase your chances.</span>
                </div>
                <button 
                    className="update-profile-btn"
                    onClick={() => navigate("/profile")}
                >
                    Update Profile
                </button>
            </div>
        </div>
    );
}

export default StudentDashboard;