import { useEffect, useRef, useState} from "react";
import { CSSTransition } from 'react-transition-group'
import styles from "./Game.module.css";
import { useGame } from "./GameContext";
import { useUserData } from '../../services/UserDataContext';
import Card from "./Card/Card";
import NavButton from '../Buttons/NavButton';
import TextMain from '../Texts/TextMain/TextMain';
import OverlayText from "../Texts/OverlayText/OverlayText";
import { auth } from "../../services/firebase";
import { updateBestScore } from "../../services/db";


export default function Game({difficulty}) {
    const {state, dispatch} = useGame();
    const nodeRef = useRef(null);
    const {userData} = useUserData();
    const [isWide, setIsWide] = useState(window.innerWidth / window.innerHeight > 0.6);

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
        const handleResize = () => {
        setIsWide(window.innerWidth / window.innerHeight > 0.6);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
            dispatch({ type: "ENDGAME" });
        } else if (state.HPsLeft == state.HPs-1) {
            dispatch({ type: "ENDGAME" });
        }        
    }, [state.pairsFound, state.HPsLeft])

    useEffect(() => {
        const saveScore = async () => {
            try {
                dispatch({type: "NEWBEST"});
                await updateBestScore(
                    auth.currentUser.uid,
                    state.bestScoreKey,
                    state.score,
                    state.HPsLeft,
                    state.timeSpent
                )
            } catch(error) {
                console.error("ошибка сохранения рекорда", error)
            };
        };
        
        const best = userData?.[state?.bestScoreKey]?.score;

        if (state.HPsLeft === state.HPs-1) {
            dispatch({ type: "DEFEAT" });
            return;
        }

        if (state.pairsFound === state.totalPairs) {
            if (userData) {
                const isBetterScore = !best || state.score < best;
                if (isBetterScore) {
                    saveScore();
                    return;
                }
            }
            dispatch({ type: "VICTORY" });
        }
  

    }, [state.endGame])

    let endGameBtn = <NavButton text={"Попробовать ещё раз"} path={state.currentPath}/>;
    if ((state.endGameResult == "victory" || state.endGameResult == "newBest") && state.nextPath) {
        endGameBtn = <NavButton text={"Следующий уровень"} path={state.nextPath}/>
    }

    return (
        <>
            <div className={styles.statusBar}>
                {isWide ? <TextMain>Жизней: {state.HPsLeft}</TextMain> : <TextMain>Жизней: <br/>{state.HPsLeft}</TextMain>}
                <TextMain>{state.difficultyText}</TextMain>
            </div>
            <div className={`${styles.game} ${gameLayout[difficulty]}`}>
                <div className={styles.cardsContainer}>
                    <div className={`layout 
                        ${styles.cards}
                        ${(state.endGame) ? "disable" : ""}
                        `}>
                        {state.cards.map((card, i) => (
                            <Card key={`${card.value}-${i}`} index={i} color={card.color} img={card.img} className={styles.positionCard}/>
                        ))}
                    </div>
                        <OverlayText show={state.endGameResult == "newBest"}>Победа!<br/>Новый рекорд!</OverlayText>
                        <OverlayText show={state.endGameResult == "victory"}>Победа!</OverlayText>
                        <OverlayText show={state.endGameResult == "defeat"}>Поражение(</OverlayText>
                </div>
                <div className={styles.controlBar}>
                    <NavButton />
                    <div className={styles.levelBtnContainer}>
                    <CSSTransition
                            in={state.endGame}
                            timeout={300}
                            classNames="slide"
                            nodeRef={nodeRef}
                    >
                        <div ref={nodeRef} style={{ visibility: state.endGame ? "visible" : "hidden" }}>
                            {endGameBtn}
                        </div>
                    </CSSTransition>
                    </div>
                </div>
            </div>
        </>
    )
}