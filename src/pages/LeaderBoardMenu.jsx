import NavButton from '../components/Buttons/NavButton';
import Screen from '../components/Screen';
import Header from '../components/Texts/Header/Header';
import TextSmallPale from '../components/Texts/TextSmallPale/TextSMallPale';

export default function LeaderBoardMenu() {
    return (
        <Screen>
            <Header>Лидерборд</Header>
            <TextSmallPale>Выберите уровень</TextSmallPale>
            <NavButton text={"Лёгкий"} path={"/LeaderBoardMenu/LeaderBoardEasy"} />
            <NavButton text={"Средний"} path={"/LeaderBoardMenu/LeaderBoardNormal"} />
            <NavButton text={"Сложный"} path={"/LeaderBoardMenu/LeaderBoardHard"} />
            <NavButton />   
        </Screen>
    )
}