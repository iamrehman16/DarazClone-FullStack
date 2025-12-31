import styles from "./Header.module.css"
import { FiSearch, FiPhone, FiMail } from "react-icons/fi"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UserMenu from "../../User/UserMenu"

export default function Header() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo} onClick={()=>navigate("/")}>daraz</div>

      {/* Search */}
      <form
        className={styles.searchContainer}
        onSubmit={(e) => {
          e.preventDefault()
          if (searchTerm && searchTerm.trim()) {
            navigate(`/category/${encodeURIComponent(searchTerm.trim())}`)
          }
        }}
      >
        <input
          type="text"
          placeholder="Search in Daraz"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.searchButton} type="submit" aria-label="Search">
          <FiSearch size={18} />
        </button>
      </form>

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.navBtn} onClick={() => navigate("/about")}>
          <FiMail size={16} />
          <span>About Us</span>
        </button>
        <button className={styles.navBtn} onClick={() => navigate("/contact")}>
          <FiPhone size={16} />
          <span>Contact Us</span>
        </button>
        
        <UserMenu />
      </div>
    </header>
  )
}
