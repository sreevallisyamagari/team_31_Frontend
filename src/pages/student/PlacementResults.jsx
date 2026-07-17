import { useEffect, useState } from "react";
import { getResults } from "../../services/StudentService";
import {
    FaAward,
    FaBuilding,
    FaSearch,
    FaCheckCircle,
    FaClock,
    FaTimesCircle
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

        return (
            result.status.toLowerCase().includes(search.toLowerCase()) ||
            result.driveId.toString().includes(search)
        );

    });

    const applied = results.filter(r => r.status === "Applied").length;
    const shortlisted = results.filter(r => r.status === "Shortlisted").length;
    const selected = results.filter(r => r.status === "Selected").length;

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
                                    size={35}
                                    color="#2563eb"
                                />

                                <div>

                                    <h3>

                                        Application #{result.id}

                                    </h3>

                                    <p>

                                        Drive ID : {result.driveId}

                                    </p>

                                </div>

                            </div>

                            <div className="card-body">

                                <strong>Status</strong>

                                <br /><br />

                                {

                                    result.status === "Selected" &&

                                    <span className="selected">

                                        <FaCheckCircle />

                                        {" "}

                                        Selected

                                    </span>

                                }

                                {

                                    result.status === "Shortlisted" &&

                                    <span className="shortlisted">

                                        <FaCheckCircle />

                                        {" "}

                                        Shortlisted

                                    </span>

                                }

                                {

                                    result.status === "Applied" &&

                                    <span className="applied">

                                        <FaClock />

                                        {" "}

                                        Applied

                                    </span>

                                }

                                {

                                    result.status === "Rejected" &&

                                    <span className="rejected">

                                        <FaTimesCircle />

                                        {" "}

                                        Rejected

                                    </span>

                                }

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}

export default PlacementResults;