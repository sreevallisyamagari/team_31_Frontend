import { useEffect, useState } from "react";
import { getApplicationsByStatus } from "../../services/ApplicationService";

import {
    FaUserGraduate,
    FaBuilding,
    FaBriefcase,
    FaGraduationCap,
    FaPhone,
    FaEnvelope,
    FaFilePdf,
    FaTrophy,
    FaSearch,
    FaFilter
} from "react-icons/fa";

import "./SelectedStudents.css";

function SelectedStudents() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [companyFilter, setCompanyFilter] = useState("All");

    useEffect(() => {
        loadSelectedStudents();
    }, []);

    const loadSelectedStudents = async () => {
        try {
            const response = await getApplicationsByStatus("Selected");
            setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Extract unique company names for filter
    const companies = ["All", ...new Set(students.map(app => app.drive?.companyName).filter(Boolean))];

    const filteredStudents = students.filter(app => {
        const studentName = app.student?.name?.toLowerCase() || "";
        const companyName = app.drive?.companyName?.toLowerCase() || "";
        const role = app.drive?.jobRole?.toLowerCase() || "";
        const searchLower = search.toLowerCase();

        const matchesSearch = studentName.includes(searchLower) || companyName.includes(searchLower) || role.includes(searchLower);
        const matchesCompany = companyFilter === "All" || app.drive?.companyName === companyFilter;

        return matchesSearch && matchesCompany;
    });

    return (
        <div className="selected-container">
            <div className="selected-header">
                <div>
                    <h1>Selected Students</h1>
                    <p>Congratulations to students who have successfully secured placement offers.</p>
                </div>
                <div className="selected-count">
                    Total Hired: <span>{students.length}</span>
                </div>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <FaSearch />
                    <input 
                        type="text" 
                        placeholder="Search by student, company, or role..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                
                <div className="filter-group">
                    <FaFilter />
                    <label>Filter Company:</label>
                    <select 
                        value={companyFilter} 
                        onChange={(e) => setCompanyFilter(e.target.value)}
                    >
                        {companies.map(comp => (
                            <option key={comp} value={comp}>{comp}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredStudents.length === 0 ? (
                <div className="empty-card">
                    <h3>No Selected Students</h3>
                    <p>Selected students will appear here once recruitment results are published.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="admin-selected-table">
                        <thead>
                            <tr>
                                <th>Student Details</th>
                                <th>Company & Job Role</th>
                                <th>Contact Details</th>
                                <th>Resume</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((application) => (
                                <tr key={application.id}>
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
                                        <div className="contact-info">
                                            <span><FaEnvelope className="icon" /> {application.student.email}</span>
                                            {application.student.phone && (
                                                <span className="small-text"><FaPhone className="icon" /> {application.student.phone}</span>
                                            )}
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
                                        <span className="selected-status-badge">
                                            <FaTrophy /> Selected
                                        </span>
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

export default SelectedStudents;