import styles from './Home.module.css';
import NavButton from '../../components/Buttons/NavButton';
import Screen from '../../components/Screen/Screen';
import Header from '../../components/Texts/Header/Header';
import TextSmallPale from '../../components/Texts/TextSmallPale/TextSMallPale';

export default function Home() {
    return (
        <Screen>  
            <Header>Ёжки-мышки</Header>
            <TextSmallPale>Выберите уровень</TextSmallPale>
            <NavButton text={"Легкий"} path={"/LevelEasy"} />
            <NavButton text={"Средний"} path={"/LevelNormal"} />
            <NavButton text={"Сложный"} path={"/LevelHard"} />   
            <NavButton text={"Лидерборд"} path={"/LeaderBoard"} />
        </Screen>
    )
}