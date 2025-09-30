import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useLoading } from '../components/Loading/LoadingContext';
import { useUserData } from '../services/UserDataContext';
import { HandleSignOut, sendEmail } from '../services/auth';
import Screen from '../components/Screen/Screen';
import NavButton from '../components/Buttons/NavButton';
import TextMain from '../components/Texts/TextMain/TextMain';
import Button from '../components/Buttons/Button';
import TextSmallPale from '../components/Texts/TextSmallPale/TextSMallPale';
import TextSmall from '../components/Texts/TextSmall/TextSmall';
import { Table, TableRow, TableElement } from '../components/Table/Table';

export default function Account() {
    const navigate = useNavigate();
    const nodeRef = useRef(null);
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useLoading();
    const {userData} = useUserData();

    const handleClick = async () => {
        setLoading(true);
        try {
            await HandleSignOut();
            setLoading(false);
            navigate("/")
        } catch(error) {
            setLoading(false);
            alert(`Ошибка выхода из аккаунта: ${error.message}`);
            console.error(`Ошибка выхода из аккаунта: ${error.message}`);
        }
    }

    const hanldeSendEmail = async () => {
        setLoading(true);
        try {
            await sendEmail();
            setLoading(false);
            setEmailSent(true);
        } catch(error) {
            setLoading(false);
            alert(`Ошибка при отправке письма для подтверждения почты: ${error.message}`);
            console.error(`Ошибка при отправке письма для подтверждения почты: ${error.message}`);
        }
    }
    
    return (
        <Screen>
            <TextMain>{userData?.username}</TextMain>
            {
                !userData?.emailVerified ?
                    <>
                        <TextSmallPale>Подтвердите почту, чтобы попасть в таблицу лидеров!</TextSmallPale>
                        <SwitchTransition mode="out-in">
                            <CSSTransition
                                key={emailSent}
                                timeout={300}
                                classNames="slide"
                                nodeRef={nodeRef}
                                unmountOnExit
                            >
                                <div ref={nodeRef}>
                                    {
                                        !emailSent ?
                                            <Button text={"Отправить письмо для подтверждения почты"} onClick={hanldeSendEmail}/>
                                        :
                                            <>
                                                <TextMain>Письмо Отправлено</TextMain>
                                                <TextSmallPale>Проверьте папку Спам</TextSmallPale>
                                            </>
                                    }
                                </div>
                            </CSSTransition>
                        </SwitchTransition>
                    </>
                :
                    <TextMain>Почта подтверждена!</TextMain>
            }
            { userData ?            
                <Table>
                    <TableRow>
                        <TableElement>
                            <TextSmall>Уровень</TextSmall>
                        </TableElement>
                        <TableElement>
                            <TextSmall>Жизней осталось</TextSmall>
                        </TableElement>
                        <TableElement>
                            <TextSmall>время на уровне (сек)</TextSmall>
                        </TableElement>
                    </TableRow>
                    <TableRow>
                        <TableElement>
                            <TextSmall>Лёгкий</TextSmall>
                        </TableElement>
                        <TableElement>
                            <TextSmall>
                                {userData?.bestScoreEasy?.HPsLeft ? userData.bestScoreEasy.HPsLeft : "-"}
                            </TextSmall>
                        </TableElement>
                        <TableElement>
                            <TextSmall>
                                {userData?.bestScoreEasy?.timeSpent ? formatMilliseconds(userData.bestScoreEasy.timeSpent) : "-"}
                            </TextSmall>
                        </TableElement>
                    </TableRow>
                    <TableRow>
                        <TableElement>
                            <TextSmall>Средний</TextSmall>
                        </TableElement>
                        <TableElement>
                            <TextSmall>
                                {userData?.bestScoreNormal?.HPsLeft ? userData.bestScoreNormal.HPsLeft : "-"}
                            </TextSmall>
                        </TableElement>
                        <TableElement>
                            <TextSmall>
                                {userData?.bestScoreNormal?.timeSpent ? formatMilliseconds(userData.bestScoreNormal.timeSpent) : "-"}
                            </TextSmall>
                        </TableElement>
                    </TableRow>
                    <TableRow>
                        <TableElement>
                            <TextSmall>Сложный</TextSmall>
                        </TableElement>
                        <TableElement>
                            <TextSmall>
                                {userData?.bestScoreHard?.HPsLeft ? userData.bestScoreHard.HPsLeft : "-"}
                            </TextSmall>
                        </TableElement>
                        <TableElement>
                            <TextSmall>
                                {userData?.bestScoreHard?.timeSpent ? formatMilliseconds(userData.bestScoreHard.timeSpent) : "-"}
                            </TextSmall>
                        </TableElement>
                    </TableRow>
                </Table>
                :
                <></>
            }
            <Button text={"Выйти из аккаунта"} onClick={handleClick}/>
            <NavButton/>
        </Screen>
    )
}

function formatMilliseconds(ms) {
    return (ms / 1000).toFixed(3).replace(/\.?0+$/, '');
}