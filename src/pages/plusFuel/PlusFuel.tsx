import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setFuelCount } from "../../redux/features/actions"
import { RootState } from "../../redux/store"

const PlusFuel = () => {
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
    navigate('/lider-board')
  }, [fuel])
  
  return (
    <div className='plusFuel'>

      <div className="bottomPanel">
        <div className="fuels">
          {fuels.map(() => (
            <img src={require('../../images/fuel-count.png')} alt="" key={Math.random()} />
          ))}
          {noFuels.map(() => (
            <img src={require('../../images/nofuel-count.png')} alt="" key={Math.random()} />
          ))}
        </div>
        <button onClick={handleClick}>Good</button>
      </div>

      <div className="watchInfo">
        <img src={require('../../images/fuelBIg.png')} alt="fuel" />
        <span className="watchTitle">+1 canister of fuel</span>
        <span className="watchSubtitle">More races per race</span>
      </div>
    </div>
  )
}

export default PlusFuel