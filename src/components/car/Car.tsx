import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useEffect } from 'react'

const Car = () => {
  const { position } = useSelector((state: RootState) => state.gameReducer)
  const obj = { animation: 'carAnim .3s linear', left: '155px' }
  const obj2 = { animation: 'carAnim2 .3s linear', left: '0px' }
  useEffect(() => {
    console.log('время анимации');

  }, [position])
  return (
    <div className='Car' style={position === 'right' ? obj : obj2}>
      <div className="kovsh"></div>
      <div className="wehicle"></div>
    </div>
  )
}

export default Car