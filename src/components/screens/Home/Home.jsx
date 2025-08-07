import NavButton from '../../Buttons/NavButton';
import styles from './Home.module.css';

export default function Home() {
    return (
        <>  
            <h1 className='font-header'>Ёжки-мышки</h1>
            <p className='font-small-pale'>Выберите уровень</p>
            <NavButton text={"Легкий"} path={"/levelEasy"} />
            <NavButton text={"Средний"} path={"/levelNormal"} />
            <NavButton text={"Сложный"} path={"/levelHard"} />   
            <NavButton text={"Лидерборд"} path={"/leaderBoard"} />
        </>
    )
}