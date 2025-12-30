import styles from "./InputField.module.css"

export default function InputField({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  )
}
