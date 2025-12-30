import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"
import styles from "./ProtectedRoute.module.css"

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className={styles.loader}>
        <p>Loading...</p>
      </div>
    )
  }

  if (!user || user.isGuest) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}