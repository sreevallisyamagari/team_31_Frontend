import "./Resume.css";

import { useEffect, useState } from "react";
import { getProfile } from "../../services/StudentService";
import {
    uploadResume,
    viewResume,
    downloadResume
} from "../../services/ResumeService";

import {
    FaFilePdf,
    FaUpload,
    FaEye,
    FaDownload,
    FaCloudUploadAlt
} from "react-icons/fa";

function Resume() {

    const [profile, setProfile] = useState({});
    const [file, setFile] = useState(null);

    const studentId = localStorage.getItem("userId");

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const response = await getProfile(studentId);

            setProfile(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleUpload = async () => {

        if (!file) {

            alert("Please select a resume");

            return;

        }

        try {

            await uploadResume(studentId, file);

            alert("Resume Uploaded Successfully");

            loadProfile();

            setFile(null);

        } catch (error) {

            console.log(error);

            alert("Upload Failed");

        }

    };

    return (

        <div className="resume-container">

            <div className="resume-card">

                <FaFilePdf className="resume-icon"/>

                <h1>My Resume</h1>

                <p>

                    Upload your latest resume for placement drives.

                </p>

                <div className="resume-info">

                    <strong>Current Resume</strong>

                    <span>

                        {

                            profile.resume

                                ? profile.resume

                                : "No Resume Uploaded"

                        }

                    </span>

                </div>

                <div className="resume-buttons">

                    <button
                        className="view-btn"
                        onClick={() =>
                            window.open(viewResume(studentId), "_blank")
                        }
                    >

                        <FaEye/>

                        View

                    </button>

                    <button
                        className="download-btn"
                        onClick={() =>
                            window.open(downloadResume(studentId))
                        }
                    >

                        <FaDownload/>

                        Download

                    </button>

                </div>

            </div>

            <div className="upload-card">

                <FaCloudUploadAlt className="upload-icon"/>

                <h2>Upload New Resume</h2>

                <p>

                    Supported formats: PDF, DOC, DOCX

                </p>

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                {

                    file && (

                        <div className="selected-file">

                            Selected File:

                            <strong>

                                {file.name}

                            </strong>

                        </div>

                    )

                }

                <button
                    className="upload-btn"
                    onClick={handleUpload}
                >

                    <FaUpload/>

                    Upload Resume

                </button>

            </div>

        </div>

    );

}

export default Resume;