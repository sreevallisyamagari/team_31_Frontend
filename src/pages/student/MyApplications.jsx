import toast from "react-hot-toast";
import "./MyApplications.css";

import { useEffect, useState } from "react";
import { getStudentApplications } from "../../services/ApplicationService";

import {
    FaClipboardCheck,
    FaSearch,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaAward,
    FaBuilding,
    FaBriefcase,
    FaMoneyBillWave,
    FaMapMarkerAlt,
    FaCalendarAlt
} from "react-icons/fa";

import { getCompanyLogoUrl } from "../../utils/logoUtils";

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const studentId = localStorage.getItem("userId");
            const response = await getStudentApplications(studentId);
            setApplications(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to Load Applications");
        }
    };

    const filteredApplications = applications.filter((app) => {
        const matchesStatus = 
            statusFilter === "ALL" || 
            (statusFilter === "PLACED" && (app.status.toLowerCase() === "selected" || app.status.toLowerCase() === "placed")) ||
            app.status.toUpperCase() === statusFilter;

        const companyName = app.drive?.companyName?.toLowerCase() || "";
        const role = app.drive?.jobRole?.toLowerCase() || "";
        const searchLower = search.toLowerCase();

        const matchesSearch = 
            app.id.toString().includes(searchLower) ||
            companyName.includes(searchLower) ||
            role.includes(searchLower);

        return matchesStatus && matchesSearch;
    });

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case "selected":
            case "placed":
                return "status selected";
            case "shortlisted":
                return "status shortlisted";
            case "rejected":
                return "status rejected";
            default:
                return "status applied";
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case "selected":
            case "placed":
                return <FaAward />;
            case "shortlisted":
                return <FaCheckCircle />;
            case "rejected":
                return <FaTimesCircle />;
            default:
                return <FaClock />;
        }
    };

    // Stat counts for filter badges
    const totalCount = applications.length;
    const appliedCount = applications.filter(a => a.status.toLowerCase() === "applied").length;
    const shortlistedCount = applications.filter(a => a.status.toLowerCase() === "shortlisted").length;
    const rejectedCount = applications.filter(a => a.status.toLowerCase() === "rejected").length;
    const placedCount = applications.filter(a => a.status.toLowerCase() === "selected" || a.status.toLowerCase() === "placed").length;

    return (
        <div className="applications-container">
            <div className="apps-page-header">
                <div>
                    <h1>My Applications</h1>
                    <p>Track and manage your placement drive applications in real-time.</p>
                </div>
            </div>

            {/* Filter Tabs (All, Applied, Shortlisted, Rejected, Placed) */}
            <div className="filter-tabs-wrapper">
                <div className="filter-tabs">
                    <button 
                        className={`tab-btn ${statusFilter === "ALL" ? "active" : ""}`}
                        onClick={() => setStatusFilter("ALL")}
                    >
                        All Applications <span className="tab-badge">{totalCount}</span>
                    </button>
                    <button 
                        className={`tab-btn ${statusFilter === "APPLIED" ? "active" : ""}`}
                        onClick={() => setStatusFilter("APPLIED")}
                    >
                        Applied <span className="tab-badge">{appliedCount}</span>
                    </button>
                    <button 
                        className={`tab-btn ${statusFilter === "SHORTLISTED" ? "active" : ""}`}
                        onClick={() => setStatusFilter("SHORTLISTED")}
                    >
                        Shortlisted <span className="tab-badge">{shortlistedCount}</span>
                    </button>
                    <button 
                        className={`tab-btn ${statusFilter === "PLACED" ? "active" : ""}`}
                        onClick={() => setStatusFilter("PLACED")}
                    >
                        Placed (Offers) <span className="tab-badge">{placedCount}</span>
                    </button>
                    <button 
                        className={`tab-btn ${statusFilter === "REJECTED" ? "active" : ""}`}
                        onClick={() => setStatusFilter("REJECTED")}
                    >
                        Rejected <span className="tab-badge">{rejectedCount}</span>
                    </button>
                </div>

                <div className="search-box">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search by company or role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="applications-grid">
                {filteredApplications.length > 0 ? (
                    filteredApplications.map((application) => {
                        const logo = getCompanyLogoUrl(application.drive?.logoUrl, application.drive?.companyName);
                        return (
                            <div className="application-card" key={application.id}>
                                <div className="card-top-bar">
                                    <div className="company-logo-group">
                                        {logo ? (
                                            <img src={logo} alt={application.drive?.companyName} className="app-company-logo" style={{ objectFit: 'contain', background: 'white', padding: '4px' }} />
                                        ) : (
                                            <div className="app-company-placeholder">
                                                <FaBuilding />
                                            </div>
                                        )}
                                        <div>
                                            <h2>{application.drive?.companyName || "Company Drive"}</h2>
                                            <p className="job-role-text">{application.drive?.jobRole || "Role N/A"}</p>
                                        </div>
                                    </div>
                                    <span className={getStatusClass(application.status)}>
                                        {getStatusIcon(application.status)}
                                        {application.status === "Selected" ? "Placed / Selected" : application.status}
                                    </span>
                                </div>

                                <div className="card-info-grid">
                                    <div>
                                        <span className="info-label"><FaMoneyBillWave className="text-green" /> Package</span>
                                        <span className="info-val">{application.drive?.packageOffered ? `${application.drive.packageOffered} LPA` : "N/A"}</span>
                                    </div>
                                    <div>
                                        <span className="info-label"><FaMapMarkerAlt className="text-blue" /> Location</span>
                                        <span className="info-val">{application.drive?.location || "N/A"}</span>
                                    </div>
                                    <div>
                                        <span className="info-label"><FaCalendarAlt className="text-orange" /> Applied Date</span>
                                        <span className="info-val">{application.appliedDate || application.drive?.driveDate || "N/A"}</span>
                                    </div>
                                    <div>
                                        <span className="info-label"><FaClipboardCheck className="text-purple" /> Application ID</span>
                                        <span className="info-val">#{application.id}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-data-card">
                        <h3>No Applications Found</h3>
                        <p>No applications match your current status filter or search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyApplications;
