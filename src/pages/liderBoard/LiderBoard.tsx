import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { AiFillLock } from 'react-icons/ai';
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { setFuelCount } from '../../redux/features/actions';
import { getLeaders } from '../../api/api';
import { ILeader } from '../../model/model';

const LiderBoard = () => {
    const [fuels, setFuels] = useState<string[]>([])
    const [noFuels, setNoFuels] = useState<string[]>([])
    const [allLeaders, setAllLeaders] = useState<ILeader[]>([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { crystal } = useSelector((state: RootState) => state.userReducer)
    const { fuel } = useSelector((state: RootState) => state.userReducer)
    const { ratingUser } = useSelector((state: RootState) => state.userReducer)

    // тестовый массив лидер
    useEffect(() => {
        const leaders = [
            { name: 'Sergey Kamalyan', rating: 200, id: 0 },
            { name: 'Arman Jr', rating: 120, id: 1 },
            { name: 'Republic Artsakh', rating: 210, id: 2 },
            { name: 'From Armenia', rating: 205, id: 3 },
            { name: 'Erik Avetisyan', rating: 64, id: 4 },
            { name: 'Vahe Simonyan', rating: 111, id: 5 },
            { name: 'Styopa Mnacakanyan', rating: 148, id: 6 },
            { name: 'Mamikon Kokobelyan', rating: 46, id: 7 },
            { name: 'Alik Charchyan', rating: 12, id: 8 },
            { name: 'Ash Muradyan', rating: 189, id: 9 },
        ].sort((a, b) => a.rating < b.rating ? 1 : -1)
        setAllLeaders(leaders)
    }, [])


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
                navigate('no-fuel')
            }
        } else {
            dispatch(setFuelCount(fuel - 1))
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
                    {allLeaders.map((leader, index) =>
                        <div className={leader.name === 'Arman Jr' ? "boardItem activeBoardItem" : 'boardItem'} key={leader.id}>
                            <span className="numberGamer">{index + 1}</span>
                            <img src={require('../../images/gamerImage.png')} alt="img" />
                            <span className='nameGamer'>{leader.name}</span>
                            <span className='countCrystal'>{leader.rating}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LiderBoard