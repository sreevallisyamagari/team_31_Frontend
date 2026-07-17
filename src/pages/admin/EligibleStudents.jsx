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
    FaEye
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

            alert("Please select a company drive.");

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

                    <p>
                        Find students eligible for a selected placement drive.
                    </p>

                </div>

            </div>

            <div className="search-card">

                <select
                    value={selectedDrive}
                    onChange={(e) => setSelectedDrive(e.target.value)}
                >

                    <option value="">
                        Select Company Drive
                    </option>

                    {

                        drives.map((drive) => (

                            <option
                                key={drive.id}
                                value={drive.id}
                            >

                                {drive.companyName} - {drive.jobRole}

                            </option>

                        ))

                    }

                </select>

                <button
                    onClick={searchEligibleStudents}
                >

                    <FaSearch />

                    Search

                </button>

            </div>

            {

                drive && (

                    <div className="drive-details">

                        <div className="drive-title">

                            <FaBuilding />

                            <h2>

                                {drive.companyName}

                            </h2>

                        </div>

                        <p>

                            <strong>Role :</strong>

                            {drive.jobRole}

                        </p>

                        <p>

                            <FaMoneyBillWave />

                            <strong>Package :</strong>

                            {drive.packageOffered} LPA

                        </p>

                        <p>

                            <FaGraduationCap />

                            <strong>Department :</strong>

                            {drive.department}

                        </p>

                        <p>

                            <FaGraduationCap />

                            <strong>Minimum CGPA :</strong>

                            {drive.minCgpa}

                        </p>

                        <p>

                            <FaBook />

                            <strong>Maximum Backlogs :</strong>

                            {drive.maxBacklogs}

                        </p>

                        <p>

                            <FaCalendarAlt />

                            <strong>Drive Date :</strong>

                            {drive.driveDate}

                        </p>

                        <p>

                            <FaMapMarkerAlt />

                            <strong>Location :</strong>

                            {drive.location}

                        </p>

                    </div>

                )

            }

            <h2 className="student-count">

                Eligible Students ({students.length})

            </h2>

            {

                students.length === 0 ?

                    <div className="empty-card">

                        <h3>No Eligible Students Found</h3>

                        <p>

                            Select a company drive to view eligible students.

                        </p>

                    </div>

                    :

                    <div className="students-grid">

                        {

                            students.map(student => (

                                <div
                                    key={student.id}
                                    className="student-card"
                                >

                                    <div className="student-title">

                                        <FaUserGraduate />

                                        <h3>

                                            {student.name}

                                        </h3>

                                    </div>

                                    <p>

                                        <strong>Department :</strong>

                                        {student.department}

                                    </p>

                                    <p>

                                        <strong>CGPA :</strong>

                                        {student.cgpa}

                                    </p>

                                    <p>

                                        <strong>Backlogs :</strong>

                                        {student.backlogs}

                                    </p>

                                    {

                                        student.resume ?

                                            <a
                                                href={`http://localhost:8080/uploads/${student.resume}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="resume-btn"
                                            >

                                                <FaFilePdf />

                                                View Resume

                                            </a>

                                            :

                                            <span className="no-resume">

                                                No Resume Uploaded

                                            </span>

                                    }

                                    <button
                                        className="view-btn"
                                        onClick={() =>
                                            navigate(`/student-details/${student.id}`)
                                        }
                                    >

                                        <FaEye />

                                        View Details

                                    </button>

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

}

export default EligibleStudents;