import { useEffect, useState } from "react";
import { getStudentApplications } from "../../services/ApplicationService";

function MyApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            const studentId = localStorage.getItem("userId");

            const response = await getStudentApplications(studentId);

            setApplications(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to Load Applications");

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>My Applications</h2>

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

                        <th>Application ID</th>

                        <th>Drive ID</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        applications.length > 0 ? (

                            applications.map((application) => (

                                <tr key={application.id}>

                                    <td>{application.id}</td>

                                    <td>{application.driveId}</td>

                                    <td>{application.status}</td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="3"
                                    style={{
                                        textAlign: "center",
                                        padding: "20px"
                                    }}
                                >
                                    No Applications Found
                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default MyApplications;