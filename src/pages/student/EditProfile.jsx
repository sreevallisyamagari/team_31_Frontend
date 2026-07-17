import "./EditProfile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../services/StudentService";

function EditProfile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        cgpa: "",
        backlogs: ""
    });

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

    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const userId = localStorage.getItem("userId");

            await updateProfile(userId, profile);

            alert("Profile Updated Successfully");

            navigate("/profile");

        } catch (error) {

            console.log(error);

            alert("Failed to update profile");

        }

    };

    return (

        <div className="profile-container">

            <div className="profile-card">

                <h2>Edit Profile</h2>

                <div className="edit-profile-card">

    <h2>Edit Profile</h2>

    <form onSubmit={handleSubmit} className="edit-profile-form">

        <div className="form-group">
            <label>Full Name</label>
            <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
            />
        </div>

        <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
            />
        </div>

        <div className="form-group">
            <label>Phone Number</label>
            <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
            />
        </div>

        <div className="form-group">
            <label>Department</label>
            <input
                type="text"
                name="department"
                value={profile.department}
                onChange={handleChange}
            />
        </div>

        <div className="form-group">
            <label>CGPA</label>
            <input
                type="number"
                step="0.01"
                name="cgpa"
                value={profile.cgpa}
                onChange={handleChange}
            />
        </div>

        <div className="form-group">
            <label>Backlogs</label>
            <input
                type="number"
                name="backlogs"
                value={profile.backlogs}
                onChange={handleChange}
            />
        </div>

        <button type="submit" className="save-btn">
            Update Profile
        </button>

    </form>

</div>

            </div>

        </div>

    );

}

export default EditProfile;