import { useEffect, useState } from "react";
import {
    getAllApplications,
    updateStatus,
    bulkUpdateStatus
} from "../../services/ApplicationService";
import { getAllDrives } from "../../services/DriveService";

import {
    FaUserGraduate,
    FaBuilding,
    FaBriefcase,
    FaFilePdf,
    FaClipboardCheck,
    FaSearch,
    FaCheckSquare
} from "react-icons/fa";

import toast from "react-hot-toast";
import "./ManageApplications.css";

function ManageApplications() {

    const [applications, setApplications] = useState([]);
    const [drives, setDrives] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState("all");
    const [search, setSearch] = useState("");
    const [selectedApps, setSelectedApps] = useState([]);
    const [bulkAction, setBulkAction] = useState("");

    useEffect(() => {
        loadApplications();
        loadDrives();
    }, []);

    const loadApplications = async () => {
        try {
            const response = await getAllApplications();
            setApplications(response.data);
        } catch (error) {
            toast.error("Failed to load applications");
        }
    };
    
    const loadDrives = async () => {
        try {
            const response = await getAllDrives();
            setDrives(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const changeStatus = async (id, status) => {
        try {
            await updateStatus(id, status);
            toast.success("Status Updated Successfully");
            loadApplications();
        } catch (error) {
            toast.error("Failed to update status");
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
    
    const handleBulkAction = async () => {
        if (selectedApps.length === 0) {
            toast.error("Please select at least one application.");
            return;
        }
        if (!bulkAction) {
            toast.error("Please select a bulk action.");
            return;
        }
        
        try {
            await bulkUpdateStatus(selectedApps, bulkAction);
            toast.success(`Successfully updated ${selectedApps.length} applications to ${bulkAction}`);
            setSelectedApps([]);
            setBulkAction("");
            loadApplications();
        } catch (error) {
            toast.error("Bulk update failed.");
        }
    };

    const filteredApplications = applications.filter(app => {
        const matchesCompany = selectedCompanyId === "all" || (app.drive && app.drive.id.toString() === selectedCompanyId);
        const searchLower = search.toLowerCase();
        const matchesSearch = app.student.name.toLowerCase().includes(searchLower) || 
                              (app.drive && app.drive.jobRole.toLowerCase().includes(searchLower));
        return matchesCompany && matchesSearch;
    });

    return (
        <div className="manage-applications">
            <div className="applications-header">
                <div>
                    <h1>Manage Applications</h1>
                    <p>Review student applications and update their placement status.</p>
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
                    <label>Filter by Drive:</label>
                    <select 
                        value={selectedCompanyId} 
                        onChange={(e) => {
                            setSelectedCompanyId(e.target.value);
                            setSelectedApps([]); // Reset selections on filter change
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
            
            <div className="bulk-actions-bar">
                <div className="selection-info">
                    <FaCheckSquare className="icon" />
                    <span>{selectedApps.length} Applications Selected</span>
                </div>
                
                <div className="actions-group">
                    <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)}>
                        <option value="">-- Select Action --</option>
                        <option value="Shortlisted">Shortlist Selected</option>
                        <option value="Selected">Mark as Selected (Offer)</option>
                        <option value="Rejected">Reject Selected</option>
                    </select>
                    <button 
                        className="apply-bulk-btn"
                        onClick={handleBulkAction}
                        disabled={selectedApps.length === 0 || !bulkAction}
                    >
                        Apply Bulk Action
                    </button>
                </div>
            </div>

            {filteredApplications.length === 0 ? (
                <div className="no-applications">
                    <h3>No Applications Found</h3>
                    <p>Try adjusting your filters or search.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="admin-apps-table">
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
                                <th>Company & Role</th>
                                <th>Resume</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplications.map(application => (
                                <tr key={application.id} className={selectedApps.includes(application.id) ? "selected-row" : ""}>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedApps.includes(application.id)}
                                            onChange={() => handleSelectOne(application.id)}
                                        />
                                    </td>
                                    <td>
                                        <div className="student-info">
                                            <strong>{application.student.name}</strong>
                                            <span className="small-text">{application.student.department} • CGPA: {application.student.cgpa}</span>
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
                                        <span className={`status-badge ${application.status.toLowerCase().replace(' ', '-')}`}>
                                            {application.status}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            className="action-select"
                                            value={application.status}
                                            onChange={(e) => changeStatus(application.id, e.target.value)}
                                        >
                                            <option value="Applied">Applied</option>
                                            <option value="Shortlisted">Shortlisted</option>
                                            <option value="Selected">Selected</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
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

export default ManageApplications;