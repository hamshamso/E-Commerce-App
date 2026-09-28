import { useState, useEffect } from "react";
import { getAllUsers, addNewUser } from "../services/api";
import "../styles/Users.css";

export function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "",
    });

    const handleFormChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const resetForm = () => {
        setFormData({ name: "", email: "", password: "", phone: "", role: "" });
        setFormError("");
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        setFormError("");
        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            const data = await addNewUser(token,formData);
            console.log(data)
            setUsers((prev) => [...prev, data.data]);
            setShowModal(false);
            resetForm();
        } catch (err) {
            console.error("Failed to add user", err);
            setFormError(err.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(false);
                const token = localStorage.getItem("token");
                const data = await getAllUsers(token);
                setUsers(data.allUsers || []);
            } catch (err) {
                console.error("Error fetching users", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
            query === "" ||
            user.name?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query) ||
            user.phone?.toLowerCase().includes(query);

        const matchesRole = roleFilter === "all" || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })
            : "N/A";

    if (loading) return <h1 className="usr-loading">Loading users...</h1>;
    if (error) return <h1 className="usr-error">Error loading users!</h1>;

    return (
        <div className="usr-page">
            <div className="usr-container">
                <div className="usr-search-section">
                    <div className="usr-filter-group usr-filter-search">
                        <label className="usr-filter-label">Search</label>
                        <input
                            type="text"
                            className="usr-filter-input"
                            placeholder="Search by name, email or phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="usr-filter-group">
                        <label className="usr-filter-label">Role</label>
                        <select
                            className="usr-filter-select"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="all">All roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                </div>

                <h1 className="usr-title">Users</h1>

                <div className="usr-table-wrapper">
                    <table className="usr-table">
                        <thead>
                            <tr className="usr-head-row">
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Created</th>
                                <th>Last Login</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="usr-row">
                                        <td>
                                            <p className="usr-name">{user.name}</p>
                                        </td>
                                        <td>
                                            <p className="usr-email">{user.email}</p>
                                        </td>
                                        <td>
                                            <p className="usr-phone">{user.phone || "N/A"}</p>
                                        </td>
                                        <td>
                                            <span className={`usr-role usr-role-${user.role}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <p className="usr-date">{formatDate(user.createdAt)}</p>
                                        </td>
                                        <td>
                                            <p className="usr-date">{formatDate(user.lastLogin)}</p>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="usr-empty">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <button type="button" className="usr-add-btn" onClick={() => setShowModal(true)}>
                    + Add New User
                </button>
                {showModal && (
    <div className="usr-modal-overlay" onClick={() => setShowModal(false)}>
        <div className="usr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="usr-modal-header">
                <h2>Add New User</h2>
                <button
                    type="button"
                    className="usr-modal-close"
                    onClick={() => setShowModal(false)}
                >
                    ✕
                </button>
            </div>

            <form className="usr-modal-form" onSubmit={handleAddUser}>
                {formError && <p className="usr-modal-error">{formError}</p>}

                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                    />
                </div>

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                    />
                </div>

                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        required
                        minLength={6}
                    />
                </div>

                <div className="field">
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleFormChange}
                        required
                    />
                </div>

                <div className="field">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleFormChange}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button type="submit" className="usr-modal-submit" disabled={submitting}>
                    {submitting ? "Creating..." : "Create User"}
                </button>
            </form>
        </div>
    </div>
)}
            </div>
        </div>
    );
}

export default Users;