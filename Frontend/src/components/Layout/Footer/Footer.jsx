import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.column}>
          <h4>Customer Care</h4>
          <ul>
            <li>Help Center</li>
            <li>How to Buy</li>
            <li>Returns & Refunds</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Daraz</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Daraz Blog</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Payment Methods</h4>
          <p>Cash on Delivery</p>
          <p>Visa / MasterCard</p>
          <p>EasyPaisa / JazzCash</p>
        </div>

        <div className={styles.column}>
          <h4>Follow Us</h4>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} Daraz Clone. All Rights Reserved.
      </div>
    </footer>
  )
}
