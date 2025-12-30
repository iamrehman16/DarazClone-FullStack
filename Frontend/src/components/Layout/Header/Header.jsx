import styles from "./Header.module.css"
import { FiSearch, FiPhone, FiMail } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import UserMenu from "../../User/UserMenu"

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo} onClick={()=>navigate("/")}>daraz</div>

      {/* Search */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search in Daraz"
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>
          <FiSearch size={18} />
        </button>
      </div>

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
