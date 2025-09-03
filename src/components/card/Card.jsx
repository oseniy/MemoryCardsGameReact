import { useState } from "react";
import { useGame } from "../Game/GameContext";
import styles from './Card.module.css';

export default function Card({index, color, img, className}) {
    const { state, dispatch } = useGame();
    const flipped = state.flippedCards.includes(index) || state.cards[index].matched;

    function handleClick() {
        dispatch({ type: "FLIP_CARD", index });
        if (!state.started) dispatch({ type: "FLIP_FIRST" });
    }

    return (
        <div className={`${styles.card} ${className} ${flipped ? styles.flipped : ""}`} onClick={handleClick}>
            <div className={styles.cardInner}>
                <div className={styles.cardFront}></div>
                <div className={styles.cardBack} style={{backgroundColor: color, backgroundImage: `url(${img})`}}></div>
            </div>
        </div>
    )
}