import { useEffect, useState } from "react";
import { getProfile } from "../../services/StudentService";
import {
    uploadResume,
    viewResume,
    downloadResume
} from "../../services/ResumeService";

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

            alert("Please select a file");

            return;

        }

        try {

            await uploadResume(studentId, file);

            alert("Resume Uploaded Successfully");

            loadProfile();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>My Resume</h2>

            <hr />

            <h3>Current Resume</h3>

            <p>

                {profile.resume
                    ? profile.resume
                    : "No Resume Uploaded"}

            </p>

            <br />

            <button
                onClick={() =>
                    window.open(viewResume(studentId), "_blank")
                }
            >
                View Resume
            </button>

            <button
                style={{ marginLeft: "10px" }}
                onClick={() =>
                    window.open(downloadResume(studentId))
                }
            >
                Download Resume
            </button>

            <br /><br />

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br /><br />

            <button onClick={handleUpload}>

                Replace Resume

            </button>

        </div>

    );

}

export default Resume;