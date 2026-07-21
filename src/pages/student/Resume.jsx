import "./Resume.css";
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/StudentService";
import axios from "axios";
import toast from "react-hot-toast";

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
    const [uploading, setUploading] = useState(false);

    const studentId = localStorage.getItem("userId");

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await getProfile(studentId);
            setProfile(response.data);
        } catch (error) {
            toast.error("Failed to load profile");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a resume");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "student_resumes");

        try {
            setUploading(true);
            
            // 1. Upload file to Cloudinary
            const uploadResponse = await axios.post("http://localhost:8080/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            
            const secureUrl = uploadResponse.data.secure_url;
            
            // 2. Update student profile with new resume URL
            await updateProfile(studentId, { ...profile, resume: secureUrl });

            toast.success("Resume Uploaded Successfully");
            loadProfile();
            setFile(null);
        } catch (error) {
            toast.error("Upload Failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="resume-container">
            <div className="resume-card">
                <FaFilePdf className="resume-icon"/>
                <h1>My Resume</h1>
                <p>Upload your latest resume for placement drives.</p>

                <div className="resume-info">
                    <strong>Current Resume</strong>
                    <span>
                        {profile.resume ? (
                            <a href={profile.resume} target="_blank" rel="noreferrer" style={{color: '#2563eb'}}>View Uploaded Document</a>
                        ) : "No Resume Uploaded"}
                    </span>
                </div>

                <div className="resume-buttons">
                    <button
                        className="view-btn"
                        onClick={() => {
                            if (profile.resume) window.open(profile.resume, "_blank");
                            else toast.error("No resume uploaded");
                        }}
                        disabled={!profile.resume}
                    >
                        <FaEye/> View
                    </button>
                    <button
                        className="download-btn"
                        onClick={() => {
                            if (profile.resume) window.open(profile.resume, "_blank");
                            else toast.error("No resume uploaded");
                        }}
                        disabled={!profile.resume}
                    >
                        <FaDownload/> Download
                    </button>
                </div>
            </div>

            <div className="upload-card">
                <FaCloudUploadAlt className="upload-icon"/>
                <h2>Upload New Resume</h2>
                <p>Supported formats: PDF, DOC, DOCX</p>
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFile(e.target.files[0])}
                    disabled={uploading}
                />
                
                {uploading && <p style={{color: '#2563eb'}}>Uploading...</p>}

                {file && (
                    <div className="selected-file">
                        Selected File:
                        <strong>{file.name}</strong>
                    </div>
                )}

                <button
                    className="upload-btn"
                    onClick={handleUpload}
                    disabled={uploading || !file}
                >
                    <FaUpload/> {uploading ? "Uploading..." : "Upload Resume"}
                </button>
            </div>
        </div>
    );
}

export default Resume;