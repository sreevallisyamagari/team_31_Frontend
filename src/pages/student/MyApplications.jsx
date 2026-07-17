import "./MyApplications.css";

import { useEffect, useState } from "react";
import { getStudentApplications } from "../../services/ApplicationService";

import {
    FaClipboardCheck,
    FaSearch,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaAward
} from "react-icons/fa";

function MyApplications() {

    const [applications, setApplications] = useState([]);
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

            alert("Failed to Load Applications");

        }

    };

    const filteredApplications = applications.filter((application) =>
        application.id.toString().includes(search) ||
        application.driveId.toString().includes(search) ||
        application.status.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusClass = (status) => {

        switch (status.toLowerCase()) {

            case "selected":
                return "status selected";

            case "shortlisted":
                return "status shortlisted";

            case "rejected":
                return "status rejected";

            default:
                return "status pending";
        }

    };

    const getStatusIcon = (status) => {

        switch (status.toLowerCase()) {

            case "selected":
                return <FaAward />;

            case "shortlisted":
                return <FaCheckCircle />;

            case "rejected":
                return <FaTimesCircle />;

            default:
                return <FaClock />;
        }

    };

    return (

        <div className="applications-container">

            <h1>My Applications</h1>

            <p>Track all your placement applications in one place.</p>

            <div className="search-box">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search by Application ID, Drive ID or Status..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="applications-grid">

                {

                    filteredApplications.length > 0 ? (

                        filteredApplications.map((application) => (

                            <div
                                className="application-card"
                                key={application.id}
                            >

                                <div className="application-header">

                                    <FaClipboardCheck className="application-icon"/>

                                    <div>

                                        <h2>Application #{application.id}</h2>

                                        <p>Drive ID : {application.driveId}</p>

                                    </div>

                                </div>

                                <div className="application-body">

                                    <div>

                                        <strong>Application ID</strong>

                                        <span>{application.id}</span>

                                    </div>

                                    <div>

                                        <strong>Drive ID</strong>

                                        <span>{application.driveId}</span>

                                    </div>

                                    <div>

                                        <strong>Status</strong>

                                        <span className={getStatusClass(application.status)}>

                                            {getStatusIcon(application.status)}

                                            {application.status}

                                        </span>

                                    </div>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="no-data">

                            No Applications Found

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default MyApplications;