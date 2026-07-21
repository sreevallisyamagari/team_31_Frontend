import "./Profile.css";

import { useEffect, useState } from "react";
import { getProfile } from "../../services/StudentService";
import { useNavigate } from "react-router-dom";

import {
    FaUserCircle,
    FaEnvelope,
    FaPhone,
    FaGraduationCap,
    FaChartLine,
    FaExclamationCircle,
    FaFilePdf,
    FaUserEdit
} from "react-icons/fa";

function Profile() {

    const [profile, setProfile] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const response = await getProfile(userId);

            setProfile(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                {profile.profilePictureUrl ? (
                    <img src={profile.profilePictureUrl} alt={profile.name} className="profile-avatar-img" />
                ) : (
                    <FaUserCircle className="profile-avatar" />
                )}
                <h1>{profile.name || "Student Name"}</h1>
                <p>{profile.department || "Department"}</p>
            </div>
            <div className="profile-grid">

                <div className="profile-card">

                    <h3>Personal Information</h3>

                    <div className="profile-item">

                        <FaEnvelope />

                        <span>{profile.email}</span>

                    </div>

                    <div className="profile-item">

                        <FaPhone />

                        <span>{profile.phone}</span>

                    </div>

                </div>

                <div className="profile-card">

                    <h3>Academic Information</h3>

                    <div className="profile-item">

                        <FaGraduationCap />

                        <span>{profile.department}</span>

                    </div>

                    <div className="profile-item">

                        <FaChartLine />

                        <span>CGPA : {profile.cgpa}</span>

                    </div>

                    <div className="profile-item">
                        <FaExclamationCircle />
                        <span>Backlogs : {Math.max(0, profile.backlogs || 0)}</span>
                    </div>

                </div>

                <div className="profile-card">

                    <h3>Resume</h3>

                    {
                        profile.resume ? (

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "180px"
                                }}
                            >

                                <FaFilePdf
                                    size={60}
                                    color="#dc3545"
                                    style={{ marginBottom: "20px" }}
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "12px"
                                    }}
                                >

                                    <a
                                        href={profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        View Resume
                                    </a>

                                    <a
                                        href={profile.resume}
                                        download
                                        className="btn btn-success"
                                    >
                                        Download
                                    </a>

                                </div>

                            </div>

                        ) : (

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "180px",
                                    color: "#777"
                                }}
                            >
                                Resume Not Uploaded
                            </div>

                        )
                    }

                </div>

            </div>

            <button
                className="edit-btn"
                onClick={() => navigate("/edit-profile")}
            >
                <FaUserEdit />
                Edit Profile
            </button>

        </div>

    );

}

export default Profile;