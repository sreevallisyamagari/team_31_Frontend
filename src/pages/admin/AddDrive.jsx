import "./AddDrive.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDrive } from "../../services/DriveService";
import axios from "axios";
import toast from "react-hot-toast";

function AddDrive() {
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    const [drive, setDrive] = useState({
        companyName: "",
        jobRole: "",
        packageOffered: "",
        minCgpa: "",
        department: "",
        maxBacklogs: "",
        driveDate: "",
        location: "",
        employmentType: "Full-Time",
        jobDescription: "",
        logoUrl: ""
    });

    const handleChange = (e) => {
        setDrive({
            ...drive,
            [e.target.name]: e.target.value
        });
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "company_logos");

        try {
            setUploading(true);
            const response = await axios.post("http://localhost:8080/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setDrive({ ...drive, logoUrl: response.data.secure_url });
            toast.success("Logo uploaded successfully!");
        } catch (error) {
            toast.error("Failed to upload logo.");
        } finally {
            setUploading(false);
        }
    };

    const saveDrive = async (e) => {
        e.preventDefault();
        try {
            await addDrive(drive);
            toast.success("Company Drive Added Successfully");
            navigate("/company-drives");
        } catch (error) {
            toast.error("Failed to Add Drive");
        }
    };

    return (
        <div className="add-drive-container">
            <div className="add-drive-card">
                <div className="add-drive-header">
                    <h2>Add Company Drive</h2>
                    <p>Register a new placement opportunity for students.</p>
                </div>

                <form className="drive-form" onSubmit={saveDrive}>
                    
                    <div className="form-group">
                        <label>Company Logo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            disabled={uploading}
                        />
                        {uploading && <small>Uploading logo...</small>}
                        {drive.logoUrl && (
                            <img src={drive.logoUrl} alt="Logo Preview" style={{ width: '80px', height: '80px', objectFit: 'contain', marginTop: '10px', border: '1px solid #ddd', padding: '5px', borderRadius: '8px' }} />
                        )}
                    </div>

                    <div className="form-group">
                        <label>Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={drive.companyName}
                            onChange={handleChange}
                            placeholder="Enter Company Name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Job Role</label>
                        <input
                            type="text"
                            name="jobRole"
                            value={drive.jobRole}
                            onChange={handleChange}
                            placeholder="Enter Job Role"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Employment Type</label>
                        <select name="employmentType" value={drive.employmentType} onChange={handleChange}>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Internship">Internship</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Package (LPA)</label>
                        <input
                            type="number"
                            step="0.1"
                            name="packageOffered"
                            value={drive.packageOffered}
                            onChange={handleChange}
                            placeholder="Eg. 8.5"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Minimum CGPA</label>
                        <input
                            type="number"
                            step="0.1"
                            name="minCgpa"
                            value={drive.minCgpa}
                            onChange={handleChange}
                            placeholder="Eg. 7.5"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
                            value={drive.department}
                            onChange={handleChange}
                            placeholder="Enter Department"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Maximum Backlogs</label>
                        <input
                            type="number"
                            name="maxBacklogs"
                            value={drive.maxBacklogs}
                            onChange={handleChange}
                            placeholder="Eg. 0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Drive Date</label>
                        <input
                            type="date"
                            name="driveDate"
                            value={drive.driveDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={drive.location}
                            onChange={handleChange}
                            placeholder="Enter Location"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Job Description</label>
                        <textarea
                            name="jobDescription"
                            value={drive.jobDescription}
                            onChange={handleChange}
                            placeholder="Enter detailed job description, responsibilities, and requirements..."
                            rows="5"
                            style={{ width: "100%", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontFamily: "inherit" }}
                        />
                    </div>

                    <button
                        className="save-drive-btn"
                        type="submit"
                        disabled={uploading}
                    >
                        Save Company Drive
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddDrive;