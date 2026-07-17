import { useEffect, useState } from "react";
import { getApplicationsByStatus } from "../../services/ApplicationService";

function SelectedStudents() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        loadSelectedStudents();
    }, []);

    const loadSelectedStudents = async () => {

        try {

            const response = await getApplicationsByStatus("Selected");

            setStudents(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>Selected Students</h2>

            <hr />

            <table
                border="1"
                cellPadding="10"
                width="100%"
                style={{ borderCollapse: "collapse" }}
            >

                <thead>

                    <tr>

                        <th>Student Name</th>

                        <th>Company</th>

                        <th>Job Role</th>

                        <th>Department</th>

                        <th>CGPA</th>

                        <th>Phone</th>

                        <th>Resume</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        students.map((application) => (

                            <tr key={application.id}>

                                <td>{application.student.name}</td>

                                <td>{application.drive.companyName}</td>

                                <td>{application.drive.jobRole}</td>

                                <td>{application.student.department}</td>

                                <td>{application.student.cgpa}</td>

                                <td>{application.student.phone}</td>

                                <td>

                                    {

                                        application.student.resume ?

                                            <a
                                                href={`http://localhost:8080/uploads/${application.student.resume}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View Resume
                                            </a>

                                            :

                                            "No Resume"

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default SelectedStudents;