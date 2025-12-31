import { useState, useEffect, useRef } from "react"
import styles from "./HeroSlider.module.css"
import image1 from "../../assets/image1.png"
import image2 from "../../assets/image2.png"
import image3 from "../../assets/image3.png"

const SLIDES = [
  {
    id: 1,
    image: image1,
    link: "https://www.daraz.com/",
    alt: "Daraz banner 1"
  },
  {
    id: 2,
    image: image2,
    alt: "Daraz banner 2",
    link: "https://www.daraz.com/"
  },
  {
    id: 3,
    image: image3,
    link: "https://www.daraz.com/",
    alt: "Daraz banner 3"
  }
]

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  // Auto-play
  useEffect(() => {
    if (paused) return

    intervalRef.current = setInterval(() => {
      setIndex(i => (i + 1) % SLIDES.length)
    }, 3000)

    return () => clearInterval(intervalRef.current)
  }, [paused])

  // Go to slide
  const goTo = (i) => {
    setIndex(i)
  }

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {SLIDES.map((s, i) => (
        <a
          key={s.id}
          href={s.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.slide} ${i === index ? styles.active : ''}`}
          aria-hidden={i !== index}
        >
          <img src={s.image} alt={s.alt || `Slide ${i + 1}`} className={styles.img} />
        </a>
      ))}

      <div className={styles.dots} role="tablist" aria-label="Slide navigation">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.activeDot : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </section>
  )
} 
