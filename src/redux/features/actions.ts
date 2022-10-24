import { IActiveBonuse } from "../../model/model"
import { GAME_TYPES } from "./game/gameTypes"
export const setCarPosition = (position: string) => ({
	type: GAME_TYPES.SET_POSITION,
	payload: position
})
export const setActiveBonuse = (activeBonuse: IActiveBonuse | null) => ({
	type: GAME_TYPES.SET_ACTIVE_BONUSE,
	payload: activeBonuse
})
export const setWin = (win: boolean | null) => ({
	type: GAME_TYPES.SET_ACTIVE_BONUSE,
	payload: win
})