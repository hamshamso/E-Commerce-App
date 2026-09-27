import { useState, useEffect } from "react";
import { getAllUsers } from "../services/api";
import "../styles/Users.css";

export function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

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

                <button type="button" className="usr-add-btn">
                    + Add New User
                </button>
            </div>
        </div>
    );
}

export default Users;