import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setFuelCount } from "../../redux/features/actions"
import { RootState } from "../../redux/store"

const GetMultipass = () => {
    const { fuel } = useSelector((state: RootState) => state.userReducer)

    const navigate = useNavigate()

    const goMultipassFnc = useCallback(() => {
        console.log('logic multipass')
        navigate('/lider-board')
    }, [])

    return (
        <div className='multipassPage'>

            <div className="bottomPanel">
                <div className="buttons">
                    <button className="notNow" onClick={() => navigate('/lider-board')}>not now</button>
                    <button className="go" onClick={goMultipassFnc}>Go</button>
                </div>
            </div>

            <div className="watchInfo">
                <img src={require('../../images/multipass.png')} alt="multipass" />
                <span className="getMultipass">Get a multipass</span>
                <span className="multipassSubtitle">you will keep your gaming experience</span>
            </div>
        </div>
    )
}

export default GetMultipass