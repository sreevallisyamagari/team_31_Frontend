import { useEffect, useState } from "react";
import { getProfile } from "../../services/StudentService";

function Profile() {

    const [profile, setProfile] = useState({});

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

        <div style={{ padding: "30px" }}>

            <h2>Student Profile</h2>

            <hr />

            <p><b>Name:</b> {profile.name}</p>

            <p><b>Email:</b> {profile.email}</p>

            <p><b>Department:</b> {profile.department}</p>

            <p><b>CGPA:</b> {profile.cgpa}</p>

            <p><b>Backlogs:</b> {profile.backlogs}</p>

            <p><b>Phone:</b> {profile.phone}</p>

            <p><b>Resume:</b> {profile.resume}</p>

        </div>

    );

}

export default Profile;