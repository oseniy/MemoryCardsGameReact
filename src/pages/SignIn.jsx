import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from "../services/auth";
import { useLoading } from '../components/Loading/LoadingContext';
import NavButton from '../components/Buttons/NavButton';
import Screen from '../components/Screen/Screen';
import Input from '../components/Input/Input'
import SubmitButton from '../components/Buttons/SubmitButton';

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        setEmail("");
        setPassword("");
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signIn(email, password);
            setLoading(false);
            navigate("/")
            console.log("пользователь вошел");
        } catch (error) {
            setLoading(false);
            alert(`Ошибка входа в аккаунт: ${error.message}`);
            console.error(`Ошибка входа в аккаунт: ${error.message}`);
        }
    }

    return (
        <Screen>
            <form onSubmit={handleSubmit}>
                <Input 
                type="email" 
                placeholder="email" 
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                required/>
                <Input 
                type="password" 
                placeholder="пароль" 
                value={password}
                minLength={6} 
                onChange={(e) => {setPassword(e.target.value)}}
                required/>
                <SubmitButton text={"Войти"}/>
            </form>
            <NavButton/>
        </Screen>
    )
}