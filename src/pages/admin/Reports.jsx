import { useEffect, useState } from "react";
import { getReport } from "../../services/ReportService";

import {
    FaUsers,
    FaBuilding,
    FaClipboardList,
    FaPaperPlane,
    FaUserCheck,
    FaTrophy,
    FaTimesCircle
} from "react-icons/fa";

import "./Reports.css";

function Reports() {

    const [report, setReport] = useState({});

    useEffect(() => {
        loadReport();
    }, []);

    const loadReport = async () => {

        try {

            const response = await getReport();

            setReport(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="reports-container">

            <div className="reports-header">

                <div>

                    <h1>Reports & Analytics</h1>

                    <p>
                        View overall placement statistics and recruitment progress.
                    </p>

                </div>

            </div>

            <div className="reports-grid">

                <div className="report-card">

                    <FaUsers className="report-icon" />

                    <h3>Total Students</h3>

                    <h2>{report.totalStudents || 0}</h2>

                </div>

                <div className="report-card">

                    <FaBuilding className="report-icon" />

                    <h3>Total Drives</h3>

                    <h2>{report.totalDrives || 0}</h2>

                </div>

                <div className="report-card">

                    <FaClipboardList className="report-icon" />

                    <h3>Total Applications</h3>

                    <h2>{report.totalApplications || 0}</h2>

                </div>

                <div className="report-card applied">

                    <FaPaperPlane className="report-icon" />

                    <h3>Applied</h3>

                    <h2>{report.applied || 0}</h2>

                </div>

                <div className="report-card shortlisted">

                    <FaUserCheck className="report-icon" />

                    <h3>Shortlisted</h3>

                    <h2>{report.shortlisted || 0}</h2>

                </div>

                <div className="report-card selected">

                    <FaTrophy className="report-icon" />

                    <h3>Selected</h3>

                    <h2>{report.selected || 0}</h2>

                </div>

                <div className="report-card rejected">

                    <FaTimesCircle className="report-icon" />

                    <h3>Rejected</h3>

                    <h2>{report.rejected || 0}</h2>

                </div>

            </div>

        </div>

    );

}

export default Reports;