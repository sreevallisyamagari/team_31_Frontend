import { useEffect, useState } from "react";
import {
    submitTicket,
    getStudentTickets
} from "../../services/SupportService";

function HelpSupport() {

    const studentId = localStorage.getItem("userId");

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {

        const response = await getStudentTickets(studentId);

        setTickets(response.data);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await submitTicket({
            studentId,
            subject,
            message
        });

        alert("Support Ticket Submitted Successfully");

        setSubject("");
        setMessage("");

        loadTickets();

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>Help & Support</h2>

            <hr />

            <h3>Placement Cell</h3>

            <p>Email : placement@college.edu</p>

            <p>Phone : +91 9876543210</p>

            <hr />

            <h3>Raise Support Ticket</h3>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{
                        width: "400px",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                    required
                />

                <br />

                <textarea
                    rows="5"
                    cols="60"
                    placeholder="Describe your issue"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit">

                    Submit Ticket

                </button>

            </form>

            <hr />

            <h3>My Support Tickets</h3>

            <table border="1" cellPadding="10">

                <thead>

                    <tr>

                        <th>Subject</th>

                        <th>Message</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        tickets.map(ticket => (

                            <tr key={ticket.id}>

                                <td>{ticket.subject}</td>

                                <td>{ticket.message}</td>

                                <td>{ticket.status}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default HelpSupport;