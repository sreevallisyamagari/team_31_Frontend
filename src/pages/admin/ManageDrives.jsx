import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getAllDrives,
    deleteDrive
} from "../../services/DriveService";

import {
    FaBuilding,
    FaBriefcase,
    FaMoneyBillWave,
    FaGraduationCap,
    FaBook,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaPlus
} from "react-icons/fa";

import "./ManageDrives.css";

function ManageDrives() {

    const [drives, setDrives] = useState([]);

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

    const removeDrive = async (id) => {

        if (!window.confirm("Delete this company drive?")) {

            return;

        }

        try {

            await deleteDrive(id);

            alert("Drive Deleted Successfully");

            loadDrives();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="manage-drives">

            <div className="drives-header">

                <div>

                    <h1>Manage Company Drives</h1>

                    <p>
                        Create, update and manage placement drives.
                    </p>

                </div>

                <Link
                    to="/add-drive"
                    className="add-btn"
                >

                    <FaPlus />

                    Add Drive

                </Link>

            </div>

            {

                drives.length === 0 ?

                    <div className="no-drives">

                        <h3>No Company Drives Available</h3>

                        <p>
                            Click "Add Drive" to create your first company drive.
                        </p>

                    </div>

                    :

                    <div className="drives-grid">

                        {

                            drives.map((drive) => (

                                <div
                                    key={drive.id}
                                    className="drive-card"
                                >

                                    <div className="company-title">

                                        <FaBuilding />

                                        <h2>{drive.companyName}</h2>

                                    </div>

                                    <p>

                                        <FaBriefcase />

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

                                        <strong>Minimum CGPA :</strong>

                                        {drive.minCgpa}

                                    </p>

                                    <p>

                                        <FaBook />

                                        <strong>Backlogs :</strong>

                                        {drive.maxBacklogs}

                                    </p>

                                    <p>

                                        <FaGraduationCap />

                                        <strong>Department :</strong>

                                        {drive.department}

                                    </p>

                                    <p>

                                        <FaCalendarAlt />

                                        <strong>Date :</strong>

                                        {drive.driveDate}

                                    </p>

                                    <p>

                                        <FaMapMarkerAlt />

                                        <strong>Location :</strong>

                                        {drive.location}

                                    </p>

                                    <div className="button-group">

                                        <Link
                                            to={`/edit-drive/${drive.id}`}
                                            className="edit-btn"
                                        >

                                            Edit

                                        </Link>

                                        <button
                                            className="delete-btn"
                                            onClick={() => removeDrive(drive.id)}
                                        >

                                            Delete

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

export default ManageDrives;