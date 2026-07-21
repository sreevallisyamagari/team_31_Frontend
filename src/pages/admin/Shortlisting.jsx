import { useEffect, useState } from "react";
import {
    getApplicationsByStatus,
    updateStatus,
    bulkUpdateStatus
} from "../../services/ApplicationService";
import { getDrives } from "../../services/DriveService";

import {
    FaUserGraduate,
    FaBuilding,
    FaBriefcase,
    FaFilePdf,
    FaCheckCircle,
    FaTimesCircle,
    FaSearch,
    FaFilter,
    FaCheckSquare
} from "react-icons/fa";

import toast from "react-hot-toast";
import "./Shortlisting.css";

function Shortlisting() {
    const [applications, setApplications] = useState([]);
    const [drives, setDrives] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState("all");
    const [search, setSearch] = useState("");
    const [selectedApps, setSelectedApps] = useState([]);

    useEffect(() => {
        loadApplications();
        loadDrives();
    }, []);

    const loadApplications = async () => {
        try {
            const response = await getApplicationsByStatus("Applied");
            setApplications(response.data);
        } catch (error) {
            toast.error("Failed to load applications for shortlisting");
        }
    };

    const loadDrives = async () => {
        try {
            const response = await getDrives();
            setDrives(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const shortlist = async (id) => {
        try {
            await updateStatus(id, "Shortlisted");
            toast.success("Student Shortlisted");
            loadApplications();
        } catch (error) {
            toast.error("Failed to shortlist student");
        }
    };

    const reject = async (id) => {
        try {
            await updateStatus(id, "Rejected");
            toast.success("Application Rejected");
            loadApplications();
        } catch (error) {
            toast.error("Failed to reject application");
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedApps(filteredApplications.map(app => app.id));
        } else {
            setSelectedApps([]);
        }
    };

    const handleSelectOne = (id) => {
        if (selectedApps.includes(id)) {
            setSelectedApps(selectedApps.filter(appId => appId !== id));
        } else {
            setSelectedApps([...selectedApps, id]);
        }
    };

    const handleBulkStatusChange = async (status) => {
        if (selectedApps.length === 0) {
            toast.error("Please select at least one application.");
            return;
        }

        try {
            await bulkUpdateStatus(selectedApps, status);
            toast.success(`Successfully updated ${selectedApps.length} applications to ${status}`);
            setSelectedApps([]);
            loadApplications();
        } catch (error) {
            toast.error("Bulk update failed.");
        }
    };

    const filteredApplications = applications.filter(app => {
        const matchesCompany = selectedCompanyId === "all" || (app.drive && app.drive.id.toString() === selectedCompanyId);
        const searchLower = search.toLowerCase();
        const matchesSearch = (app.student?.name?.toLowerCase() || "").includes(searchLower) || 
                              (app.drive?.jobRole?.toLowerCase() || "").includes(searchLower);
        return matchesCompany && matchesSearch;
    });

    return (
        <div className="shortlisting-container">
            <div className="shortlisting-header">
                <div>
                    <h1>Shortlisting Candidate Pool</h1>
                    <p>Review pending applications and shortlist candidates for upcoming drive rounds.</p>
                </div>
                <div className="pending-count">
                    Pending Review: <span>{applications.length}</span>
                </div>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <FaSearch />
                    <input 
                        type="text" 
                        placeholder="Search student or role..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                
                <div className="filter-group">
                    <FaFilter />
                    <label>Filter Drive:</label>
                    <select 
                        value={selectedCompanyId} 
                        onChange={(e) => {
                            setSelectedCompanyId(e.target.value);
                            setSelectedApps([]);
                        }}
                    >
                        <option value="all">All Drives</option>
                        {drives.map(drive => (
                            <option key={drive.id} value={drive.id}>
                                {drive.companyName} - {drive.jobRole}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {selectedApps.length > 0 && (
                <div className="bulk-actions-bar">
                    <div className="selection-info">
                        <FaCheckSquare className="icon" />
                        <span>{selectedApps.length} Applications Selected</span>
                    </div>
                    
                    <div className="actions-group">
                        <button 
                            className="bulk-shortlist-btn"
                            onClick={() => handleBulkStatusChange("Shortlisted")}
                        >
                            <FaCheckCircle /> Shortlist Selected
                        </button>
                        <button 
                            className="bulk-reject-btn"
                            onClick={() => handleBulkStatusChange("Rejected")}
                        >
                            <FaTimesCircle /> Reject Selected
                        </button>
                    </div>
                </div>
            )}

            {filteredApplications.length === 0 ? (
                <div className="empty-card">
                    <h3>No Pending Applications</h3>
                    <p>There are no pending applications waiting for shortlisting decision.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="admin-shortlist-table">
                        <thead>
                            <tr>
                                <th>
                                    <input 
                                        type="checkbox" 
                                        onChange={handleSelectAll} 
                                        checked={selectedApps.length === filteredApplications.length && filteredApplications.length > 0} 
                                    />
                                </th>
                                <th>Student</th>
                                <th>Company & Job Role</th>
                                <th>Resume</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplications.map((application) => (
                                <tr key={application.id} className={selectedApps.includes(application.id) ? "selected-row" : ""}>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedApps.includes(application.id)}
                                            onChange={() => handleSelectOne(application.id)}
                                        />
                                    </td>
                                    <td>
                                        <div className="student-info-col">
                                            {application.student.profilePictureUrl ? (
                                                <img 
                                                    src={application.student.profilePictureUrl} 
                                                    alt={application.student.name} 
                                                    className="avatar-mini" 
                                                />
                                            ) : (
                                                <div className="avatar-placeholder-mini">
                                                    {application.student.name ? application.student.name.charAt(0).toUpperCase() : "S"}
                                                </div>
                                            )}
                                            <div>
                                                <strong>{application.student.name}</strong>
                                                <span className="small-text">
                                                    {application.student.department} • CGPA: {application.student.cgpa}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="drive-info">
                                            <strong>{application.drive.companyName}</strong>
                                            <span className="small-text">{application.drive.jobRole}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {application.student.resume ? (
                                            <a
                                                href={application.student.resume}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="resume-link"
                                            >
                                                <FaFilePdf /> View
                                            </a>
                                        ) : (
                                            <span className="no-resume">No Resume</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="action-buttons-row">
                                            <button
                                                className="shortlist-btn"
                                                onClick={() => shortlist(application.id)}
                                            >
                                                <FaCheckCircle /> Shortlist
                                            </button>
                                            <button
                                                className="reject-btn"
                                                onClick={() => reject(application.id)}
                                            >
                                                <FaTimesCircle /> Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Shortlisting;