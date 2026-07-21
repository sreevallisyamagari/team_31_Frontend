import { useEffect, useState } from "react";
import { getResults } from "../../services/StudentService";
import {
    FaAward,
    FaBuilding,
    FaSearch,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaMapMarkerAlt,
    FaBriefcase,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaHashtag
} from "react-icons/fa";

import "./PlacementResults.css";

function PlacementResults() {

    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadResults();
    }, []);

    const loadResults = async () => {

        try {

            const studentId = localStorage.getItem("userId");

            const response = await getResults(studentId);

            setResults(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const filteredResults = results.filter((result) => {

        const driveId = result.drive?.id?.toString() || "";

        return (
            result.status.toLowerCase().includes(search.toLowerCase()) ||
            driveId.includes(search)
        );

    });

    const applied = results.filter(r => r.status === "Applied").length;
    const shortlisted = results.filter(r => r.status === "Shortlisted").length;
    const selected = results.filter(r => r.status === "Selected").length;

    const getStatusBadge = (status) => {

        switch (status) {

            case "Selected":
                return (
                    <span className="selected">
                        <FaCheckCircle /> Selected
                    </span>
                );

            case "Shortlisted":
                return (
                    <span className="shortlisted">
                        <FaCheckCircle /> Shortlisted
                    </span>
                );

            case "Applied":
                return (
                    <span className="applied">
                        <FaClock /> Applied
                    </span>
                );

            default:
                return (
                    <span className="rejected">
                        <FaTimesCircle /> Rejected
                    </span>
                );

        }

    };

    return (

        <div className="placement-container">

            <h1>
                <FaAward /> Placement Results
            </h1>

            <p className="subtitle">
                Track your placement journey.
            </p>

            <div className="stats-grid">

                <div className="stat-card">
                    <h2>{applied}</h2>
                    <span>Applied</span>
                </div>

                <div className="stat-card">
                    <h2>{shortlisted}</h2>
                    <span>Shortlisted</span>
                </div>

                <div className="stat-card">
                    <h2>{selected}</h2>
                    <span>Selected</span>
                </div>

            </div>

            <div className="search-box">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search by Drive ID or Status..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            {

                filteredResults.length === 0 ?

                    <div className="empty-card">

                        No Placement Results Found

                    </div>

                    :

                    filteredResults.map((result) => (

                        <div
                            key={result.id}
                            className="placement-card"
                        >

                            <div className="card-header">

                                <FaBuilding
                                    size={40}
                                    color="#2563eb"
                                />

                                <div>

                                    <h3>

                                        {result.drive?.companyName}

                                    </h3>

                                    <p>

                                        {result.drive?.jobRole}

                                    </p>

                                </div>

                            </div>

                            <div className="card-body">

                                <div className="detail-row">

                                    <FaHashtag />

                                    <span>

                                        <strong>Drive ID :</strong>

                                        {" "}

                                        {result.drive?.id}

                                    </span>

                                </div>

                                <div className="detail-row">

                                    <FaBriefcase />

                                    <span>

                                        <strong>Job Role :</strong>

                                        {" "}

                                        {result.drive?.jobRole}

                                    </span>

                                </div>

                                <div className="detail-row">

                                    <FaMoneyBillWave />

                                    <span>

                                        <strong>Package :</strong>

                                        {" "}

                                        {result.drive?.packageOffered} LPA

                                    </span>

                                </div>

                                <div className="detail-row">

                                    <FaMapMarkerAlt />

                                    <span>

                                        <strong>Location :</strong>

                                        {" "}

                                        {result.drive?.location}

                                    </span>

                                </div>

                                <div className="detail-row">

                                    <FaCalendarAlt />

                                    <span>

                                        <strong>Drive Date :</strong>

                                        {" "}

                                        {result.drive?.driveDate}

                                    </span>

                                </div>

                                <div
                                    style={{
                                        marginTop: "20px"
                                    }}
                                >

                                    {getStatusBadge(result.status)}

                                </div>

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}

export default PlacementResults;