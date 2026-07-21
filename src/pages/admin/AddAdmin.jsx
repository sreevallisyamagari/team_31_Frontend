import { useEffect, useState } from "react";
import {
    createAdmin,
    getAllAdmins,
    updateAdmin,
    deleteAdmin
} from "../../services/AdminService";

function AddAdmin() {

    const [admin, setAdmin] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const [admins, setAdmins] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadAdmins();
    }, []);

    const loadAdmins = async () => {
        try {
            const response = await getAllAdmins();
            setAdmins(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await updateAdmin(editingId, admin);

                alert("Admin Updated Successfully");

            } else {

                await createAdmin(admin);

                alert("Admin Created Successfully");
            }

            setAdmin({
                name: "",
                email: "",
                password: "",
                phone: ""
            });

            setEditingId(null);

            loadAdmins();

        } catch (error) {

            alert(error.response?.data || "Operation Failed");

        }
    };

    const handleEdit = (item) => {

        setEditingId(item.id);

        setAdmin({
            name: item.name,
            email: item.email,
            password: "",
            phone: item.phone
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this admin?");

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteAdmin(id);

            alert("Admin Deleted Successfully");

            loadAdmins();

        } catch (error) {

            alert("Failed to Delete Admin");

        }
    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">Manage Admins</h2>

            <div className="card p-4 shadow-sm mb-4">

                <h4 className="mb-3">

                    {editingId ? "Edit Admin" : "Add New Admin"}

                </h4>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter Name"
                            value={admin.name}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={admin.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder={
                                editingId
                                    ? "Leave blank to keep current password"
                                    : "Enter Password"
                            }
                            value={admin.password}
                            onChange={handleChange}
                            required={!editingId}
                        />

                    </div>

                    <div className="mb-3">

                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="Enter Phone Number"
                            value={admin.phone}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button className="btn btn-primary">

                        {editingId ? "Update Admin" : "Create Admin"}

                    </button>

                    {
                        editingId && (

                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => {

                                    setEditingId(null);

                                    setAdmin({
                                        name: "",
                                        email: "",
                                        password: "",
                                        phone: ""
                                    });

                                }}
                            >
                                Cancel
                            </button>

                        )
                    }

                </form>

            </div>

            <div className="card shadow-sm">

                <div className="card-header">

                    <h4 className="mb-0">All Admins</h4>

                </div>

                <div className="card-body">

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                admins.length > 0 ?

                                    admins.map((item) => (

                                        <tr key={item.id}>

                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center"
                                        >
                                            No Admins Found
                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default AddAdmin;