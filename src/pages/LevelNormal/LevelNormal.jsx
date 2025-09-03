import NavButton from '../../components/Buttons/NavButton';
import styles from './LevelNormal.module.css';
import Screen from '../../components/Screen/Screen';
import Game from '../../components/Game/Game';

export default function Level() {
    return (
        <Screen>
            <Game difficulty={"normal"}/>
        </Screen>
    )
}