import styles from "./ContactUs.module.css"
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi"

export default function ContactUs() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>

      {/* Contact Info Section */}
      <div className={styles.infoSection}>
        <div className={styles.infoCard}>
          <FiMail size={24} />
          <div>
            <h3>Email</h3>
            <p>
              <a href="mailto:support@daraz.com">support@daraz.com</a>
            </p>
          </div>
        </div>

        <div className={styles.infoCard}>
          <FiPhone size={24} />
          <div>
            <h3>Phone</h3>
            <p>
              <a href="tel:+923001234567">+92 300 1234567</a>
            </p>
          </div>
        </div>

        <div className={styles.infoCard}>
          <FiMapPin size={24} />
          <div>
            <h3>Address</h3>
            <p>123 Daraz Street, Karachi, Pakistan</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className={styles.formContainer}>
        <h2>Send us a Message</h2>
        <form className={styles.form} onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows={5} required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  )
}
