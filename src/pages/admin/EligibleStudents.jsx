import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllDrives,
    getDriveById
} from "../../services/DriveService";
import { getEligibleStudents } from "../../services/EligibleStudentService";

import {
    FaBuilding,
    FaSearch,
    FaMoneyBillWave,
    FaGraduationCap,
    FaBook,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaUserGraduate,
    FaFilePdf,
    FaEye,
    FaEnvelope
} from "react-icons/fa";

import "./EligibleStudents.css";

function EligibleStudents() {
    const navigate = useNavigate();

    const [drives, setDrives] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedDrive, setSelectedDrive] = useState("");
    const [drive, setDrive] = useState(null);

    useEffect(() => {
        loadDrives();
    }, []);

    const loadDrives = async () => {
        try {
            const response = await getAllDrives();
            setDrives(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const searchEligibleStudents = async () => {
        if (selectedDrive === "") {
            toast.error("Please select a company drive.");
            return;
        }

        try {
            const driveResponse = await getDriveById(selectedDrive);
            setDrive(driveResponse.data);

            const studentResponse = await getEligibleStudents(selectedDrive);
            setStudents(studentResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="eligible-container">
            <div className="eligible-header">
                <div>
                    <h1>Eligible Students</h1>
                    <p>Find students eligible for a selected placement drive criteria.</p>
                </div>
            </div>

            <div className="search-card">
                <select
                    value={selectedDrive}
                    onChange={(e) => setSelectedDrive(e.target.value)}
                >
                    <option value="">Select Company Drive</option>
                    {drives.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.companyName} - {d.jobRole}
                        </option>
                    ))}
                </select>

                <button onClick={searchEligibleStudents}>
                    <FaSearch /> Search Eligible
                </button>
            </div>

            {drive && (
                <div className="drive-details-banner">
                    <div className="drive-banner-header">
                        {drive.logoUrl ? (
                            <img src={drive.logoUrl} alt={drive.companyName} className="drive-banner-logo" />
                        ) : (
                            <FaBuilding className="drive-banner-icon" />
                        )}
                        <div>
                            <h2>{drive.companyName} - <span className="role-text">{drive.jobRole}</span></h2>
                            <p>{drive.employmentType || 'Full-Time'} • {drive.location}</p>
                        </div>
                    </div>
                    <div className="drive-banner-grid">
                        <div><strong>Package:</strong> {drive.packageOffered} LPA</div>
                        <div><strong>Min CGPA:</strong> {drive.minCgpa}</div>
                        <div><strong>Max Backlogs:</strong> {drive.maxBacklogs}</div>
                        <div><strong>Dept:</strong> {drive.department}</div>
                        <div><strong>Drive Date:</strong> {drive.driveDate}</div>
                    </div>
                </div>
            )}

            <div className="eligible-sub-header">
                <h2>Eligible Candidates ({students.length})</h2>
            </div>

            {students.length === 0 ? (
                <div className="empty-card">
                    <h3>No Eligible Students Found</h3>
                    <p>Select a company drive above to query eligible students based on criteria.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="admin-eligible-table">
                        <thead>
                            <tr>
                                <th>Student Details</th>
                                <th>Contact</th>
                                <th>Academic Metrics</th>
                                <th>Resume</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>
                                        <div className="student-info-col">
                                            {student.profilePictureUrl ? (
                                                <img src={student.profilePictureUrl} alt={student.name} className="avatar-mini" />
                                            ) : (
                                                <div className="avatar-placeholder-mini">
                                                    {student.name ? student.name.charAt(0).toUpperCase() : "S"}
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
                                        <button
                                            className="view-details-btn"
                                            onClick={() => navigate(`/student-details/${student.id}`)}
                                        >
                                            <FaEye /> View
                                        </button>
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

export default EligibleStudents;
