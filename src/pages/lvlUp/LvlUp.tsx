import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const LvlUp = () => {
    const { ratingUser } = useSelector((state: RootState) => state.userReducer)
    const navigate = useNavigate()
    const shareFnc = useCallback(() => {
        console.log('logic share')
    }, [])
    const notNowFnc = useCallback(() => {
        console.log('notNow')
        navigate('/lider-board')
    }, [])
    return (
        <div className='LvlUp'>
            <div className="lvlUp_information">
                <div className="topInfo">
                    <span className='lvlupSpan'>LVL UP!</span>
                    <span className='info'>
                        you have received a new level
                    </span>
                </div>
                <img className="imgInfo" src={require(`../../images/${ratingUser}.png`)}></img>
                <div className='ratingInfo'>{ratingUser}</div>
            </div>
            <div className="bottom_panel">
                <button className='share' onClick={shareFnc}>Поделиться</button>
                <button className='notnow' onClick={notNowFnc}>not now</button>
            </div>
        </div >
    )
}

export default LvlUp