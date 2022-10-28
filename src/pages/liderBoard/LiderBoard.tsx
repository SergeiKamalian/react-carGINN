import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { AiFillLock } from 'react-icons/ai';
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { setFuelCount } from '../../redux/features/actions';
import { getLeaders } from '../../api/api';

const LiderBoard = () => {
    const [fuels, setFuels] = useState<string[]>([])
    const [noFuels, setNoFuels] = useState<string[]>([])
    const [allLeaders, setAllLeaders] = useState<unknown[]>([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { crystal } = useSelector((state: RootState) => state.userReducer)
    const { fuel } = useSelector((state: RootState) => state.userReducer)
    const { ratingUser } = useSelector((state: RootState) => state.userReducer)


    // система показа бензина
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

    // получение всех лидеров
    useEffect(() => {
        getAllLeaders()
    }, [])

    const getAllLeaders = useCallback(async () => {
        // const data = getLeaders()
    }, [])

    const handleClick = useCallback(() => {
        if (ratingUser && ratingUser !== 'Learner') {
            if (fuel > 0) {
                dispatch(setFuelCount(fuel - 1))
                navigate('/game')
            } else {
                console.log('навигейт то нет бензина')
            }
        } else {
            navigate('/game')
        }
    }, [fuel])
    return (
        <div className='liderBoard'>
            <div className="bottomPanel">
                <div className="fuels">
                    {fuels.map(() => (
                        <img src={require('../../images/fuel-count.png')} alt="" key={Math.random()} />
                    ))}
                    {noFuels.map(() => (
                        <img src={require('../../images/nofuel-count.png')} alt="" key={Math.random()} />
                    ))}
                </div>
                <img src={require('../../images/restart_btn.png')} className="button"
                    onClick={handleClick}
                />
            </div>
            <div className="lidersInfo">
                <span>You cored</span>
                <div>
                    <span>{crystal}</span>
                    <img src={require('../../images/crystal.png')} alt="crystal" />
                </div>
                <div className="lidersNav">
                    <ul>
                        <li className='active'>The Chat</li>
                        <li>Global <AiFillLock /></li>
                        <li>Grands Prix <AiFillLock /></li>
                    </ul>
                </div>
                <div className="board">
                    {allLeaders.map((leader) =>
                        <div className="boardItem">
                            <span className="numberGamer">1</span>
                            <img src={require('../../images/gamerImage.png')} alt="" />
                            <span className='nameGamer'>Sergey Kamalyan</span>
                            <span className='countCrystal'>50</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LiderBoard