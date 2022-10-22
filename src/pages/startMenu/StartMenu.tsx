import { useNavigate } from "react-router-dom"

const StartMenu = () => {
  const navigate = useNavigate()
  return (
    <div className="startMenu">
        <div className="startMenu_bg">
            <div className="startMenu_content">
                <h1>Race for Ginn</h1>
                <span>P2E is a race in which you can win real ginn tokens</span>
            </div>
            <div className="racer_image"></div>
            <div className="startMenu_panel center">
                <div className="startGame_btn" onClick={() => navigate('game')}></div>
            </div>
        </div>
    </div>
  )
}

export default StartMenu