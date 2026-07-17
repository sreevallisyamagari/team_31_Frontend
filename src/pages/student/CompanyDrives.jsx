import "./CompanyDrives.css";

import { useEffect, useState } from "react";
import { getDrives } from "../../services/StudentService";
import { applyJob } from "../../services/ApplicationService";

import {
    FaBuilding,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaGraduationCap,
    FaSearch
} from "react-icons/fa";

function CompanyDrives() {

    const [drives, setDrives] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadDrives();
    }, []);

    const loadDrives = async () => {

        try {

            const response = await getDrives();

            setDrives(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const applyDrive = async (driveId) => {

        try {

            const studentId = localStorage.getItem("userId");

            await applyJob(studentId, driveId);

            alert("Applied Successfully");

        } catch (error) {

            console.log(error);

            alert("Application Failed");

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

                {filteredDrives.map((drive) => (

                    <div
                        key={drive.id}
                        className="company-card"
                    >

                        <div className="company-header">

                            <FaBuilding className="company-icon"/>

                            <div>

                                <h2>{drive.companyName}</h2>

                                <p>{drive.jobRole}</p>

                            </div>

                        </div>

                        <div className="company-info">

                            <p>

                                <FaMoneyBillWave />

                                {drive.packageOffered} LPA

                            </p>

                            <p>

                                <FaGraduationCap />

                                CGPA {drive.minCgpa}

                            </p>

                            <p>

                                📘 {drive.department}

                            </p>

                            <p>

                                <FaMapMarkerAlt />

                                {drive.location}

                            </p>

                        </div>

                        <button
                            className="apply-btn"
                            onClick={() => applyDrive(drive.id)}
                        >

                            Apply Now

                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default CompanyDrives;