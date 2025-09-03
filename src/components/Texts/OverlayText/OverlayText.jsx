import { useRef } from "react";
import { CSSTransition } from 'react-transition-group'
import Header from "../Header/Header";
import styles from "./OverlayText.module.css"

export default function OverlayText({show, children}) {
    const nodeRef = useRef(null);
    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames="fade"
            nodeRef={nodeRef}
            unmountOnExit
        >
            <div ref={nodeRef} className={styles.overlayText}>
                <Header>{children}</Header>
            </div>
        </CSSTransition>
    )
}