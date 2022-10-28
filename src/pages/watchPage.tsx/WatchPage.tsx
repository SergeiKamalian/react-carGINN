import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setFuelCount } from "../../redux/features/actions"
import { RootState } from "../../redux/store"

const WatchPage = () => {
  const [fuels, setFuels] = useState<string[]>([])
  const [noFuels, setNoFuels] = useState<string[]>([])

  const { fuel } = useSelector((state: RootState) => state.userReducer)
  const { ratingUser } = useSelector((state: RootState) => state.userReducer)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fuelsNew: string[] = []
    const noFuelsNew: string[] = []
    for (let index = 0; index < fuel; index++) {
      fuelsNew.push('fuel')
    }
    for (let index = 0; index < 5 - fuel; index++) {
      noFuelsNew.push('noFuel')
    }
    setFuels(fuelsNew)
    setNoFuels(noFuelsNew)
  }, [])

  const handleClick = useCallback(() => {
    console.log('система просмотра видео и отправки на таблицу')
    navigate('/lider-board')
  }, [fuel])
  
  return (
    <div className='watchPage'>

      <div className="bottomPanel">
        <div className="fuels">
          {fuels.map(() => (
            <img src={require('../../images/fuel-count.png')} alt="" key={Math.random()} />
          ))}
          {noFuels.map(() => (
            <img src={require('../../images/nofuel-count.png')} alt="" key={Math.random()} />
          ))}
        </div>
        <img src={require('../../images/start_btn.png')} className="button"
          onClick={handleClick}
        />
      </div>

      <div className="watchInfo">
        <img src={require('../../images/fuelBIg.png')} alt="fuel" />
        <span className="watchTitle">Watch the fuel!</span>
        <span className="watchSubtitle">Now the fuel may run out!</span>
      </div>
    </div>
  )
}

export default WatchPage