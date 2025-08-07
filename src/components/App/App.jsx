import { Routes, Route } from 'react-router'
import styles from './App.module.css';
import backgroundImage from '../../assets/imgs/background.png';

import Home from '../screens/Home/Home';
import LevelEasy from '../screens/LevelEasy/LevelEasy';
import LevelNormal from '../screens/LevelNormal/LevelNormal';
import LevelHard from '../screens/LevelHard/LevelHard';
import LeaderBoard from '../screens/LeaderBoard/LeaderBoard';

export default function App() {
    return (
        <div className={styles.app} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/levelEasy" element={<LevelEasy />} />
                <Route path="/levelNormal" element={<LevelNormal />} />
                <Route path="/levelHard" element={<LevelHard />} />
                <Route path="/leaderBoard" element={<LeaderBoard />} />
            </Routes>
        </div>
    )
}