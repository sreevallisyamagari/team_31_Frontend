import { useEffect, useState } from "react";
import {
    getAllApplications,
    updateStatus
} from "../../services/ApplicationService";

import {
    FaUserGraduate,
    FaBuilding,
    FaBriefcase,
    FaFilePdf,
    FaClipboardCheck
} from "react-icons/fa";

import "./ManageApplications.css";

function ManageApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            const response = await getAllApplications();

            setApplications(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const changeStatus = async (id, status) => {

        try {

            await updateStatus(id, status);

            alert("Status Updated Successfully");

            loadApplications();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="manage-applications">

            <div className="applications-header">

                <div>

                    <h1>Manage Applications</h1>

                    <p>
                        Review student applications and update their placement status.
                    </p>

                </div>

            </div>

            {

                applications.length === 0 ?

                    <div className="no-applications">

                        <h3>No Applications Found</h3>

                        <p>
                            Student applications will appear here.
                        </p>

                    </div>

                    :

                    <div className="applications-grid">

                        {

                            applications.map(application => (

                                <div
                                    key={application.id}
                                    className="application-card"
                                >

                                    <div className="card-title">

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

                                        <strong>Role :</strong>

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

                                    <div className="status-section">

                                        <span className={`status ${application.status.toLowerCase()}`}>

                                            <FaClipboardCheck />

                                            {application.status}

                                        </span>

                                    </div>

                                    <div className="select-section">

                                        <label>

                                            Change Status

                                        </label>

                                        <select
                                            value={application.status}
                                            onChange={(e) =>
                                                changeStatus(
                                                    application.id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="Applied">
                                                Applied
                                            </option>

                                            <option value="Shortlisted">
                                                Shortlisted
                                            </option>

                                            <option value="Selected">
                                                Selected
                                            </option>

                                            <option value="Rejected">
                                                Rejected
                                            </option>

                                        </select>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

}

export default ManageApplications;