import { useEffect, useState } from 'react';
import { useAuth } from '../services/authContext';
import { getUsername } from '../services/db';
import { useLoading } from '../components/Loading/LoadingContext';
import Screen from '../components/Screen/Screen';
import NavButton from '../components/Buttons/NavButton';
import TextMain from '../components/Texts/TextMain/TextMain';
import Button from '../components/Buttons/Button';
import { HandleSignOut } from '../services/auth';
import { useNavigate } from 'react-router';

export default function Account() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const [localUser, setLocalUser] = useState(user);
    const [loading, setLoading] = useLoading();

    useEffect(() => {
        if (user) {
            setLocalUser(user);
        }
    }, [user]);

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

    return (
        <Screen>
            <TextMain>{localUser?.username}</TextMain>
            <Button text={"Выйти из аккаунта"} onClick={handleClick}/>
            <NavButton/>
        </Screen>
    )
}