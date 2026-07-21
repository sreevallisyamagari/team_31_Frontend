import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDriveById } from "../../services/DriveService";
import { applyForDrive } from "../../services/ApplicationService";
import toast from "react-hot-toast";
import { 
    FaBuilding, 
    FaMapMarkerAlt, 
    FaMoneyBillWave, 
    FaGraduationCap, 
    FaCalendarAlt, 
    FaBriefcase,
    FaArrowLeft,
    FaExclamationTriangle,
    FaCheckCircle,
    FaTimes,
    FaFileContract,
    FaCheckSquare
} from "react-icons/fa";
import "./CompanyDriveDetails.css";

import { getCompanyLogoUrl } from "../../utils/logoUtils";

function CompanyDriveDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [drive, setDrive] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [applying, setApplying] = useState(false);
    
    const studentId = localStorage.getItem("userId");

    useEffect(() => {
        loadDrive();
    }, [id]);

    const loadDrive = async () => {
        try {
            const response = await getDriveById(id);
            setDrive(response.data);
            setLoading(false);
        } catch (error) {
            toast.error("Failed to load drive details");
            setLoading(false);
        }
    };

    const handleConfirmApply = async () => {
        if (!agreedToTerms) {
            toast.error("Please accept the terms and conditions to proceed.");
            return;
        }

        try {
            setApplying(true);
            await applyForDrive({
                studentId: studentId,
                driveId: drive.id
            });
            toast.success(`Successfully applied to ${drive.companyName}!`);
            setShowApplyModal(false);
            setAgreedToTerms(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to apply");
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <div className="loading-container"><div className="loader-spinner" /><span>Loading Company Details...</span></div>;
    if (!drive) return <div className="error-container">Company Drive Not Found</div>;

    const logo = getCompanyLogoUrl(drive.logoUrl, drive.companyName);

    return (
        <div className="drive-details-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Back to Drives
            </button>
            
            <div className="details-header">
                {logo ? (
                    <img src={logo} alt={drive.companyName} className="company-logo-large" style={{ objectFit: 'contain', background: 'white' }} />
                ) : (
                    <div className="company-logo-placeholder-large">
                        <FaBuilding />
                    </div>
                )}
                <div className="header-info">
                    <h1>{drive.companyName}</h1>
                    <h2>{drive.jobRole}</h2>
                    <span className="employment-badge">{drive.employmentType || "Full-Time"}</span>
                </div>
                <button className="apply-btn-large" onClick={() => setShowApplyModal(true)}>
                    <FaCheckCircle /> Apply Now
                </button>
            </div>

            <div className="details-grid">
                <div className="main-content">
                    <section className="jd-section">
                        <h3><FaBriefcase /> Job Description & Requirements</h3>
                        <div className="jd-content">
                            {drive.jobDescription ? (
                                <p style={{ whiteSpace: "pre-line" }}>{drive.jobDescription}</p>
                            ) : (
                                <p className="text-muted">No detailed job description provided by employer.</p>
                            )}
                        </div>
                    </section>
                </div>
                
                <div className="side-content">
                    <div className="info-card">
                        <h3>Key Details</h3>
                        <div className="info-item">
                            <FaMoneyBillWave className="icon text-green" />
                            <div>
                                <span className="label">Package Offered</span>
                                <span className="value">{drive.packageOffered} LPA</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaMapMarkerAlt className="icon text-blue" />
                            <div>
                                <span className="label">Location</span>
                                <span className="value">{drive.location}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaCalendarAlt className="icon text-orange" />
                            <div>
                                <span className="label">Drive Date</span>
                                <span className="value">{drive.driveDate || "To be announced"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="info-card eligibility-card">
                        <h3>Eligibility Criteria</h3>
                        <div className="info-item">
                            <FaGraduationCap className="icon text-purple" />
                            <div>
                                <span className="label">Eligible Branches</span>
                                <span className="value">{drive.department}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaGraduationCap className="icon text-blue" />
                            <div>
                                <span className="label">Minimum CGPA</span>
                                <span className="value">{drive.minCgpa}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaExclamationTriangle className="icon text-red" />
                            <div>
                                <span className="label">Maximum Backlogs Allowed</span>
                                <span className="value">{drive.maxBacklogs}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pod.ai-inspired Terms & Conditions Application Modal */}
            {showApplyModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title-group">
                                <FaFileContract className="modal-icon" />
                                <div>
                                    <h3>Confirm Application</h3>
                                    <p>{drive.companyName} • {drive.jobRole}</p>
                                </div>
                            </div>
                            <button className="close-modal-btn" onClick={() => setShowApplyModal(false)}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="summary-banner">
                                <div className="summary-item">
                                    <span className="summary-label">Role Type</span>
                                    <span className="summary-val">{drive.employmentType || 'Full-Time'}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Package</span>
                                    <span className="summary-val">{drive.packageOffered} LPA</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Location</span>
                                    <span className="summary-val">{drive.location}</span>
                                </div>
                            </div>

                            <h4>Terms & Conditions Declaration</h4>
                            <div className="terms-scroll-box">
                                <ul>
                                    <li>I confirm that my academic CGPA, department, and active backlog records are accurate in my profile.</li>
                                    <li>I agree to participate in all selection process rounds (Aptitude, Technical & HR interviews) conducted by {drive.companyName}.</li>
                                    <li>I understand that withdrawing from the recruitment process after shortlisting without a valid reason may result in debarment as per the college placement guidelines.</li>
                                    <li>I consent to sharing my profile and uploaded resume with {drive.companyName} for evaluation.</li>
                                </ul>
                            </div>

                            <label className="terms-checkbox-label">
                                <input 
                                    type="checkbox" 
                                    checked={agreedToTerms} 
                                    onChange={(e) => setAgreedToTerms(e.target.checked)} 
                                />
                                <span>I have read, understood, and agree to the Terms & Conditions and Placement Policy.</span>
                            </label>
                        </div>

                        <div className="modal-footer">
                            <button 
                                className="cancel-modal-btn" 
                                onClick={() => setShowApplyModal(false)}
                                disabled={applying}
                            >
                                Cancel
                            </button>
                            <button 
                                className="confirm-modal-btn"
                                onClick={handleConfirmApply}
                                disabled={!agreedToTerms || applying}
                            >
                                {applying ? "Submitting Application..." : "Confirm & Submit Application"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompanyDriveDetails;
