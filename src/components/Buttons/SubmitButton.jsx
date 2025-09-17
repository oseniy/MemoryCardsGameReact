import styles from './Button.module.css';

export default function SubmitButton({text}) {
    return (
        <button className={`${styles.button} font-main`} type="submit"> {text} </button>
    )
}