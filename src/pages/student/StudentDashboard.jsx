import "./StudentDashboard.css";

import {
    FaBriefcase,
    FaBuilding,
    FaClipboardCheck,
    FaAward,
    FaBell,
    FaUserGraduate
} from "react-icons/fa";

function StudentDashboard() {

    const userName = localStorage.getItem("userName");

    return (

        <div className="dashboard-container">

            {/* Statistics */}

            <div className="stats-grid">

                <div className="stat-card">

                    <FaBriefcase className="stat-icon" />

                    <h2>8</h2>

                    <p>Applied Jobs</p>

                </div>

                <div className="stat-card">

                    <FaBuilding className="stat-icon" />

                    <h2>5</h2>

                    <p>Eligible Drives</p>

                </div>

                <div className="stat-card">

                    <FaClipboardCheck className="stat-icon" />

                    <h2>3</h2>

                    <p>Upcoming Drives</p>

                </div>

                <div className="stat-card">

                    <FaAward className="stat-icon" />

                    <h2>1</h2>

                    <p>Selected</p>

                </div>

            </div>

            {/* Upcoming Placement Drives */}

            <div className="drives-card">

                <h3>

                    <FaBuilding />

                    Upcoming Placement Drives

                </h3>

                <table className="drive-table">

                    <thead>

                        <tr>

                            <th>Company</th>

                            <th>Role</th>

                            <th>Package</th>

                            <th>Last Date</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>TCS</td>

                            <td>Assistant System Engineer</td>

                            <td>3.5 LPA</td>

                            <td>20 Jul 2026</td>

                            <td>

                                <button className="apply-btn">

                                    Apply

                                </button>

                            </td>

                        </tr>

                        <tr>

                            <td>Infosys</td>

                            <td>System Engineer</td>

                            <td>4.2 LPA</td>

                            <td>24 Jul 2026</td>

                            <td>

                                <button className="apply-btn">

                                    Apply

                                </button>

                            </td>

                        </tr>

                        <tr>

                            <td>Wipro</td>

                            <td>Project Engineer</td>

                            <td>4 LPA</td>

                            <td>29 Jul 2026</td>

                            <td>

                                <button className="apply-btn">

                                    Apply

                                </button>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            {/* Bottom Section */}

            <div className="dashboard-grid">

                {/* Notifications */}

                <div className="dashboard-card">

                    <h3>

                        <FaBell />

                        Recent Notifications

                    </h3>

                    <ul>

                        <li>TCS Drive Registration closes tomorrow.</li>

                        <li>Resume uploaded successfully.</li>

                        <li>Infosys shortlisted candidates announced.</li>

                        <li>Wipro drive scheduled on Monday.</li>

                    </ul>

                </div>

                {/* Placement Progress */}

                <div className="dashboard-card">

                    <h3>

                        <FaUserGraduate />

                        Placement Progress

                    </h3>

                    <div className="progress-item">

                        <span>Resume Uploaded</span>

                        <span>✅</span>

                    </div>

                    <div className="progress-item">

                        <span>Profile Completed</span>

                        <span>✅</span>

                    </div>

                    <div className="progress-item">

                        <span>Eligible Drives</span>

                        <span>5</span>

                    </div>

                    <div className="progress-item">

                        <span>Applications</span>

                        <span>8</span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StudentDashboard;