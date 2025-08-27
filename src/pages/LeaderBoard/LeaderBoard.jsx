import NavButton from '../../components/Buttons/NavButton';
import styles from './LeaderBoard.module.css';
import Screen from '../../components/Screen/Screen';

export default function Level() {
    return (
        <Screen>
            <p className='font-main'>Лидерборд</p>
            <NavButton />   
        </Screen>
    )
}