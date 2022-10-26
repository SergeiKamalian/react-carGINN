import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useEffect } from 'react'

const Car = () => {
  const { position } = useSelector((state: RootState) => state.gameReducer)
  const obj = { animation: 'carAnim .3s linear' }
  const obj2 = { animation: 'carAnim2 .3s linear' }
  useEffect(() => {
    console.log('время анимации');

  }, [position])
  return (
    <div className='Car' style={position === 'right' ? {animation: 'carAnim .3s linear'} : { animation: 'carAnim2 .3s linear' }}>
      <div className="kovsh"></div>
      <div className="wehicle"></div>
    </div>
  )
}

export default Car