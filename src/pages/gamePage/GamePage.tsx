import { useDispatch, useSelector } from "react-redux"
import { setActiveBonuse, setCarPosition, setCrystalCount, setFuelCount, setGameStart, setUserRating, setWin } from "../../redux/features/actions"
import { RootState } from "../../redux/store"
import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { getRandomBonuse } from "../../functions/functions"
import { IActiveBonuse, IAnimations, IBonuse, IGinnInformation } from "../../model/model"
import { useNavigate } from "react-router-dom"
const animations: IAnimations = {
    wheelToRight: { animation: 'wheelRight .5s linear' },
    wheelToLeft: { animation: 'wheelLeft .5s linear' },
}
const positionAnimations = {
    right: { animation: 'carAnim .3s linear', left: '155px' },
    left: { animation: 'carAnim2 .3s linear', left: '0px' }
}
const GamePage = () => {
    const [newBonus, setNewBonus] = useState<IActiveBonuse | null>(null)
    const [animateCar, setAnimateCar] = useState(true)
    const [countStart, setCountStart] = useState(3)
    const [newGame, setNewGame] = useState(true)
    const [prevRating, setPrevRating] = useState('')

    const { position } = useSelector((state: RootState) => state.gameReducer)
    const { bonuses } = useSelector((state: RootState) => state.gameReducer)
    const { activeBonuse } = useSelector((state: RootState) => state.gameReducer)
    const { gameStart } = useSelector((state: RootState) => state.gameReducer)

    const { crystal } = useSelector((state: RootState) => state.userReducer)
    const { fuel } = useSelector((state: RootState) => state.userReducer)
    const { ratingUser } = useSelector((state: RootState) => state.userReducer)

    const bonusesRef = useRef<HTMLDivElement>(null)
    const carRef = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // изменение первоначального рейтинга

    useEffect(() => {
        ratingUser && setPrevRating(ratingUser)
    }, [])

    // логика выиграша или поражения

    const [bonuseReach, setBonuseReach] = useState(false)
    const [positionBonuse, setPositionBonuse] = useState(0)

    useEffect(() => {
        setInterval(() => {
            const positionBonus = bonusesRef.current?.getBoundingClientRect().top
            positionBonus && setPositionBonuse(positionBonus)
        }, 10)
    }, [bonuses])

    useEffect(() => {
        if (positionBonuse && (positionBonuse >= 125 && positionBonuse <= 135) && bonuseReach === false) {
            winOrLose()
            setBonuseReach(true)
            setTimeout(() => {
                setBonuseReach(false)
            }, 1000);
        }
    }, [positionBonuse])

    const winOrLose = useCallback(() => {
        if (position === activeBonuse?.position && activeBonuse) {
            if (activeBonuse.activeBonuse?.plus) {
                userWin()
                setNewBonus(null)
            } else {
                dispatch(setGameStart(false))
                setTimeout(() => {
                    if (prevRating !== ratingUser) {
                        navigate('/lvlUp')
                    }else {
                        ratingUser === 'Learner' && navigate('/lider-board')
                        ratingUser === 'Novice' && navigate('/watch-the-fuel')
                        ratingUser === 'Driver' && navigate('/get-multipass')
                        ratingUser === 'Racer' && navigate('/ahead-token')
                    }
                }, 1000);
            }
        }
    }, [activeBonuse?.position, position])

    const userWin = () => {
        switch (activeBonuse?.activeBonuse?.value) {
            case 'crystal':
                dispatch(setCrystalCount(crystal + 1))
                break;
            case 'fuel':
                dispatch(setFuelCount(fuel + 1))
                break;
            default:
                break;
        }
    }


    // изменение рейтиига
    // const changeRating = useCallback(() => {
    //     if (crystal <= 50 && crystal >= 0) {
    //         dispatch(setUserRating('Learner'))
    //     } else if (crystal > 50 && crystal <= 75) {
    //         dispatch(setUserRating('Novice'))
    //     } else if (crystal > 76 && crystal < 100) {
    //         dispatch(setUserRating('Driver'))
    //     } else if (crystal >= 100) {
    //         dispatch(setUserRating('Racer'))
    //     }
    // }, [crystal])

    const changeRating = useCallback(() => {
        if (crystal <= 5 && crystal >= 0) {
            dispatch(setUserRating('Learner'))
        } else if (crystal > 5 && crystal <= 8) {
            dispatch(setUserRating('Novice'))
        } else if (crystal > 9 && crystal < 12) {
            dispatch(setUserRating('Driver'))
        } else if (crystal >= 12) {
            dispatch(setUserRating('Racer'))
        }
    }, [crystal])

    useEffect(() => {
        changeRating()
    }, [crystal])


    // изменение в локалсторидж
    const changeLocalStorageInfo = useCallback(() => {
        const information: IGinnInformation = {
            ratingUser,
            fuel,
            crystal
        }
        localStorage.setItem('ginn_information', JSON.stringify(information))
    }, [crystal, fuel, ratingUser])

    useEffect(() => {
        changeLocalStorageInfo()
    }, [crystal, fuel, ratingUser])

    // перемещение машины
    const changePosition = (positionNew: string) => {
        if (position !== null && animateCar && position !== positionNew) {
            dispatch(setCarPosition(null))
            setAnimateCar(false)
            console.log(animateCar);
            dispatch(setCarPosition(positionNew))
        }
    }

    // разрещение на перемещение машины (на время)
    useEffect(() => {
        setTimeout(() => {
            if (!animateCar) {
                setAnimateCar(true)
            }
        }, 800);
    }, [animateCar])

    // функция для получение рандомного бонуса
    const changeActiveBonuse = (bonuse: IBonuse) => {
        const position = Math.floor(Math.random() * 2) === 0 ? 'left' : 'right'
        const newBonuse: IActiveBonuse = {
            activeBonuse: bonuse,
            position: position
        }
        return newBonuse
    }

    // обновление стейта в нужный момент
    useEffect(() => {
        setInterval(() => {
            const positionBonusNew = bonusesRef.current?.getBoundingClientRect().top
            if (positionBonusNew && (positionBonusNew >= -390 && positionBonusNew <= -350)) {
                setNewBonus(changeActiveBonuse(getRandomBonuse(bonuses, fuel)));
            }
            else if (positionBonusNew && (positionBonusNew >= 300 && positionBonusNew <= 350)) {
                setNewBonus(null)
            }
        }, 100)
    }, [])

    // обновление бонуса
    useEffect(() => {
        if (newBonus !== null && activeBonuse === null) {
            dispatch(setActiveBonuse(newBonus))
        } else if (newBonus === null && activeBonuse !== null) {
            dispatch(setActiveBonuse(newBonus))
        }
    }, [newBonus, activeBonuse, dispatch])

    useEffect(() => {
        if (countStart !== 0) {
            setTimeout(() => {
                setCountStart(countStart - 1)
            }, 1150);
        }
        if (countStart === 0 && newGame === true) {
            dispatch(setGameStart(true))
            setNewGame(false)
        }
    }, [countStart])

    return (
        <div className='GamePage'>
            <div className="gameRoad" style={gameStart ? { animation: 'topAnim 100s linear infinite' } : {}}> </div>
            <div className="sectionCar" >
                <div className='Car' style={position !== null ? (position === 'right' ? positionAnimations.right : positionAnimations.left) : {}} ref={carRef}>
                    <div className="kovsh"></div>
                    <div className="wehicle"></div>
                </div>
            </div>

            <div className="bonuses"
                style={gameStart ? { animation: 'bonuseAnim 2.3s linear infinite' } : { top: `${positionBonuse}px` }} ref={bonusesRef}>
                <div className="left bonuse_option">
                    {activeBonuse?.position === 'left'
                        && activeBonuse.activeBonuse
                        && <img src={require(`../../images/${activeBonuse?.activeBonuse.value}.png`)}
                            alt={activeBonuse?.activeBonuse.value}></img>}
                </div>
                <div className="right bonuse_option">
                    {activeBonuse?.position === 'right'
                        && activeBonuse.activeBonuse
                        && <img src={require(`../../images/${activeBonuse?.activeBonuse.value}.png`)}
                            alt={activeBonuse?.activeBonuse.value}></img>}
                </div>
            </div>

            <div className="gamePanels">
                <div className="topPanel">
                    <div className="crystalPanel">
                        <span>{crystal}</span>
                        <img src={require('../../images/crystal.png')} alt="crystalPhoto" className="crystal" />
                    </div>
                    {ratingUser && ratingUser !== 'Learner' && <div className="fuelPanel">
                        <img src={require('../../images/fuel-count.png')} alt="fuelPhoto" className="fuel" />
                        <span>x{fuel}</span>
                    </div>}
                </div>
                <div className="bottomPanel">
                    <div className="wheel" style={position !== null ? (position === 'right' ? animations.wheelToRight : animations.wheelToLeft) : {}}></div>
                </div>
            </div>
            <div className="panelDriver">
                <div className="click" onMouseDown={() => changePosition('left')}></div>
                <div className="click" onMouseDown={() => changePosition('right')}></div>
            </div>
            {!gameStart &&
                <div className="counterInStart">
                    {countStart !== 0 && <span>{countStart}</span>}
                </div>
            }
            {!gameStart && !newGame &&
                <div className="gameEnd">
                    <span>You lose!</span>
                </div>
            }
        </div>
    )
}

export default GamePage