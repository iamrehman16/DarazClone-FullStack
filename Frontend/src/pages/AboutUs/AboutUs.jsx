import styles from "./AboutUs.module.css"

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Us</h1>

      {/* Company Story */}
      <section className={styles.section}>
        <h2>Our Story</h2>
        <p>
          Daraz is a leading e-commerce platform committed to delivering a seamless
          shopping experience to millions of customers. We provide a wide range of
          products from electronics to fashion, ensuring quality and convenience.
        </p>
      </section>

      {/* Mission / Vision */}
      <section className={styles.section}>
        <h2>Our Mission</h2>
        <p>
          To make online shopping accessible, enjoyable, and trustworthy for everyone.
        </p>
      </section>

      {/* Key Stats */}
      <section className={styles.stats}>
        <div className={styles.statCard}>
          <h3>10M+</h3>
          <p>Products Sold</p>
        </div>
        <div className={styles.statCard}>
          <h3>5M+</h3>
          <p>Happy Customers</p>
        </div>
        <div className={styles.statCard}>
          <h3>100+</h3>
          <p>Brands</p>
        </div>
      </section>
    </div>
  )
}
