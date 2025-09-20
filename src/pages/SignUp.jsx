import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import NavButton from '../components/Buttons/NavButton';
import Screen from '../components/Screen/Screen';
import Input from '../components/Input/Input'
import SubmitButton from '../components/Buttons/SubmitButton';
import { useLoading } from '../components/Loading/LoadingContext';
import { signUp } from "../services/auth";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUsername("");
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signUp(email, username, password, confirmPassword);
            setLoading(false);
            navigate("/");
            e.target.reset();
        } catch(error) {
            setLoading(false);
            alert(`Ошибка регистрации: ${error.message}`);
            console.error(`Ошибка регистрации: ${error.message}`);
        }
    }

    return (
        <Screen>
            <form onSubmit={handleSubmit}>
                <Input 
                type="email" 
                placeholder="email" 
                value={email}
                required 
                onChange={(e) => {setEmail(e.target.value)}}/>

                <Input 
                type="text" 
                placeholder="никнейм"
                value={username} 
                maxLength={15} 
                minLength={3} 
                required
                onChange={(e) => {setUsername(e.target.value)}}/>

                <Input 
                type="password" 
                placeholder="пароль" 
                value={password}
                minLength={6} 
                required
                onChange={(e) => {setPassword(e.target.value)}}/>

                <Input 
                type="password" 
                placeholder="пароль повторно"
                value={confirmPassword} 
                minLength={6} 
                required
                onChange={(e) => {setConfirmPassword(e.target.value)}}/>

                <SubmitButton text={"Зарегистрироваться"}/>
            </form>
            <NavButton/>
        </Screen>
    )
}