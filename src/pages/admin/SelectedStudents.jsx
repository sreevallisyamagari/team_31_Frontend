import { useEffect, useState } from "react";
import { getApplicationsByStatus } from "../../services/ApplicationService";

import {
    FaUserGraduate,
    FaBuilding,
    FaBriefcase,
    FaGraduationCap,
    FaPhone,
    FaFilePdf,
    FaTrophy
} from "react-icons/fa";

import "./SelectedStudents.css";

function SelectedStudents() {

    const [students, setStudents] = useState([]);

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

    return (

        <div className="selected-container">

            <div className="selected-header">

                <div>

                    <h1>Selected Students</h1>

                    <p>
                        Congratulations to students who have successfully secured placement offers.
                    </p>

                </div>

            </div>

            {

                students.length === 0 ?

                    <div className="empty-card">

                        <h3>No Selected Students</h3>

                        <p>
                            Selected students will appear here once the recruitment process is completed.
                        </p>

                    </div>

                    :

                    <div className="selected-grid">

                        {

                            students.map((application) => (

                                <div
                                    key={application.id}
                                    className="selected-card"
                                >

                                    <div className="student-title">

                                        <FaUserGraduate />

                                        <h2>

                                            {application.student.name}

                                        </h2>

                                    </div>

                                    <p>

                                        <FaBuilding />

                                        <strong>Company :</strong>

                                        {application.drive.companyName}

                                    </p>

                                    <p>

                                        <FaBriefcase />

                                        <strong>Job Role :</strong>

                                        {application.drive.jobRole}

                                    </p>

                                    <p>

                                        <FaGraduationCap />

                                        <strong>Department :</strong>

                                        {application.student.department}

                                    </p>

                                    <p>

                                        <FaGraduationCap />

                                        <strong>CGPA :</strong>

                                        {application.student.cgpa}

                                    </p>

                                    <p>

                                        <FaPhone />

                                        <strong>Phone :</strong>

                                        {application.student.phone}

                                    </p>

                                    <div className="resume-section">

                                        {

                                            application.student.resume ?

                                                <a
                                                    href={`http://localhost:8080/uploads/${application.student.resume}`}
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

                                    </div>

                                    <div className="selected-badge">

                                        <FaTrophy />

                                        Selected

                                    </div>

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

}

export default SelectedStudents;