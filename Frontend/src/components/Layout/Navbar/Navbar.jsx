import { useNavigate } from "react-router-dom"
import styles from "./Navbar.module.css"

const categories = [
  "Mobile Phones",
  "Electronics",
  "Home & Living",
  "Fashion",
  "Beauty",
  "Toys",
  "Sports",
  "Automotive",
  "Grocery",
  "Women's Fashion",
  "Men Accessories",
  "Children Toys",
  "Winter Clothes",
  "Sports and Games"
]

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {categories.map((cat, index) => (
          <li
            key={index}
            className={styles.navItem}
            onClick={() => navigate(`/category/${encodeURIComponent(cat)}`)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </nav>
  )
}
