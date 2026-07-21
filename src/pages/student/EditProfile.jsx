import "./EditProfile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../services/StudentService";
import axios from "axios";
import toast from "react-hot-toast";

function EditProfile() {

    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        cgpa: "",
        backlogs: "",
        profilePictureUrl: ""
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const response = await getProfile(userId);
            setProfile({
                ...response.data,
                backlogs: Math.max(0, response.data.backlogs || 0)
            });
        } catch (error) {
            toast.error("Failed to load profile");
        }
    };

    const handleChange = (e) => {
        let val = e.target.value;
        if (e.target.name === "backlogs") {
            val = Math.max(0, parseInt(val) || 0);
        }
        setProfile({
            ...profile,
            [e.target.name]: val
        });
    };

    const handleProfilePicUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "student_profiles");

        try {
            setUploading(true);
            const response = await axios.post("http://localhost:8080/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setProfile({ ...profile, profilePictureUrl: response.data.secure_url });
            toast.success("Profile picture uploaded successfully!");
        } catch (error) {
            toast.error("Failed to upload profile picture.");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem("userId");
            await updateProfile(userId, profile);
            toast.success("Profile Updated Successfully");
            navigate("/profile");
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="edit-profile-card">
                    <h2>Edit Profile</h2>
                    <form onSubmit={handleSubmit} className="edit-profile-form">

                        <div className="form-group">
                            <label>Profile Picture</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePicUpload}
                                disabled={uploading}
                            />
                            {uploading && <small>Uploading picture...</small>}
                            {profile.profilePictureUrl && (
                                <img src={profile.profilePictureUrl} alt="Profile Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', marginTop: '10px', border: '2px solid #2563eb' }} />
                            )}
                        </div>

                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={profile.phone || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Department</label>
                            <input
                                type="text"
                                name="department"
                                value={profile.department || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>CGPA</label>
                            <input
                                type="number"
                                step="0.01"
                                name="cgpa"
                                value={profile.cgpa || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Backlogs</label>
                            <input
                                type="number"
                                min="0"
                                name="backlogs"
                                value={profile.backlogs !== undefined ? profile.backlogs : 0}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="save-btn" disabled={uploading}>
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;