import styles from './Button.module.css';

export default function Button({text, onClick}) {
    return (
        <button className={`${styles.button} font-main`} onClick={onClick}> {text} </button>
    )
}