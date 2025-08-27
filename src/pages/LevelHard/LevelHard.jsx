import NavButton from '../../components/Buttons/NavButton';
import styles from './LevelHard.module.css';
import Screen from '../../components/Screen/Screen';

export default function Level() {
    return (
        <Screen>
            <p className='font-main'>Сложный</p>
            <NavButton />   
        </Screen>
    )
}