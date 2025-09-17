import styles from "./Input.module.css";

export default function Input({className = "", ...props}) {
    return (
        <input className={` ${className} ${styles.Input}`} {...props}/>
    )
}