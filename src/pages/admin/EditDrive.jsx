import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getDriveById,
    updateDrive
} from "../../services/DriveService";

function EditDrive() {

    const { id } = useParams();

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

    useEffect(() => {
        loadDrive();
    }, []);

    const loadDrive = async () => {

        try {

            const response = await getDriveById(id);

            setDrive(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setDrive({
            ...drive,
            [e.target.name]: e.target.value
        });

    };

    const updateCompanyDrive = async (e) => {

        e.preventDefault();

        try {

            await updateDrive(id, drive);

            alert("Drive Updated Successfully");

            navigate("/company-drives");

        } catch (error) {

            console.log(error);

            alert("Failed to Update Drive");

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>Edit Company Drive</h2>

            <form onSubmit={updateCompanyDrive}>

                <input
                    type="text"
                    name="companyName"
                    value={drive.companyName}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="jobRole"
                    value={drive.jobRole}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    step="0.1"
                    name="packageOffered"
                    value={drive.packageOffered}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    step="0.1"
                    name="minCgpa"
                    value={drive.minCgpa}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="department"
                    value={drive.department}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="maxBacklogs"
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
                    value={drive.location}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <button type="submit">

                    Update Drive

                </button>

            </form>

        </div>

    );

}

export default EditDrive;