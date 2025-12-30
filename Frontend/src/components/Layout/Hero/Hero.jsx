

import HeroSlider from "../../HeroSlider/HeroSlider";
import Navbar from "../Navbar/Navbar";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <div className={styles.heroContainer}>
            <Navbar />
            <HeroSlider />
        </div>
    );
}