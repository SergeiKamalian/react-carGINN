import { useDispatch, useSelector } from "react-redux"
import Car from "../../components/car/Car"
import { setActiveBonuse, setCarPosition, setWin } from "../../redux/features/actions"
import { RootState } from "../../redux/store"
import { useEffect, useState, useRef, useMemo } from 'react'
import { getRandomBonuse } from "../../functions/functions"
import { IActiveBonuse, IAnimations, IBonuse } from "../../model/model"
const animations: IAnimations = {
    wheelToRight: { animation: 'wheelRight .5s linear' },
    wheelToLeft: { animation: 'wheelLeft .5s linear' },
}
const GamePage = () => {
    const [duration, setDuration] = useState(100)
    const [bonuseDuration, setBonuseDuration] = useState(770 / (34050 / duration))
    const [render, setRender] = useState(false)
    const [newBonus, setNewBonus] = useState<IActiveBonuse | null>(null)
    const [winState, setWinState] = useState<boolean | null>(null)


    const positionAnimations = {
        right: { animation: 'carAnim .3s linear', left: '155px' },
        left: { animation: 'carAnim2 .3s linear', left: '0px' }
    }

    const bonusesRef = useRef<HTMLDivElement>(null)
    const carRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setBonuseDuration(720 / (34050 / duration))
    }, [duration])

    const dispatch = useDispatch()

    const { position } = useSelector((state: RootState) => state.gameReducer)
    const { bonuses } = useSelector((state: RootState) => state.gameReducer)
    const { activeBonuse } = useSelector((state: RootState) => state.gameReducer)
    const { win } = useSelector((state: RootState) => state.gameReducer)


    const changePosition = (positionNew: string) => {
        const carPositionCoord = carRef.current?.getBoundingClientRect().x
        if (carPositionCoord && (carPositionCoord <= 97.75 || carPositionCoord <= 252.75))
            positionNew !== position && dispatch(setCarPosition(positionNew))
        setDuration(duration - 0)
    }

    const changeActiveBonuse = (bonuse: IBonuse) => {
        const position = Math.floor(Math.random() * 2) === 0 ? 'left' : 'right'
        const newBonuse: IActiveBonuse = {
            activeBonuse: bonuse,
            position: position
        }
        return newBonuse
    }


    // useEffect(() => {
    //     setInterval(() => {
    //         const positionBonusNew = bonusesRef.current?.getBoundingClientRect().top

    //         if (positionBonusNew && (positionBonusNew >= 20 && positionBonusNew <= 50)) {
    //             if (activeBonuse?.position === position) {
    //                 if (activeBonuse.activeBonuse?.plus && win === null) {
    //                     setWinState(true)
    //                 } else if (!activeBonuse.activeBonuse?.plus && win === null) {
    //                     setWinState(false)
    //                 }
    //             }
    //         } else if (positionBonusNew && (positionBonusNew >= 250 && positionBonusNew <= 280)) {
    //             setWinState(null)
    //         }
    //     }, 100)
    // }, [win, winState, activeBonuse, position])

    // useEffect(() => {
    //     if (winState !== null && win === null) {
    //         dispatch(setWin(win))
    //     }else if (winState === null && win !== null) {
    //         dispatch(setWin(win))
    //     }
    // }, [win, winState, dispatch])

    useEffect(() => {
        setInterval(() => {
            const positionBonusNew = bonusesRef.current?.getBoundingClientRect().top
            if (positionBonusNew && (positionBonusNew >= -350 && positionBonusNew <= -300)) {
                setNewBonus(changeActiveBonuse(getRandomBonuse(bonuses)));
            } else if (positionBonusNew && (positionBonusNew >= 250 && positionBonusNew <= 280)) {
                setNewBonus(null)
            }
        }, 100)
    }, [bonuses])
    useEffect(() => {

        if (newBonus !== null && activeBonuse === null) {
            dispatch(setActiveBonuse(newBonus))
        } else if (newBonus === null && activeBonuse !== null) {
            dispatch(setActiveBonuse(newBonus))
        }
    }, [newBonus, activeBonuse, dispatch])
    return (
        <div className='GamePage'>
            <div className="gameRoad" style={{ animationDuration: `${duration}s` }}> </div>
            <div className="sectionCar">
                <div className='Car' style={position === 'right' ? positionAnimations.right : positionAnimations.left} ref={carRef}>
                    <div className="kovsh"></div>
                    <div className="wehicle"></div>
                </div>
            </div>

            <div className="bonuses"
                style={{ animationDuration: `${bonuseDuration}s` }} ref={bonusesRef}>
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
                        <span>210</span>
                        <img src={require('../../images/crystal.png')} alt="crystalPhoto" className="crystal" />
                    </div>
                    <div className="fuelPanel">
                        <img src={require('../../images/fuel-count.png')} alt="fuelPhoto" className="fuel" />
                        <span>x5</span>
                    </div>
                </div>
                <div className="bottomPanel">
                    <div className="wheel" style={position === 'right' ? animations.wheelToRight : animations.wheelToLeft}></div>
                </div>
            </div>
            <div className="panelDriver">
                <div className="click" onClick={() => changePosition('left')}></div>
                <div className="click" onClick={() => changePosition('right')}></div>
            </div>
        </div>
    )
}

export default GamePage