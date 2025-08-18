import NavButton from '../../components/Buttons/NavButton';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className='screen'>  
            <h1 className='font-header'>Ёжки-мышки</h1>
            <p className='font-small-pale'>Выберите уровень</p>
            <NavButton text={"Легкий"} path={"/LevelEasy"} />
            <NavButton text={"Средний"} path={"/LevelNormal"} />
            <NavButton text={"Сложный"} path={"/LevelHard"} />   
            <NavButton text={"Лидерборд"} path={"/LeaderBoard"} />
        </div>
    )
}