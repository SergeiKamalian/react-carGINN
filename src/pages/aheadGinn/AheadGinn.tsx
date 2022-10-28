import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setFuelCount } from "../../redux/features/actions"
import { RootState } from "../../redux/store"

const AheadGinn = () => {

    const navigate = useNavigate()


    const goGinnTokenFnc = useCallback(() => {
        console.log('logic ginn token')
        navigate('/lider-board')
    }, [])

    return (
        <div className='multipassPage'>

            <div className="bottomPanel">
                <img src={require('../../images/start_btn.png')} 
                onClick={goGinnTokenFnc}
                alt="start" />
            </div>

            <div className="watchInfo">
                <img src={require('../../images/coin_logo.png')} alt="coin_logo" />
                <span className="getMultipass">Go ahead for the GINN token</span>
                <span className="multipassSubtitle">The competition for GINN has begun!</span>
            </div>
        </div>
    )
}

export default AheadGinn