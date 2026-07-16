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

        <div style={{ padding: "30px" }}>

            <h2>Add Company Drive</h2>

            <form onSubmit={saveDrive}>

                <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={drive.companyName}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="jobRole"
                    placeholder="Job Role"
                    value={drive.jobRole}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    step="0.1"
                    name="packageOffered"
                    placeholder="Package (LPA)"
                    value={drive.packageOffered}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    step="0.1"
                    name="minCgpa"
                    placeholder="Minimum CGPA"
                    value={drive.minCgpa}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={drive.department}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="maxBacklogs"
                    placeholder="Maximum Backlogs"
                    value={drive.maxBacklogs}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="date"
                    name="driveDate"
                    value={drive.driveDate}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={drive.location}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <button type="submit">

                    Save Drive

                </button>

            </form>

        </div>

    );

}

export default AddDrive;