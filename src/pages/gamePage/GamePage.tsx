import { useDispatch, useSelector } from "react-redux"
import Car from "../../components/car/Car"
import { setActiveBonuse, setCarPosition } from "../../redux/features/actions"
import { RootState } from "../../redux/store"
import { useEffect, useState } from 'react'
import { getRandomBonuse } from "../../functions/functions"
import { IActiveBonuse, IBonuse } from "../../model/model"
const animations = {
    wheelToRight: { animation: 'wheelRight .5s linear' },
    wheelToLeft: { animation: 'wheelLeft .5s linear' },
}
const GamePage = () => {
    const [duration, setDuration] = useState(100)
    const [bonuseDuration, setBonuseDuration] = useState(770 / (34050 / duration))
    useEffect(() => {
        console.log(bonuseDuration)
        setBonuseDuration(720 / (34050 / duration))
    }, [duration])

    const dispatch = useDispatch()

    const { position } = useSelector((state: RootState) => state.gameReducer)
    const { bonuses } = useSelector((state: RootState) => state.gameReducer)
    const { activeBonuse } = useSelector((state: RootState) => state.gameReducer)


    const changePosition = (positionNew: string) => {
        positionNew !== position && dispatch(setCarPosition(positionNew))
        setDuration(duration - 0)
    }

    const changeActiveBonuse = (bonuse: IBonuse) => {
        const position = Math.floor(Math.random() * 2) === 0 ? 'left' : 'right'
        const newBonuse: IActiveBonuse = {
            activeBonuse: bonuse,
            position: position
        }
        dispatch(setActiveBonuse(newBonuse))

        setTimeout(() => {
            dispatch(setActiveBonuse(null))
        }, (bonuseDuration - (bonuseDuration * .015)) * 1000);
    }

    useEffect(() => {
        if (activeBonuse === null) {
            changeActiveBonuse(getRandomBonuse(bonuses))
        }
    }, [activeBonuse])


    return (
        <div className='GamePage'>
            <div className="gameRoad" style={{ animationDuration: `${duration}s` }}> </div>
            <div className="sectionCar">
                <Car />
            </div>

            <div className="bonuses" style={{ animationDuration: `${bonuseDuration}s` }}>
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
                        <span>100</span>
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
                <button className="click" onClick={() => changePosition('left')}></button>
                <button className="click" onClick={() => changePosition('right')}></button>
            </div>
        </div>
    )
}

export default GamePage