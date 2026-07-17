import "./AddDrive.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDrive } from "../../services/DriveService";

function AddDrive() {

    const navigate = useNavigate();

    const [drive, setDrive] = useState({
        companyName: "",
        jobRole: "",
        packageOffered: "",
        minCgpa: "",
        department: "",
        maxBacklogs: "",
        driveDate: "",
        location: ""
    });

    const handleChange = (e) => {

        setDrive({
            ...drive,
            [e.target.name]: e.target.value
        });

    };

    const saveDrive = async (e) => {

        e.preventDefault();

        try {

            await addDrive(drive);

            alert("Company Drive Added Successfully");

            navigate("/company-drives");

        } catch (error) {

            console.log(error);

            alert("Failed to Add Drive");

        }

    };

    return (

        <div className="add-drive-container">

            <div className="add-drive-card">

                <div className="add-drive-header">

                    <h2>Add Company Drive</h2>

                    <p>
                        Register a new placement opportunity for students.
                    </p>

                </div>

                <form className="drive-form" onSubmit={saveDrive}>

                    <div className="form-group">

                        <label>Company Name</label>

                        <input
                            type="text"
                            name="companyName"
                            value={drive.companyName}
                            onChange={handleChange}
                            placeholder="Enter Company Name"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Job Role</label>

                        <input
                            type="text"
                            name="jobRole"
                            value={drive.jobRole}
                            onChange={handleChange}
                            placeholder="Enter Job Role"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Package (LPA)</label>

                        <input
                            type="number"
                            step="0.1"
                            name="packageOffered"
                            value={drive.packageOffered}
                            onChange={handleChange}
                            placeholder="Eg. 8.5"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Minimum CGPA</label>

                        <input
                            type="number"
                            step="0.1"
                            name="minCgpa"
                            value={drive.minCgpa}
                            onChange={handleChange}
                            placeholder="Eg. 7.5"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Department</label>

                        <input
                            type="text"
                            name="department"
                            value={drive.department}
                            onChange={handleChange}
                            placeholder="Enter Department"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Maximum Backlogs</label>

                        <input
                            type="number"
                            name="maxBacklogs"
                            value={drive.maxBacklogs}
                            onChange={handleChange}
                            placeholder="Eg. 0"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Drive Date</label>

                        <input
                            type="date"
                            name="driveDate"
                            value={drive.driveDate}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Location</label>

                        <input
                            type="text"
                            name="location"
                            value={drive.location}
                            onChange={handleChange}
                            placeholder="Enter Location"
                            required
                        />

                    </div>

                    <button
                        className="save-drive-btn"
                        type="submit"
                    >
                        Save Company Drive
                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddDrive;