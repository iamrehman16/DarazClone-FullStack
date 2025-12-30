import styles from "./Main.module.css";
import Hero from "../Hero/Hero.jsx";
import Categories from "../../Categories/Categories.jsx";
import Products from "../../Products/Products.jsx";

export default function Main() {
  return (
    <main className={styles.main}>
      <Hero />
      <Categories />
      <Products />
    </main>
  );
}