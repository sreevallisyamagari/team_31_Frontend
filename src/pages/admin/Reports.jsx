import { useEffect, useState } from "react";
import { getReport } from "../../services/ReportService";

function Reports() {

    const [report, setReport] = useState({});

    useEffect(() => {
        loadReport();
    }, []);

    const loadReport = async () => {

        try {

            const response = await getReport();

            setReport(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <h2>Reports</h2>

            <hr />

            <table
                border="1"
                cellPadding="10"
                width="50%"
            >

                <tbody>

                    <tr>
                        <td>Total Students</td>
                        <td>{report.totalStudents}</td>
                    </tr>

                    <tr>
                        <td>Total Drives</td>
                        <td>{report.totalDrives}</td>
                    </tr>

                    <tr>
                        <td>Total Applications</td>
                        <td>{report.totalApplications}</td>
                    </tr>

                    <tr>
                        <td>Applied</td>
                        <td>{report.applied}</td>
                    </tr>

                    <tr>
                        <td>Shortlisted</td>
                        <td>{report.shortlisted}</td>
                    </tr>

                    <tr>
                        <td>Selected</td>
                        <td>{report.selected}</td>
                    </tr>

                    <tr>
                        <td>Rejected</td>
                        <td>{report.rejected}</td>
                    </tr>

                </tbody>

            </table>

        </div>

    );

}

export default Reports;