import { useEffect, useRef, useState } from 'react';
import { useLoading } from '../components/Loading/LoadingContext';
import { useUserData } from '../services/UserDataContext';
import Screen from '../components/Screen/Screen';
import NavButton from '../components/Buttons/NavButton';
import TextMain from '../components/Texts/TextMain/TextMain';
import Button from '../components/Buttons/Button';
import { HandleSignOut, sendEmail } from '../services/auth';
import { useNavigate } from 'react-router';
import TextSmallPale from '../components/Texts/TextSmallPale/TextSMallPale';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

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
    console.log(userData)
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
            <Button text={"Выйти из аккаунта"} onClick={handleClick}/>
            <NavButton/>
        </Screen>
    )
}