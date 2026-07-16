import { useEffect, useState } from "react";
import { getResults } from "../../services/StudentService";

function PlacementResults() {

    const [results, setResults] = useState([]);

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

    return (

        <div style={{ padding: "30px" }}>

            <h2>Placement Results</h2>

            <hr />

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr>

                        <th>Application ID</th>
                        <th>Drive ID</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {results.map((result) => (

                        <tr key={result.id}>

                            <td>{result.id}</td>

                            <td>{result.driveId}</td>

                            <td>{result.status}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default PlacementResults;