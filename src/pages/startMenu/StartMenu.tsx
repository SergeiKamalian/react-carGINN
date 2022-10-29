import { useNavigate } from "react-router-dom"
import { useCallback, useEffect } from 'react'
import { IGinnInformation } from "../../model/model"
import { useDispatch, useSelector } from "react-redux"
import { setCrystalCount, setFuelCount, setUserRating } from "../../redux/features/actions"
import { RootState } from "../../redux/store"

const StartMenu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { ratingUser } = useSelector((state: RootState) => state.userReducer)
  const { fuel } = useSelector((state: RootState) => state.userReducer)

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

  // начало игры
  const startGame = useCallback(() => {
    console.log(ratingUser)
    console.log(fuel)
    if (ratingUser === 'Learner' || !ratingUser) navigate('/game')
    else {
      if (fuel > 0) navigate('/game')
      else navigate('/no-fuel')
    }
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
          <div className="startGame_btn" onClick={startGame}></div>
        </div>
      </div>
    </div>
  )
}

export default StartMenu