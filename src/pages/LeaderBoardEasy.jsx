import NavButton from "../components/Buttons/NavButton";
import LeaderBoard from "../components/LeaderBoard";
import Screen from "../components/Screen";
import TextMain from "../components/Texts/TextMain/TextMain";
import TextSmall from "../components/Texts/TextSmall/TextSmall";
import { useAuth } from "../services/authContext";

export default function LeaderBoardEasy() {
    const {user} = useAuth();

    return (
        <Screen>
            <TextMain>Лёгкий</TextMain>
            {
                !user ? 
                    <TextSmall>Зарегистрируйтесь и подтвердите почту, чтобы попасть в таблицу лидеров!</TextSmall>
                : !user.emailVerified ?
                    <TextSmall>Подтвердите почту, чтобы попасть в таблицу лидеров!</TextSmall>
                : null
            }
            <LeaderBoard level={"bestScoreEasy"}/>
            <NavButton/>
        </Screen>
    )
}