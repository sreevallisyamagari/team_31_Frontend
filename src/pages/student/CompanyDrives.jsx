import "./CompanyDrives.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDrives } from "../../services/StudentService";
import { applyJob } from "../../services/ApplicationService";
import toast from "react-hot-toast";

import {
    FaBuilding,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaGraduationCap,
    FaSearch,
    FaBookOpen
} from "react-icons/fa";

import { getCompanyLogoUrl } from "../../utils/logoUtils";

function CompanyDrives() {
    const [drives, setDrives] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadDrives();
    }, []);

    const loadDrives = async () => {
        try {
            const response = await getDrives();
            setDrives(response.data);
        } catch (error) {
            toast.error("Failed to load drives");
        }
    };

    const applyDrive = async (driveId) => {
        try {
            const studentId = localStorage.getItem("userId");
            await applyJob(studentId, driveId);
            toast.success("Applied Successfully");
        } catch (error) {
            toast.error("Application Failed");
        }
    };

    const filteredDrives = drives.filter((drive) =>
        drive.companyName.toLowerCase().includes(search.toLowerCase()) ||
        drive.jobRole.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="company-container">
            <h1>Company Drives</h1>
            <p>Explore and apply for the latest placement opportunities.</p>

            <div className="search-box">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Search company or role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="company-grid">
                {filteredDrives.map((drive) => {
                    const logo = getCompanyLogoUrl(drive.logoUrl, drive.companyName);
                    return (
                        <div key={drive.id} className="company-card">
                            <div className="company-header">
                                {logo ? (
                                    <img src={logo} alt={drive.companyName} className="company-card-logo" style={{ objectFit: 'contain', background: 'white', padding: '4px' }} />
                                ) : (
                                    <div className="company-card-logo-placeholder">
                                        <FaBuilding className="company-icon"/>
                                    </div>
                                )}
                                <div>
                                    <h2>{drive.companyName}</h2>
                                    <p>{drive.jobRole}</p>
                                </div>
                            </div>

                        <div className="company-info">
                            <p>
                                <FaMoneyBillWave className="text-green" />
                                {drive.packageOffered} LPA
                            </p>
                            <p>
                                <FaGraduationCap className="text-blue" />
                                Min CGPA {drive.minCgpa}
                            </p>
                            <p>
                                <FaBookOpen className="text-purple" />
                                {drive.department}
                            </p>
                            <p>
                                <FaMapMarkerAlt className="text-orange" />
                                {drive.location}
                            </p>
                        </div>
                        
                        <div className="company-card-actions">
                            <button
                                className="details-btn"
                                onClick={() => navigate(`/drives/${drive.id}`)}
                            >
                                View Details
                            </button>
                            <button
                                className="apply-btn"
                                onClick={() => navigate(`/drives/${drive.id}`)}
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
    );
}

export default CompanyDrives;