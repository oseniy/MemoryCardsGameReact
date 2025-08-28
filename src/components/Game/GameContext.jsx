import { createContext, useContext, useReducer } from "react";
import createCards from "./cardsArray";

const GameContext = createContext();

const initialState = {
    Hps: 0,
    HPsLeft: 0,
    totalPairs: 0,
    pairsFound: 0,
    started: false,
    startTime: null,
    timeSpent: 0,
    difficultyText: "",
    cards: [],
    flippedCards: []
}

function gameReducer(state, action) {
    switch(action.type) {
        case "START_LEVEL":
            return {
                ...state,
                ...action.payload,
                HPsLeft: action.payload.HPs,
                pairsFound: 0,
                started: false,
                timeSpent: 0,
                cards: createCards(action.payload.totalPairs)
            };
        case "FLIP_FIRST":
            return {
                ...state, 
                started: true, 
                startTime: Date.now()

            };
        case "FLIP_CARD":
            if (state.flippedCards.includes(action.index) || 
                state.cards[action.index].matched ||
                state.flippedCards.length == 2) {
                return state;
            }

            return {
                ...state,
                flippedCards: [...state.flippedCards, action.index]
            };
        case "PAIR_FOUND": 
            const updatedCards = state.cards.map((card, i) => 
                state.flippedCards.includes(i) ? {...card, matched: true} : card
            );
            return {
                ...state,
                pairsFound: state.pairsFound + 1,
                cards: updatedCards,
                flippedCards: []
            };
        case "LOSE_HP":
            return {
                ...state,
                HPsLeft: state.HPsLeft - 1,
                flippedCards: []
            };
        case "END_LEVEL":
            return {
                ...state,
                timeSpent: Date.now() - state.startTime, started: false
            };
        default: 
            return state;
    }
}

export function GameProvider({children}) {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    return (
        <GameContext.Provider value={{state, dispatch}}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    return useContext(GameContext);
}