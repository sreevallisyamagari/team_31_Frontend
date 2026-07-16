import { useEffect, useState } from "react";
import {
    getAllApplications,
    updateStatus
} from "../../services/ApplicationService";

function ManageApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            const response = await getAllApplications();

            setApplications(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const changeStatus = async (id, status) => {

        try {

            await updateStatus(id, status);

            alert("Status Updated Successfully");

            loadApplications();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>Manage Applications</h2>

            <table
                border="1"
                cellPadding="10"
                cellSpacing="0"
                width="100%"
            >

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Student ID</th>

                        <th>Drive ID</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        applications.map(application => (

                            <tr key={application.id}>

                                <td>{application.id}</td>

                                <td>{application.studentId}</td>

                                <td>{application.driveId}</td>

                                <td>{application.status}</td>

                                <td>

                                    <select
                                        defaultValue={application.status}
                                        onChange={(e) =>
                                            changeStatus(
                                                application.id,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option>Applied</option>

                                        <option>Shortlisted</option>

                                        <option>Selected</option>

                                        <option>Rejected</option>

                                    </select>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default ManageApplications;