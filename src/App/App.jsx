import { Routes, Route, useLocation } from 'react-router';
import { useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from './App.module.css';
import backgroundImage from '../assets/imgs/background.webp';
import { GameProvider } from '../components/Game/GameContext';
import { useLoading } from '../components/Loading/LoadingContext';

import Home from '../pages/Home';
import LevelEasy from '../pages/LevelEasy';
import LevelNormal from '../pages/LevelNormal';
import LevelHard from '../pages/LevelHard';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Account from '../pages/Account';
import LeaderBoardMenu from '../pages/LeaderBoardMenu';
import LeaderBoardEasy from '../pages/leaderBoardEasy';
import LeaderBoardNormal from '../pages/leaderBoardNormal';
import LeaderBoardHard from '../pages/leaderBoardHard';

export default function App() {
  const location = useLocation();
  const nodeRef = useRef(null);
  const [loading, setLoading] = useLoading();
  const [sendEmailDisable, setSendEmailDisable] = useState(false);

  return (
    <div
      className={`${styles.app} ${loading ? "disable" : ""}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
        <SwitchTransition>
          <CSSTransition
            key={location.key}
            nodeRef={nodeRef}
            timeout={500}
            classNames="screen"
            unmountOnExit
          >
              <div ref={nodeRef} className={`${styles.screenContainer}`}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                    <Route path="/LevelEasy" element={
                      <GameProvider>
                        <LevelEasy />
                      </GameProvider>
                      } />
                    <Route path="/LevelNormal" element={
                      <GameProvider>
                        <LevelNormal />
                      </GameProvider>
                      } />
                    <Route path="/LevelHard" element={
                      <GameProvider>
                        <LevelHard />
                      </GameProvider>
                      } />
                    <Route path="/LeaderBoardMenu" element={<LeaderBoardMenu />} />
                    <Route path="/LeaderBoardMenu/LeaderBoardEasy" element={<LeaderBoardEasy />} />
                    <Route path="/LeaderBoardMenu/LeaderBoardNormal" element={<LeaderBoardNormal />} />
                    <Route path="/LeaderBoardMenu/LeaderBoardHard" element={<LeaderBoardHard />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/SignIn" element={<SignIn />} />
                    <Route path="/Account" element={<Account 
                    sendEmailDisable={sendEmailDisable} 
                    setSendEmailDisable={setSendEmailDisable}/>}/>
                </Routes>
              </div>
          </CSSTransition>
        </SwitchTransition>
    </div>
  )
}