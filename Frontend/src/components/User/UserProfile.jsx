import { useState } from "react"
import { useAuth } from "../../Context/AuthContext"
import styles from "./UserProfile.module.css"
import { FaEdit } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';


export default function UserProfile() {
  const { user, logout, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    setMessage('')
    
    const result = await updateProfile(formData)
    
    if (result.success) {
      setMessage('Profile updated successfully!')
      setIsEditing(false)
    } else {
      setMessage(result.error)
    }
    
    setLoading(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    })
    setIsEditing(false)
    setMessage('')
  }

  if (!user || user.isGuest) {
    return (
      <div className={styles.container}>
        <p>Please log in to view your profile.</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>My Profile</h2>
          {!isEditing && (
            <button 
              className={styles.editBtn}
              onClick={() => setIsEditing(true)}
            >
              <FaEdit /> 
            </button>
          )}
        </div>

        {message && (
          <div className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
            {message}
          </div>
        )}

        <div className={styles.form}>
          <div className={styles.field}>
            <label>Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            ) : (
              <p>{user.name}</p>
            )}
          </div>

          <div className={styles.field}>
            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <p>{user.email}</p>
            )}
          </div>

          <div className={styles.field}>
            <label>Member Since</label>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {isEditing && (
          <div className={styles.actions}>
            <button 
              className={styles.saveBtn}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button 
              className={styles.cancelBtn}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}

        <div className={styles.footer}>
          <button 
            className={styles.logoutBtn}
            onClick={logout}
          >
            <MdLogout />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}