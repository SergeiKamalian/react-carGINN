import { useNavigate } from "react-router-dom"
import { useCallback, useEffect } from 'react'
import { IGinnInformation } from "../../model/model"
import { useDispatch } from "react-redux"
import { setCrystalCount, setFuelCount, setUserRating } from "../../redux/features/actions"

const StartMenu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // получение информации от localStorage
  const getInfoFromLocalStorage = useCallback(() => {
    let information: IGinnInformation;
    const informationString = localStorage.getItem('ginn_information');
    if (informationString) {
      information = JSON.parse(informationString)
      dispatch(setUserRating(information.ratingUser))
      dispatch(setCrystalCount(information.crystal))
      dispatch(setFuelCount(information.fuel))
    }
  }, [])

  useEffect(() => {
    getInfoFromLocalStorage()
  }, [])

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