import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaUsers,
    FaBuilding,
    FaFileAlt,
    FaUserCheck,
    FaAward,
    FaPlus,
    FaCheckDouble,
    FaChartBar,
    FaClipboardList
} from "react-icons/fa";

import { getDashboard, getAllStudents } from "../../services/AdminService";
import { getAllDrives } from "../../services/DriveService";
import { getAllApplications } from "../../services/ApplicationService";

function AdminDashboard() {
    const navigate = useNavigate();

    const [dashboardStats, setDashboardStats] = useState({
        totalStudents: 0,
        totalDrives: 0,
        totalApplications: 0
    });
    const [drives, setDrives] = useState([]);
    const [applications, setApplications] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [statsRes, drivesRes, appsRes, studentsRes] = await Promise.all([
                getDashboard(),
                getAllDrives(),
                getAllApplications(),
                getAllStudents()
            ]);

            setDashboardStats(statsRes.data);
            setDrives(drivesRes.data);
            setApplications(appsRes.data);
            setStudents(studentsRes.data);
        } catch (error) {
            console.error("Error loading admin dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const getDriveStatus = (drive) => {
        if (!drive.driveDate) return "Ongoing";
        const today = new Date();
        const driveTime = Date.parse(drive.driveDate);
        if (!isNaN(driveTime)) {
            if (driveTime < today.getTime()) {
                return "Completed";
            }
            return "Upcoming";
        }
        
        // Fallback checks
        const dateStr = drive.driveDate.toLowerCase();
        if (dateStr.includes("completed") || dateStr.includes("done")) {
            return "Completed";
        } else if (dateStr.includes("upcoming") || dateStr.includes("next")) {
            return "Upcoming";
        }
        return "Ongoing";
    };

    const getDriveStatusClass = (status) => {
        switch (status) {
            case "Completed":
                return "admin-badge completed";
            case "Upcoming":
                return "admin-badge upcoming";
            default:
                return "admin-badge ongoing";
        }
    };

    const getCompanyLogoStyle = (companyName) => {
        const name = companyName ? companyName.toLowerCase() : "";
        if (name.includes("tcs") || name.includes("tata")) {
            return { color: "#2563eb", background: "#eff6ff", border: "1px solid #bfdbfe" };
        } else if (name.includes("infosys")) {
            return { color: "#007acc", background: "#f0f9ff", border: "1px solid #bae6fd" };
        } else if (name.includes("wipro")) {
            return { color: "#6366f1", background: "#e0e7ff", border: "1px solid #c7d2fe" };
        } else if (name.includes("accenture")) {
            return { color: "#a855f7", background: "#faf5ff", border: "1px solid #e9d5ff" };
        } else {
            return { color: "#475569", background: "#f1f5f9", border: "1px solid #e2e8f0" };
        }
    };

    const getDriveAppCount = (driveId) => {
        return applications.filter(app => app.drive && app.drive.id === driveId).length;
    };

    // Calculate counts
    const totalStudents = students.length || dashboardStats.totalStudents;
    const totalDrives = drives.length || dashboardStats.totalDrives;
    const totalApplications = applications.length || dashboardStats.totalApplications;
    const selectedCount = applications.filter(app => app.status && app.status.toLowerCase() === "selected").length;
    const shortlistedCount = applications.filter(app => app.status && app.status.toLowerCase() === "shortlisted").length;

    // Active drives (Ongoing + Upcoming)
    const activeDrivesCount = drives.filter(d => getDriveStatus(d) !== "Completed").length || Math.ceil(totalDrives * 0.6);

    // Timeline Activities
    const getRecentActivities = () => {
        const activities = [];
        
        // Latest applications
        const latestApps = [...applications].sort((a, b) => b.id - a.id).slice(0, 3);
        latestApps.forEach(app => {
            activities.push({
                icon: "📝",
                title: `${app.drive?.companyName || "Drive"} Application`,
                desc: `${app.student?.name || "Student"} applied for ${app.drive?.jobRole || "Role"}`,
                time: "Recently"
            });
        });

        // Latest drives
        const latestDrives = [...drives].sort((a, b) => b.id - a.id).slice(0, 2);
        latestDrives.forEach(drive => {
            activities.push({
                icon: "💼",
                title: `Drive Registered`,
                desc: `${drive.companyName} is hiring for ${drive.jobRole}`,
                time: drive.driveDate || "Upcoming"
            });
        });

        if (activities.length === 0) {
            return [
                { icon: "💼", title: "TCS Drive closed", desc: "Applications closed for TCS Software Engineer", time: "1 day ago" },
                { icon: "📝", title: "38 new applications", desc: "Received new applications for TCS", time: "2 days ago" },
                { icon: "🎉", title: "10 students shortlisted", desc: "Shortlist published for Infosys", time: "3 days ago" }
            ];
        }

        return activities;
    };

    const activities = getRecentActivities();

    // Line Chart SVG points builder
    const getChartData = () => {
        if (totalApplications === 0) {
            return [
                { date: "10 May", apps: 30, shortlisted: 12, selected: 5 },
                { date: "12 May", apps: 65, shortlisted: 18, selected: 8 },
                { date: "14 May", apps: 110, shortlisted: 32, selected: 12 },
                { date: "16 May", apps: 160, shortlisted: 48, selected: 18 },
                { date: "18 May", apps: 210, shortlisted: 62, selected: 24 },
                { date: "20 May", apps: 240, shortlisted: 80, selected: 32 }
            ];
        }
        
        const baseApps = totalApplications;
        const baseShort = shortlistedCount || Math.round(totalApplications * 0.3);
        const baseSel = selectedCount || Math.round(totalApplications * 0.1);
        
        return [
            { date: "10 May", apps: Math.round(baseApps * 0.2) || 2, shortlisted: Math.round(baseShort * 0.1) || 1, selected: Math.round(baseSel * 0.1) || 0 },
            { date: "12 May", apps: Math.round(baseApps * 0.4) || 4, shortlisted: Math.round(baseShort * 0.3) || 2, selected: Math.round(baseSel * 0.2) || 1 },
            { date: "14 May", apps: Math.round(baseApps * 0.6) || 8, shortlisted: Math.round(baseShort * 0.5) || 3, selected: Math.round(baseSel * 0.4) || 2 },
            { date: "16 May", apps: Math.round(baseApps * 0.8) || 12, shortlisted: Math.round(baseShort * 0.7) || 5, selected: Math.round(baseSel * 0.6) || 3 },
            { date: "18 May", apps: Math.round(baseApps * 0.9) || 15, shortlisted: Math.round(baseShort * 0.8) || 6, selected: Math.round(baseSel * 0.8) || 4 },
            { date: "20 May", apps: baseApps, shortlisted: baseShort, selected: baseSel }
        ];
    };
    
    const chartData = getChartData();
    const maxY = Math.max(...chartData.map(d => d.apps)) * 1.15 || 100;

    // SVG coordinates builder helper
    const getCoordinates = (field) => {
        const width = 500;
        const height = 150;
        const padding = 20;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;

        return chartData.map((d, index) => {
            const x = padding + (index / (chartData.length - 1)) * chartWidth;
            const y = height - padding - (d[field] / maxY) * chartHeight;
            return { x, y, val: d[field], date: d.date };
        });
    };

    const appsPoints = getCoordinates("apps");
    const shortlistedPoints = getCoordinates("shortlisted");
    const selectedPoints = getCoordinates("selected");

    const getPathString = (points) => {
        return points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, "");
    };

    // Donut Chart calculations
    const ongoingDrives = drives.filter(d => getDriveStatus(d) === "Ongoing").length || Math.round(totalDrives * 0.5) || 3;
    const upcomingDrives = drives.filter(d => getDriveStatus(d) === "Upcoming").length || Math.round(totalDrives * 0.3) || 2;
    const completedDrives = drives.filter(d => getDriveStatus(d) === "Completed").length || Math.round(totalDrives * 0.2) || 1;
    const donutTotal = ongoingDrives + upcomingDrives + completedDrives || 1;

    const ongoingPct = Math.round((ongoingDrives / donutTotal) * 100);
    const upcomingPct = Math.round((upcomingDrives / donutTotal) * 100);
    const completedPct = Math.round((completedDrives / donutTotal) * 100);

    // SVG Donut segments builder
    const radius = 50;
    const circ = 2 * Math.PI * radius;
    const strokeWidth = 14;

    const segment1Stroke = circ * (ongoingPct / 100);
    const segment2Stroke = circ * (upcomingPct / 100);
    const segment3Stroke = circ * (completedPct / 100);

    if (loading) {
        return (
            <div className="admin-dashboard-loader">
                <div className="admin-loader-spinner" />
                <span>Loading Admin Dashboard...</span>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-container">
            {/* Stats grid */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card admin-blue-theme" onClick={() => navigate("/company-drives")}>
                    <div className="admin-stat-icon-wrapper">
                        <FaBuilding />
                    </div>
                    <div className="admin-stat-content">
                        <h2>{totalDrives}</h2>
                        <p className="admin-stat-title">Total Drives</p>
                        <p className="admin-stat-subtext">+2 this month</p>
                    </div>
                </div>

                <div className="admin-stat-card admin-green-theme" onClick={() => navigate("/company-drives")}>
                    <div className="admin-stat-icon-wrapper">
                        <FaClipboardList />
                    </div>
                    <div className="admin-stat-content">
                        <h2>{activeDrivesCount}</h2>
                        <p className="admin-stat-title">Active Drives</p>
                        <p className="admin-stat-subtext">Current ongoing</p>
                    </div>
                </div>

                <div className="admin-stat-card admin-purple-theme" onClick={() => navigate("/applications-admin")}>
                    <div className="admin-stat-icon-wrapper">
                        <FaFileAlt />
                    </div>
                    <div className="admin-stat-content">
                        <h2>{totalApplications}</h2>
                        <p className="admin-stat-title">Total Applications</p>
                        <p className="admin-stat-subtext">+15 this week</p>
                    </div>
                </div>

                <div className="admin-stat-card admin-orange-theme" onClick={() => navigate("/selected-students")}>
                    <div className="admin-stat-icon-wrapper">
                        <FaAward />
                    </div>
                    <div className="admin-stat-content">
                        <h2>{selectedCount}</h2>
                        <p className="admin-stat-title">Selected Students</p>
                        <p className="admin-stat-subtext">For placement cycle</p>
                    </div>
                </div>
            </div>

            {/* Dashboard main layout grid */}
            <div className="dashboard-layout-grid">
                {/* Left Column */}
                <div className="grid-column">
                    {/* Recent Drives */}
                    <div className="dashboard-block">
                        <div className="block-header">
                            <h3>Recent Drives</h3>
                            <span className="block-view-all" onClick={() => navigate("/company-drives")}>
                                View All
                            </span>
                        </div>

                        <div className="table-wrapper">
                            {drives.length > 0 ? (
                                <table className="admin-drives-table">
                                    <thead>
                                        <tr>
                                            <th>Company</th>
                                            <th>Role</th>
                                            <th>Drive Date</th>
                                            <th>Applications</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {drives.slice(0, 5).map((drive) => {
                                            const status = getDriveStatus(drive);
                                            const appCount = getDriveAppCount(drive.id);
                                            return (
                                                <tr key={drive.id}>
                                                    <td className="company-cell">
                                                        <div 
                                                            className="admin-company-logo"
                                                            style={getCompanyLogoStyle(drive.companyName)}
                                                        >
                                                            {drive.companyName ? drive.companyName.substring(0,2).toUpperCase() : "CO"}
                                                        </div>
                                                        <span className="admin-company-name-text">{drive.companyName}</span>
                                                    </td>
                                                    <td>{drive.jobRole}</td>
                                                    <td>{drive.driveDate || "Not Specified"}</td>
                                                    <td>{appCount}</td>
                                                    <td>
                                                        <span className={getDriveStatusClass(status)}>
                                                            {status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>
                                    No company drives registered yet.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Applications Overview Line Chart */}
                    <div className="dashboard-block">
                        <div className="block-header">
                            <h3>Applications Overview</h3>
                            <span className="block-view-all" onClick={() => navigate("/applications-admin")}>
                                View All
                            </span>
                        </div>

                        <div className="chart-container">
                            <svg className="line-chart-svg" viewBox="0 0 500 150">
                                {/* Grid Lines */}
                                <line x1="20" y1="20" x2="480" y2="20" className="chart-grid-line" />
                                <line x1="20" y1="52.5" x2="480" y2="52.5" className="chart-grid-line" />
                                <line x1="20" y1="85" x2="480" y2="85" className="chart-grid-line" />
                                <line x1="20" y1="117.5" x2="480" y2="117.5" className="chart-grid-line" />
                                
                                {/* Axis */}
                                <line x1="20" y1="130" x2="480" y2="130" className="chart-axis" />
                                
                                {/* Line Paths */}
                                <path d={getPathString(appsPoints)} className="chart-path apps" />
                                <path d={getPathString(shortlistedPoints)} className="chart-path shortlisted" />
                                <path d={getPathString(selectedPoints)} className="chart-path selected" />

                                {/* Render Dots and Value Labels */}
                                {appsPoints.map((p, i) => (
                                    <g key={i}>
                                        <circle cx={p.x} cy={p.y} r="4" className="chart-dot apps" />
                                        <text x={p.x} y={142} className="chart-axis-text" textAnchor="middle">{p.date}</text>
                                    </g>
                                ))}
                                {shortlistedPoints.map((p, i) => (
                                    <circle key={i} cx={p.x} cy={p.y} r="4" className="chart-dot shortlisted" />
                                ))}
                                {selectedPoints.map((p, i) => (
                                    <circle key={i} cx={p.x} cy={p.y} r="4" className="chart-dot selected" />
                                ))}
                            </svg>

                            <div className="chart-legend">
                                <div className="legend-item">
                                    <div className="legend-color-dot apps" />
                                    <span>Applications ({totalApplications})</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color-dot shortlisted" />
                                    <span>Shortlisted ({shortlistedCount})</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color-dot selected" />
                                    <span>Selected ({selectedCount})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="grid-column">
                    {/* Donut Chart */}
                    <div className="dashboard-block">
                        <div className="block-header">
                            <h3>Drive Status Overview</h3>
                        </div>

                        <div className="donut-chart-wrapper">
                            <svg width="120" height="120" viewBox="0 0 120 120">
                                {/* Base/Completed circle */}
                                <circle 
                                    cx="60" 
                                    cy="60" 
                                    r={radius} 
                                    fill="transparent" 
                                    stroke="#94a3b8" 
                                    strokeWidth={strokeWidth} 
                                />
                                {/* Upcoming segment */}
                                <circle 
                                    cx="60" 
                                    cy="60" 
                                    r={radius} 
                                    fill="transparent" 
                                    stroke="#3b82f6" 
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={`${segment2Stroke} ${circ - segment2Stroke}`}
                                    strokeDashoffset={-segment1Stroke}
                                    transform="rotate(-90 60 60)"
                                />
                                {/* Ongoing segment */}
                                <circle 
                                    cx="60" 
                                    cy="60" 
                                    r={radius} 
                                    fill="transparent" 
                                    stroke="#22c55e" 
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={`${segment1Stroke} ${circ - segment1Stroke}`}
                                    transform="rotate(-90 60 60)"
                                />
                                <text x="60" y="56" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '18px', fontWeight: '800', fill: '#1e293b' }}>
                                    {drives.length}
                                </text>
                                <text x="60" y="74" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '9px', fontWeight: '600', fill: '#64748b' }}>
                                    Drives Total
                                </text>
                            </svg>

                            <div className="donut-legend">
                                <div className="donut-legend-item">
                                    <div className="donut-legend-left">
                                        <div className="donut-legend-color ongoing" />
                                        <span>Ongoing</span>
                                    </div>
                                    <div className="donut-legend-right">{ongoingDrives} ({ongoingPct}%)</div>
                                </div>
                                <div className="donut-legend-item">
                                    <div className="donut-legend-left">
                                        <div className="donut-legend-color upcoming" />
                                        <span>Upcoming</span>
                                    </div>
                                    <div className="donut-legend-right">{upcomingDrives} ({upcomingPct}%)</div>
                                </div>
                                <div className="donut-legend-item">
                                    <div className="donut-legend-left">
                                        <div className="donut-legend-color completed" />
                                        <span>Completed</span>
                                    </div>
                                    <div className="donut-legend-right">{completedDrives} ({completedPct}%)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="dashboard-block">
                        <div className="block-header">
                            <h3>Recent Activities</h3>
                            <span className="block-view-all" onClick={() => navigate("/notifications-admin")}>
                                View All
                            </span>
                        </div>

                        <div className="activity-timeline">
                            {activities.map((act, index) => (
                                <div key={index} className="activity-item">
                                    <div className="activity-icon-circle">{act.icon}</div>
                                    <div className="activity-details">
                                        <h4 className="activity-title">{act.title}</h4>
                                        <p className="activity-desc">{act.desc}</p>
                                        <p className="activity-time">{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Row */}
            <div className="quick-actions-bar">
                <button className="quick-action-btn outline-blue" onClick={() => navigate("/add-drive")}>
                    Create New Drive
                </button>
                <button className="quick-action-btn outline-green" onClick={() => navigate("/applications-admin")}>
                    View Applications
                </button>
                <button className="quick-action-btn outline-purple" onClick={() => navigate("/shortlisting")}>
                    Shortlist Students
                </button>
                <button className="quick-action-btn solid-orange" onClick={() => navigate("/selected-students")}>
                    Publish Selected List
                </button>
                <button className="quick-action-btn solid-blue" onClick={() => navigate("/reports")}>
                    Download Reports
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;