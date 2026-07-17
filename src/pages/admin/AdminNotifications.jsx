import { useEffect, useState } from "react";
import {
    getAllTickets,
    markAsResolved
} from "../../services/SupportService";

import {
    FaUserGraduate,
    FaEnvelope,
    FaCommentDots,
    FaCheckCircle,
    FaTools
} from "react-icons/fa";

import "./AdminNotifications.css";

function AdminNotifications() {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {

        try {

            const response = await getAllTickets();

            setTickets(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const resolveTicket = async (id) => {

        try {

            await markAsResolved(id);

            alert("Ticket Resolved");

            loadTickets();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="support-container">

            <div className="support-header">

                <div>

                    <h1>Support Tickets</h1>

                    <p>
                        Review and resolve support requests submitted by students.
                    </p>

                </div>

            </div>

            {

                tickets.length === 0 ?

                    <div className="empty-card">

                        <h3>No Support Tickets</h3>

                        <p>
                            All support requests have been resolved.
                        </p>

                    </div>

                    :

                    <div className="support-grid">

                        {

                            tickets.map(ticket => (

                                <div
                                    key={ticket.id}
                                    className="support-card"
                                >

                                    <div className="ticket-title">

                                        <FaUserGraduate />

                                        <h2>

                                            Student ID : {ticket.studentId}

                                        </h2>

                                    </div>

                                    <p>

                                        <FaEnvelope />

                                        <strong>Subject :</strong>

                                        {ticket.subject}

                                    </p>

                                    <p className="message">

                                        <FaCommentDots />

                                        <strong>Message :</strong>

                                        {ticket.message}

                                    </p>

                                    <div className={`status-badge ${ticket.status.toLowerCase()}`}>

                                        <FaCheckCircle />

                                        {ticket.status}

                                    </div>

                                    {

                                        ticket.status === "Pending" ?

                                            <button
                                                className="resolve-btn"
                                                onClick={() => resolveTicket(ticket.id)}
                                            >

                                                <FaTools />

                                                Resolve Ticket

                                            </button>

                                            :

                                            <button
                                                className="completed-btn"
                                                disabled
                                            >

                                                <FaCheckCircle />

                                                Completed

                                            </button>

                                    }

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

}

export default AdminNotifications;