import { Link, useLocation, useNavigate } from "react-router";
import styles from './Button.module.css';

export default function NavButton({text, path}) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        const segments = location.pathname.split("/").filter(Boolean);
        segments.pop();
        const newPath = "/" + segments.join("/");
        navigate(newPath)
    }

    if (path) {
        return (
            <Link className={`${styles.button} font-main`} to={path}>
                {text}
            </Link>
        )
    }

    return (
        <button className={`${styles.button} font-main`} onClick={handleGoBack}>
            {text || 'Назад'}
        </button>
    )
}