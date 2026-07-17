import { useEffect, useState } from "react";
import {
    getAllStudents,
    deleteStudent
} from "../../services/AdminService";
import { useNavigate } from "react-router-dom";

function Students() {

    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {

        const response = await getAllStudents();

        setStudents(response.data);

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Delete this student?");

        if (!confirmDelete) return;

        await deleteStudent(id);

        alert("Student Deleted Successfully");

        loadStudents();

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>Manage Students</h2>

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

                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>CGPA</th>
                        <th>Resume</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        students.map(student => (

                            <tr key={student.id}>

                                <td>{student.id}</td>

                                <td>{student.name}</td>

                                <td>{student.email}</td>

                                <td>{student.department}</td>

                                <td>{student.cgpa}</td>

                                <td>{student.resume}</td>

                                <td>

                                    <button
    onClick={() => navigate(`/edit-student/${student.id}`)}
>
    Edit
</button>

                                    <button
                                        onClick={() => handleDelete(student.id)}
                                        style={{ marginLeft: "10px" }}
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

export default Students;