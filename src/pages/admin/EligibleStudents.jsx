import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllDrives,
    getDriveById
} from "../../services/DriveService";
import { getEligibleStudents } from "../../services/EligibleStudentService";

function EligibleStudents() {

    const navigate = useNavigate();

    const [drives, setDrives] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedDrive, setSelectedDrive] = useState("");
    const [drive, setDrive] = useState(null);

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

    const searchEligibleStudents = async () => {

        if (selectedDrive === "") {

            alert("Please select a company drive.");

            return;

        }

        try {

            const driveResponse = await getDriveById(selectedDrive);

            setDrive(driveResponse.data);

            const studentResponse = await getEligibleStudents(selectedDrive);

            setStudents(studentResponse.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>Eligible Students</h2>

            <br />

            <select
                value={selectedDrive}
                onChange={(e) => setSelectedDrive(e.target.value)}
            >

                <option value="">
                    Select Company Drive
                </option>

                {
                    drives.map((drive) => (

                        <option
                            key={drive.id}
                            value={drive.id}
                        >
                            {drive.companyName} - {drive.jobRole}
                        </option>

                    ))
                }

            </select>

            <button
                onClick={searchEligibleStudents}
                style={{
                    marginLeft: "15px",
                    padding: "8px 15px",
                    cursor: "pointer"
                }}
            >
                Search
            </button>

            <br /><br />

            {drive && (

                <div
                    style={{
                        border: "1px solid #ddd",
                        padding: "20px",
                        borderRadius: "8px",
                        marginBottom: "25px",
                        background: "#f8f9fa"
                    }}
                >

                    <h3>Drive Details</h3>

                    <hr />

                    <p><b>Company :</b> {drive.companyName}</p>

                    <p><b>Job Role :</b> {drive.jobRole}</p>

                    <p><b>Package :</b> {drive.packageOffered} LPA</p>

                    <p><b>Department :</b> {drive.department}</p>

                    <p><b>Minimum CGPA :</b> {drive.minCgpa}</p>

                    <p><b>Maximum Backlogs :</b> {drive.maxBacklogs}</p>

                    <p><b>Drive Date :</b> {drive.driveDate}</p>

                    <p><b>Location :</b> {drive.location}</p>

                </div>

            )}

            <h3>
                Eligible Students ({students.length})
            </h3>

            <table
                border="1"
                cellPadding="10"
                width="100%"
                style={{
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Branch</th>
                        <th>CGPA</th>
                        <th>Backlogs</th>
                        <th>Resume</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        students.length > 0 ?

                            students.map((student) => (

                                <tr key={student.id}>

                                    <td>{student.id}</td>

                                    <td>{student.name}</td>

                                    <td>{student.department}</td>

                                    <td>{student.cgpa}</td>

                                    <td>{student.backlogs}</td>

                                    <td>

                                        <a
                                            href={`http://localhost:8080/uploads/${student.resume}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View Resume
                                        </a>

                                    </td>

                                    <td>

                                        <button
                                            onClick={() => navigate(`/student-details/${student.id}`)}
                                            style={{
                                                padding: "6px 12px",
                                                background: "#2563eb",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            View
                                        </button>

                                    </td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td
                                    colSpan="7"
                                    style={{
                                        textAlign: "center"
                                    }}
                                >
                                    No Eligible Students Found
                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}

export default EligibleStudents;