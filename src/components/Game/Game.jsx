import { useEffect, useRef} from "react";
import { CSSTransition } from 'react-transition-group'
import styles from "./Game.module.css";
import { useGame } from "./GameContext";
import { useAuth } from "../../services/authContext";
import Card from "./Card/Card";
import NavButton from '../Buttons/NavButton';
import TextMain from '../Texts/TextMain/TextMain';
import OverlayText from "../Texts/OverlayText/OverlayText";
import { auth } from "../../services/firebase";
import { updateBestScore } from "../../services/db";


export default function Game({difficulty}) {
    const {state, dispatch} = useGame();
    const {user} = useAuth()
    const nodeRef = useRef(null);

    const levelsConfig = {
        easy:   { HPs: 10,  totalPairs: 6, difficultyText: "Лёгкий",
                currentPath: '/LevelEasy', nextPath: '/LevelNormal', HPsPenalty: 2600, bestScoreKey: "bestScoreEasy"},
        normal: { HPs: 14, totalPairs: 9, difficultyText: "Средний", 
                currentPath: '/LevelNormal', nextPath: '/LevelHard', HPsPenalty: 3000, bestScoreKey: "bestScoreNormal"},
        hard:   { HPs: 16, totalPairs: 12, difficultyText: "Сложный",
                currentPath: '/LevelHard', nextPath: '', HPsPenalty: 5400, bestScoreKey: "bestScoreHard"},
    };

    const gameLayout = {    
        easy: styles.gameEasy, 
        normal: styles.gameNormal,
        hard: styles.gameHard
    }

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
        }
        if (state.HPsLeft == 0) {
            dispatch({ type: "DEFEAT" });
        }
    }, [state.pairsFound, state.HPsLeft]);

    useEffect(() => {
        if (!state.victory || !user) return;

        const saveScore = async () => {
            try {
                const best = user[state.bestScoreKey]?.score;
                if (!best || state.score < best) {
                    await updateBestScore(
                        auth.currentUser.uid,
                        state.bestScoreKey,
                        state.score,
                        state.HPsLeft,
                        state.timeSpent
                    )
                };
            } catch(error) {
                console.error("ошибка сохранения рекорда", error)
            };
        };

        saveScore();
    }, [state.victory, user])

    let endGameBtn = <NavButton text={"Попробовать ещё раз"} path={state.currentPath}/>;
    if (state.victory && state.nextPath) {
        endGameBtn = <NavButton text={"Следующий уровень"} path={state.nextPath}/>
    }

    return (
        <div className={`${styles.game} ${gameLayout[difficulty]}`}>
            <div className={styles.statusBar}>
                <TextMain>Жизней: {state.HPsLeft}</TextMain>
                <TextMain>{state.difficultyText}</TextMain>
            </div>
            <div className={styles.cardsContainer}>
                <div className={`layout 
                    ${styles.cards}
                    ${(state.victory || state.defeat) ? "disable" : ""}
                    `}>
                    {state.cards.map((card, i) => (
                        <Card key={`${card.value}-${i}`} index={i} color={card.color} img={card.img} className={styles.positionCard}/>
                    ))}
                </div>
                    <OverlayText show={state.victory}>Победа!</OverlayText>
                    <OverlayText show={state.defeat}>Поражение(</OverlayText>
            </div>
            <div className={styles.controlBar}>
                <NavButton />
                <div className={styles.levelBtnContainer}>
                   <CSSTransition
                        in={state.victory || state.defeat}
                        timeout={300}
                        classNames="slide"
                        nodeRef={nodeRef}
                   >
                    <div ref={nodeRef} style={{ visibility: state.victory || state.defeat ? "visible" : "hidden" }}>
                        {endGameBtn}
                    </div>
                   </CSSTransition>
                </div>
            </div>
        </div>
    )
}