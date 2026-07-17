import { useEffect, useState } from "react";
import {
    getApplicationsByStatus,
    updateStatus
} from "../../services/ApplicationService";

function Shortlisting() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            const response = await getApplicationsByStatus("Applied");

            setApplications(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const shortlist = async (id) => {

        await updateStatus(id, "Shortlisted");

        loadApplications();

    };

    const reject = async (id) => {

        await updateStatus(id, "Rejected");

        loadApplications();

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>Shortlisting</h2>

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

                        <th>Resume</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        applications.map((application) => (

                            <tr key={application.id}>

                                <td>{application.student.name}</td>

                                <td>{application.drive.companyName}</td>

                                <td>{application.drive.jobRole}</td>

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

                                <td>{application.status}</td>

                                <td>

                                    <button
                                        onClick={() => shortlist(application.id)}
                                    >
                                        Shortlist
                                    </button>

                                    {" "}

                                    <button
                                        onClick={() => reject(application.id)}
                                    >
                                        Reject
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

export default Shortlisting;