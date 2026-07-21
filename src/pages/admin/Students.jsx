import { useEffect, useState } from "react";
import {
    getAllStudents,
    deleteStudent
} from "../../services/AdminService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    FaUserGraduate,
    FaEnvelope,
    FaGraduationCap,
    FaStar,
    FaFilePdf,
    FaEdit,
    FaTrashAlt,
    FaSearch,
    FaDownload,
    FaFilter
} from "react-icons/fa";

import "./Students.css";

function Students() {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [branchFilter, setBranchFilter] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const response = await getAllStudents();
            setStudents(response.data);
        } catch (error) {
            toast.error("Failed to load students");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this student?");
        if (!confirmDelete) return;

        try {
            await deleteStudent(id);
            toast.success("Student Deleted Successfully");
            loadStudents();
        } catch (error) {
            toast.error("Failed to delete student");
        }
    };
    
    // Get unique branches for filter
    const branches = ["All", ...new Set(students.map(s => s.department).filter(Boolean))];

    const filteredStudents = students.filter(student => {
        const searchMatch = (student.name?.toLowerCase() || "").includes(search.toLowerCase()) || 
                            (student.email?.toLowerCase() || "").includes(search.toLowerCase());
        const branchMatch = branchFilter === "All" || student.department === branchFilter;
        return searchMatch && branchMatch;
    });

    const exportToCSV = () => {
        if (filteredStudents.length === 0) {
            toast.error("No students to export");
            return;
        }

        const headers = ["ID", "Name", "Email", "Phone", "Department", "CGPA", "Backlogs"];
        const csvRows = [];
        csvRows.push(headers.join(","));

        filteredStudents.forEach(student => {
            const row = [
                student.id,
                `"${student.name || ""}"`,
                `"${student.email || ""}"`,
                `"${student.phone || ""}"`,
                `"${student.department || ""}"`,
                student.cgpa || 0,
                student.backlogs || 0
            ];
            csvRows.push(row.join(","));
        });

        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("hidden", "");
        a.setAttribute("href", url);
        a.setAttribute("download", "students_export.csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("Export successful");
    };

    return (
        <div className="students-container">
            <div className="students-header">
                <div>
                    <h1>Manage Students</h1>
                    <p>View, edit and manage all registered students.</p>
                </div>
                <div className="student-actions">
                    <button className="export-btn" onClick={exportToCSV}>
                        <FaDownload /> Export CSV
                    </button>
                    <div className="student-count">
                        Total Students: <span>{students.length}</span>
                    </div>
                </div>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <FaSearch />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                
                <div className="filter-group">
                    <FaFilter />
                    <label>Department:</label>
                    <select 
                        value={branchFilter} 
                        onChange={(e) => setBranchFilter(e.target.value)}
                    >
                        {branches.map(branch => (
                            <option key={branch} value={branch}>{branch}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredStudents.length === 0 ? (
                <div className="empty-card">
                    <h3>No Students Found</h3>
                    <p>No students match your current filters.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="admin-students-table">
                        <thead>
                            <tr>
                                <th>Student details</th>
                                <th>Contact Info</th>
                                <th>Academic Info</th>
                                <th>Resume</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student.id}>
                                    <td>
                                        <div className="student-info-col">
                                            {student.profilePictureUrl ? (
                                                <img src={student.profilePictureUrl} alt={student.name} className="avatar-mini" />
                                            ) : (
                                                <div className="avatar-placeholder-mini">
                                                    {student.name ? student.name.substring(0, 1).toUpperCase() : "U"}
                                                </div>
                                            )}
                                            <div>
                                                <strong>{student.name}</strong>
                                                <span className="small-text">ID: {student.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="contact-info">
                                            <span><FaEnvelope className="icon" /> {student.email}</span>
                                            {student.phone && <span className="small-text">{student.phone}</span>}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="academic-info">
                                            <span><strong>{student.department}</strong></span>
                                            <span className="small-text">CGPA: {student.cgpa} | Backlogs: {Math.max(0, student.backlogs || 0)}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {student.resume ? (
                                            <a
                                                href={student.resume}
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
                                                className="edit-btn-icon"
                                                title="Edit"
                                                onClick={() => navigate(`/edit-student/${student.id}`)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="delete-btn-icon"
                                                title="Delete"
                                                onClick={() => handleDelete(student.id)}
                                            >
                                                <FaTrashAlt />
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

export default Students;