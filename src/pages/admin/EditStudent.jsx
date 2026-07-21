import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getStudentById,
    updateStudent
} from "../../services/AdminService";

function EditStudent() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: "",
        department: "",
        cgpa: "",
        backlogs: "",
        phone: ""
    });

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {
        try {
            const response = await getStudentById(id);
            setStudent({
                ...response.data,
                backlogs: Math.max(0, response.data.backlogs || 0)
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        let val = e.target.value;
        if (e.target.name === "backlogs") {
            val = Math.max(0, parseInt(val) || 0);
        }
        setStudent({
            ...student,
            [e.target.name]: val
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateStudent(id, student);

            toast.success("Student Updated Successfully");

            navigate("/students");

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <h2>Edit Student</h2>

            <hr />

            <form onSubmit={handleSubmit}>

                <p>Name</p>

                <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                />

                <p>Department</p>

                <input
                    type="text"
                    name="department"
                    value={student.department}
                    onChange={handleChange}
                />

                <p>CGPA</p>

                <input
                    type="number"
                    step="0.1"
                    name="cgpa"
                    value={student.cgpa}
                    onChange={handleChange}
                />

                <p>Backlogs</p>

                <input
                    type="number"
                    min="0"
                    name="backlogs"
                    value={student.backlogs}
                    onChange={handleChange}
                />

                <p>Phone</p>

                <input
                    type="text"
                    name="phone"
                    value={student.phone}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">

                    Update Student

                </button>

            </form>

        </div>

    );

}

export default EditStudent;
