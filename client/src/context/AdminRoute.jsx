import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

export function AdminRoute({ children }) {
    const { user, isAdmin } = useAuth(); 
    
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    //React will rerender this function loading when state is update (user is fetched)
    if (!user) {
        return <div className="loading">Loading...</div>; 
    }

    if (!isAdmin()) {
        return <Navigate to="/" replace />; 
    }

    return children;
}