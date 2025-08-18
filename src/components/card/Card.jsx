import styles from './Card.module.css';

export default function Card({color, img}) {
    return (
        <div className={styles.card}>
            <div className={styles.cardInner}>
                <div className={styles.cardFront}></div>
                <div className={styles.cardBack} style={{backgroundColor: color, backgroundImage: img}}></div>
            </div>
        </div>
    )
}