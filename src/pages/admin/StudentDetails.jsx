import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../services/AdminService";

function StudentDetails() {

    const { id } = useParams();

    const [student, setStudent] = useState(null);

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {

        try {

            const response = await getStudentById(id);

            setStudent(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!student) {

        return <h2 style={{ padding: "30px" }}>Loading...</h2>;

    }

    return (

        <div style={{ padding: "30px" }}>

            <h2>Student Details</h2>

            <hr />

            <table cellPadding="12">

                <tbody>

                    <tr>
                        <td><b>ID</b></td>
                        <td>{student.id}</td>
                    </tr>

                    <tr>
                        <td><b>Name</b></td>
                        <td>{student.name}</td>
                    </tr>

                    <tr>
                        <td><b>Email</b></td>
                        <td>{student.email}</td>
                    </tr>

                    <tr>
                        <td><b>Department</b></td>
                        <td>{student.department}</td>
                    </tr>

                    <tr>
                        <td><b>CGPA</b></td>
                        <td>{student.cgpa}</td>
                    </tr>

                    <tr>
                        <td><b>Backlogs</b></td>
                        <td>{Math.max(0, student.backlogs || 0)}</td>
                    </tr>

                    <tr>
                        <td><b>Phone</b></td>
                        <td>{student.phone}</td>
                    </tr>

                    <tr>
                        <td><b>Resume</b></td>
                        <td>
                            {student.resume ? (
                                <a
                                    href={student.resume}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View Resume
                                </a>
                            ) : (
                                <span>No Resume</span>
                            )}
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>

    );

}

export default StudentDetails;