import { useEffect, useState } from 'react';
import NavButton from '../components/Buttons/NavButton';
import Screen from '../components/Screen/Screen';
import Header from '../components/Texts/Header/Header';
import TextSmallPale from '../components/Texts/TextSmallPale/TextSMallPale';
import TopBar from '../components/TopBar/TopBar';
import { useAuth } from '../services/authContext';
import TextMain from '../components/Texts/TextMain/TextMain';

export default function Home() {
    const {user} = useAuth();

    return (
        <Screen>  
            <TopBar>
                {
                    user ? 
                        <NavButton text={"Аккаунт"} path={"/Account"} />
                    :
                        <>
                            <NavButton text={"Войти"} path={"/SignIn"} />
                            <NavButton text={"Зарегистрироваться"} path={"/SignUp"} />
                        </>
                }
            </TopBar>
            <Header>Ёжки-мышки</Header>
            <TextSmallPale>Выберите уровень</TextSmallPale>
            <NavButton text={"Легкий"} path={"/LevelEasy"} />
            <NavButton text={"Средний"} path={"/LevelNormal"} />
            <NavButton text={"Сложный"} path={"/LevelHard"} /> 
            <NavButton text={"Лидерборд"} path={"/LeaderBoard"} />
        </Screen>
    )
}