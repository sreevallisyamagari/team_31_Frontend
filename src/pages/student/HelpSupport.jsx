import { useEffect, useState } from "react";
import {
    submitTicket,
    getStudentTickets
} from "../../services/SupportService";

import {
    FaLifeRing,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaTimesCircle
} from "react-icons/fa";

import "./HelpSupport.css";

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

        <div className="support-container">

            <h1>
                <FaLifeRing /> Help & Support
            </h1>

            <p className="subtitle">
                Need assistance? Contact the Placement Cell or raise a support ticket.
            </p>

            <div className="support-grid">

                <div className="contact-card">

                    <h2>Placement Cell</h2>

                    <p>
                        <FaEnvelope />
                        placement@college.edu
                    </p>

                    <p>
                        <FaPhoneAlt />
                        +91 9876543210
                    </p>

                    <p>
                        <FaMapMarkerAlt />
                        Placement Office, Admin Block
                    </p>

                </div>

                <div className="ticket-form-card">

                    <h2>Raise Support Ticket</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            placeholder="Enter Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />

                        <textarea
                            rows="5"
                            placeholder="Describe your issue..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />

                        <button type="submit">

                            <FaPaperPlane />

                            Submit Ticket

                        </button>

                    </form>

                </div>

            </div>

            <h2 className="ticket-title">

                <FaClipboardList />

                My Support Tickets

            </h2>

            {

                tickets.length === 0 ?

                    <div className="empty-card">

                        No Support Tickets Found

                    </div>

                    :

                    tickets.map(ticket => (

                        <div
                            key={ticket.id}
                            className="ticket-card"
                        >

                            <h3>

                                {ticket.subject}

                            </h3>

                            <p>

                                {ticket.message}

                            </p>

                            {

                                ticket.status === "Resolved" &&

                                <span className="resolved">

                                    <FaCheckCircle />

                                    Resolved

                                </span>

                            }

                            {

                                ticket.status === "Pending" &&

                                <span className="pending">

                                    <FaClock />

                                    Pending

                                </span>

                            }

                            {

                                ticket.status === "Rejected" &&

                                <span className="rejected">

                                    <FaTimesCircle />

                                    Rejected

                                </span>

                            }

                        </div>

                    ))

            }

        </div>

    );

}

export default HelpSupport;