import { useEffect } from "react";
import { CSSTransition } from 'react-transition-group'
import styles from "./Game.module.css";
import { useGame } from "./GameContext";
import Card from "../Card/Card";
import NavButton from '../Buttons/NavButton';
import TextMain from '../Texts/TextMain/TextMain';

export default function Game({difficulty}) {
    const {state, dispatch} = useGame();

    const levelsConfig = {
        easy:   { HPs: 8,  totalPairs: 6, difficultyText: "Лёгкий" },
        normal: { HPs: 14, totalPairs: 9, difficultyText: "Средний" },
        hard:   { HPs: 16, totalPairs: 12, difficultyText: "Сложный" },
    };

    useEffect(() => {
    })

    useEffect(() => {
        if (levelsConfig[difficulty]) {
            dispatch({ type: "START_LEVEL", payload: levelsConfig[difficulty] })
        }
    }, [difficulty]);

    useEffect(() => {
        if (state.flippedCards.length == 2) {
            const [first, second] = state.flippedCards.map(i => state.cards[i]);

            if (first.value == second.value) {
                dispatch({ type: "PAIR_FOUND" });
            } else {
                setTimeout(() => {
                    dispatch({ type: "LOSE_HP" });
                }, 1000)
            }
        }
    }, [state.flippedCards])
    
    useEffect(() => {
        if (state.pairsFound == state.totalPairs) {
            dispatch({ type: "VICTORY" });
            // тут можно вызвать updateBestScore
        }
        if (state.HPsLeft == 0) {
            dispatch({ type: "DEFEAT" });
        }
    }, [state.pairsFound, state.HPsLeft]);


    return (
        <div className={styles.game}>
            <div className={styles.statusBar}>
                <TextMain>Жизней: {state.HPsLeft}</TextMain>
                <TextMain>{state.difficultyText}</TextMain>
            </div>
            <div className={`
                ${styles.cards} 
                ${styles.layout12}
                ${(state.victory || state.defeat) ? "disable" : ""}
                `}>
                {state.cards.map((card, i) => (
                    <Card key={`${card.value}-${i}`} index={i} color={card.color} img={card.img}/>
                ))}
            </div>
            <div className={styles.controlBar}>
                <NavButton text={"пойти нахуй"} path={"/LevelEasy"}/>
                <div className={styles.levelBtnContainer}>
                </div>
            </div>
        </div>
    )
}