import { useEffect, useState } from "react";
import {
    getNotifications,
    markAsRead
} from "../../services/NotificationService";

import {
    FaBell,
    FaCheckCircle,
    FaClock
} from "react-icons/fa";

function Notifications() {

    const studentId = localStorage.getItem("userId");

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = () => {

        getNotifications(studentId)
            .then((response) => {

                setNotifications(response.data);

            })
            .catch(error => console.log(error));

    };

    const handleRead = (id) => {

        markAsRead(id)
            .then(() => loadNotifications());

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                <FaBell /> Notifications
            </h2>

            {

                notifications.length === 0 ?

                    <div className="alert alert-info">

                        No Notifications

                    </div>

                    :

                    notifications.map(notification => (

                        <div
                            key={notification.id}
                            className={`card mb-3 shadow-sm ${notification.read ? "" : "border-primary"}`}
                        >

                            <div className="card-body">

                                <h5>

                                    {

                                        notification.read ?

                                            <FaCheckCircle color="green" />

                                            :

                                            <FaClock color="orange" />

                                    }

                                    {" "}

                                    {notification.title}

                                </h5>

                                <p>{notification.message}</p>

                                <small>

                                    {notification.createdAt}

                                </small>

                                <br />

                                {

                                    !notification.read &&

                                    <button
                                        className="btn btn-primary btn-sm mt-2"
                                        onClick={() => handleRead(notification.id)}
                                    >

                                        Mark as Read

                                    </button>

                                }

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}

export default Notifications;