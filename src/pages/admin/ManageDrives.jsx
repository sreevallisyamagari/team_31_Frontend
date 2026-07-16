import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getAllDrives,
    deleteDrive
} from "../../services/DriveService";

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

        <div style={{ padding: "30px" }}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >

                <h2>Manage Company Drives</h2>

                <Link
                    to="/add-drive"
                    style={{
                        background: "#2563eb",
                        color: "white",
                        padding: "10px 18px",
                        textDecoration: "none",
                        borderRadius: "5px"
                    }}
                >
                    + Add Drive
                </Link>

            </div>

            <table
                border="1"
                cellPadding="10"
                cellSpacing="0"
                width="100%"
            >

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Company</th>

                        <th>Role</th>

                        <th>Package</th>

                        <th>CGPA</th>

                        <th>Department</th>

                        <th>Backlogs</th>

                        <th>Date</th>

                        <th>Location</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        drives.map((drive) => (

                            <tr key={drive.id}>

                                <td>{drive.id}</td>

                                <td>{drive.companyName}</td>

                                <td>{drive.jobRole}</td>

                                <td>{drive.packageOffered}</td>

                                <td>{drive.minCgpa}</td>

                                <td>{drive.department}</td>

                                <td>{drive.maxBacklogs}</td>

                                <td>{drive.driveDate}</td>

                                <td>{drive.location}</td>

                                <td>

                                    <Link
                                        to={`/edit-drive/${drive.id}`}
                                    >
                                        Edit
                                    </Link>

                                    {" | "}

                                    <button
                                        onClick={() => removeDrive(drive.id)}
                                        style={{
                                            border: "none",
                                            background: "transparent",
                                            color: "red",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default ManageDrives;