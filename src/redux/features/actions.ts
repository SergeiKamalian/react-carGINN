import { IActiveBonuse } from "../../model/model"
import { GAME_TYPES } from "./game/gameTypes"
import { USER_TYPES } from "./user/userTypes"
export const setCarPosition = (position: string | null) => ({
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
export const setFuelCount = (count: number) => ({
	type: GAME_TYPES.SET_FUEL_COUNT,
	payload: count
})
export const setCrystalCount = (count: number) => ({
	type: GAME_TYPES.SET_CRYSTAL_COUNT,
	payload: count
})
export const setGameStart = (bool: boolean) => ({
	type: GAME_TYPES.SET_GAME_START,
	payload: bool
})
export const setUserRating = (rating: string | null) => ({
	type: USER_TYPES.SET_USER_RATING,
	payload: rating
})