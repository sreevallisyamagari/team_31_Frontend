import { useEffect, useState } from "react";
import {
    getApplicationsByStatus,
    updateStatus
} from "../../services/ApplicationService";

import {
    FaUserGraduate,
    FaBuilding,
    FaBriefcase,
    FaFilePdf,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

import "./Shortlisting.css";

function Shortlisting() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            const response = await getApplicationsByStatus("Applied");

            setApplications(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const shortlist = async (id) => {

        await updateStatus(id, "Shortlisted");

        loadApplications();

    };

    const reject = async (id) => {

        await updateStatus(id, "Rejected");

        loadApplications();

    };

    return (

        <div className="shortlisting-container">

            <div className="shortlisting-header">

                <div>

                    <h1>Shortlisting</h1>

                    <p>
                        Review student applications and shortlist eligible candidates.
                    </p>

                </div>

            </div>

            {

                applications.length === 0 ?

                    <div className="empty-card">

                        <h3>No Applications Available</h3>

                        <p>
                            There are no pending applications for shortlisting.
                        </p>

                    </div>

                    :

                    <div className="shortlisting-grid">

                        {

                            applications.map((application) => (

                                <div
                                    key={application.id}
                                    className="shortlisting-card"
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

                                    <div className="status-badge">

                                        Applied

                                    </div>

                                    <div className="action-buttons">

                                        <button
                                            className="shortlist-btn"
                                            onClick={() => shortlist(application.id)}
                                        >

                                            <FaCheckCircle />

                                            Shortlist

                                        </button>

                                        <button
                                            className="reject-btn"
                                            onClick={() => reject(application.id)}
                                        >

                                            <FaTimesCircle />

                                            Reject

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

}

export default Shortlisting;