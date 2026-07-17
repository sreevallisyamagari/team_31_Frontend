import { useEffect, useState } from "react";
import {
    getAllTickets,
    markAsResolved
} from "../../services/SupportService";

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

        <div>

            <h2>Support Tickets</h2>

            <hr />

            <table
                border="1"
                cellPadding="10"
                width="100%"
                style={{ borderCollapse: "collapse" }}
            >

                <thead>

                    <tr>

                        <th>Student ID</th>

                        <th>Subject</th>

                        <th>Message</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        tickets.map(ticket => (

                            <tr key={ticket.id}>

                                <td>{ticket.studentId}</td>

                                <td>{ticket.subject}</td>

                                <td>{ticket.message}</td>

                                <td>{ticket.status}</td>

                                <td>

                                    {

                                        ticket.status === "Pending" ?

                                            <button
                                                onClick={() => resolveTicket(ticket.id)}
                                            >
                                                Resolve
                                            </button>

                                            :

                                            "Completed"

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default AdminNotifications;