import NavPanel from './components/nav_panel/NavPanel';
import StartMenu from './pages/startMenu/StartMenu';
import { Routes, Route } from "react-router-dom";
import './styles/index.scss'
import GamePage from './pages/gamePage/GamePage';
import LvlUp from './pages/lvlUp/LvlUp';
import WatchPage from './pages/watchPage.tsx/WatchPage';
import LiderBoard from './pages/liderBoard/LiderBoard';
import GetMultipass from './pages/getMultipass/GetMultipass';
import AheadGinn from './pages/aheadGinn/AheadGinn';
function App() {
  return (
    <div className="App">
      <NavPanel />
      <Routes>
        <Route path='' element={<StartMenu />} />
        <Route path='game' element={<GamePage />} />
        <Route path='lvlUp' element={<LvlUp />} />
        <Route path='watch-the-fuel' element={<WatchPage />} />
        <Route path='lider-board' element={<LiderBoard />} />
        <Route path='get-multipass' element={<GetMultipass />} />
        <Route path='ahead-token' element={<AheadGinn />} />
      </Routes>
    </div>
  );
}

export default App;
