import styles from "./Table.module.css";

export function Table({children}) {
    return (
        <div className={styles.table}>
            {children}
        </div>
    )
}

export function TableRow({children}) {
    return (
        <div className={styles.tableRow}>
            {children}
        </div>       
    )
}

export function TableElement({children}) {
    return (
        <div className={styles.tableElement}>
            {children}
        </div>        
    )
}