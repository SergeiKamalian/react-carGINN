import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setFuelCount } from "../../redux/features/actions"
import { RootState } from "../../redux/store"

const NoFuel = () => {
  const [fuels, setFuels] = useState<string[]>([])
  const [noFuels, setNoFuels] = useState<string[]>([])

  const { fuel } = useSelector((state: RootState) => state.userReducer)

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
    if (fuel < 5) {
      console.log('система просмотра видео и отправки на таблицу')
      dispatch(setFuelCount(fuel + 1))
    }
    navigate('/plus-fuel')
  }, [fuel])

  return (
    <div className='NoFuel'>

      <div className="bottomPanel">
        <div className="fuels">
          {fuels.map(() => (
            <img src={require('../../images/fuel-count.png')} alt="" key={Math.random()} />
          ))}
          {noFuels.map(() => (
            <img src={require('../../images/nofuel-count.png')} alt="" key={Math.random()} />
          ))}
        </div>
        <button onClick={handleClick}>Refuel in the chat!</button>
      </div>

      <div className="watchInfo">
        <img src={require('../../images/fuel-zero.png')} alt="fuel" />
        <span className="watchTitle">fuel is out</span>
        <span className="watchSubtitle">Invite your friends to play with you to get refueling. <br /> 
        <b>1 new friend — 1 canister of fuel.</b></span>
      </div>
    </div>
  )
}

export default NoFuel