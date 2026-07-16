import { useEffect, useState } from "react";
import { getDrives } from "../../services/StudentService";
import { applyJob } from "../../services/ApplicationService";

function CompanyDrives() {

    const [drives, setDrives] = useState([]);

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

            const application = {

                studentId: localStorage.getItem("userId"),
                driveId: driveId,
                status: "Applied"

            };

            await applyJob(application);

            alert("Applied Successfully");

        } catch (error) {

            console.log(error);

            alert("Application Failed");

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>Available Company Drives</h2>

            <hr />

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr>

                        <th>Company</th>
                        <th>Role</th>
                        <th>Package</th>
                        <th>Department</th>
                        <th>CGPA</th>
                        <th>Location</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {drives.map((drive) => (

                        <tr key={drive.id}>

                            <td>{drive.companyName}</td>

                            <td>{drive.jobRole}</td>

                            <td>{drive.packageOffered} LPA</td>

                            <td>{drive.department}</td>

                            <td>{drive.minCgpa}</td>

                            <td>{drive.location}</td>

                            <td>

                                <button
                                    onClick={() => applyDrive(drive.id)}
                                >
                                    Apply
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default CompanyDrives;