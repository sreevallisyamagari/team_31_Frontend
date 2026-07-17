import { useEffect, useState } from "react";
import {
    getAllStudents,
    deleteStudent
} from "../../services/AdminService";
import { useNavigate } from "react-router-dom";

import {
    FaUserGraduate,
    FaEnvelope,
    FaGraduationCap,
    FaStar,
    FaFilePdf,
    FaEdit,
    FaTrashAlt
} from "react-icons/fa";

import "./Students.css";

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

        <div className="students-container">

            <div className="students-header">

                <div>

                    <h1>Manage Students</h1>

                    <p>
                        View, edit and manage all registered students.
                    </p>

                </div>

                <div className="student-count">

                    Total Students : <span>{students.length}</span>

                </div>

            </div>

            {

                students.length === 0 ?

                    <div className="empty-card">

                        <h3>No Students Found</h3>

                        <p>No students have registered yet.</p>

                    </div>

                    :

                    <div className="students-grid">

                        {

                            students.map(student => (

                                <div
                                    key={student.id}
                                    className="student-card"
                                >

                                    <div className="student-title">

                                        <FaUserGraduate />

                                        <h2>{student.name}</h2>

                                    </div>

                                    <p>

                                        <FaEnvelope />

                                        <strong>Email :</strong>

                                        {student.email}

                                    </p>

                                    <p>

                                        <FaGraduationCap />

                                        <strong>Department :</strong>

                                        {student.department}

                                    </p>

                                    <p>

                                        <FaStar />

                                        <strong>CGPA :</strong>

                                        {student.cgpa}

                                    </p>

                                    <div className="resume-section">

                                        {

                                            student.resume ?

                                                <a
                                                    href={`http://localhost:8080/uploads/${student.resume}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="resume-btn"
                                                >

                                                    <FaFilePdf />

                                                    View Resume

                                                </a>

                                                :

                                                <span className="no-resume">

                                                    No Resume

                                                </span>

                                        }

                                    </div>

                                    <div className="action-buttons">

                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                navigate(`/edit-student/${student.id}`)
                                            }
                                        >

                                            <FaEdit />

                                            Edit

                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(student.id)}
                                        >

                                            <FaTrashAlt />

                                            Delete

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

}

export default Students;