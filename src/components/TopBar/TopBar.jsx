import styles from "./TopBar.module.css";

export default function TopBar({children}) {
    return (
        <div className={styles.TopBar}>
            {children}
        </div>
    )
}