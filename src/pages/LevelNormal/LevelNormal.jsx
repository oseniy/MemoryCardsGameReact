import NavButton from '../../components/Buttons/NavButton';
import styles from './LevelNormal.module.css';
import Screen from '../../components/Screen/Screen';

export default function Level() {
    return (
        <Screen>
            <p className='font-main'>Средний</p>
            <NavButton />   
        </Screen>
    )
}