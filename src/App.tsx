import NavPanel from './components/nav_panel/NavPanel';
import StartMenu from './pages/startMenu/StartMenu';
import { Routes, Route } from "react-router-dom";
import './styles/index.scss'
import GamePage from './pages/gamePage/GamePage';
function App() {
  return (
    <div className="App">
      <NavPanel />
      <Routes>
        <Route path='' element={<StartMenu />} />
        <Route path='game' element={<GamePage />} />
        
      </Routes>
    </div>
  );
}

export default App;
