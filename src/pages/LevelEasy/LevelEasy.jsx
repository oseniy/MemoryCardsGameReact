import NavButton from '../../components/Buttons/NavButton';
import styles from './LevelEasy.module.css';
import Screen from '../../components/Screen/Screen';
import Game from '../../components/Game/Game';

export default function Level() {
    return (
        <Screen>
            <Game difficulty={"easy"}/>
        </Screen>
    )
}