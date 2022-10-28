import { IActiveBonuse, IBonuse, IReducerInitialState } from "../../../model/model";
import { GAME_TYPES } from "./gameTypes";
const bonuses: IBonuse[] = [
    { value: 'wall', plus: false },
    { value: 'rocks', plus: false },
    { value: 'crystal', plus: true },
    { value: 'fuel', plus: true },
]
const INITIAL_STATE: IReducerInitialState = {
    gameStart: false,
    position: 'left',
    bonuses: bonuses,
    activeBonuse: null,
    win: null,
};

const gameReducer = (state = INITIAL_STATE, action: { type: string; payload: string | IActiveBonuse | boolean | number }) => {
    switch (action.type) {
        case GAME_TYPES.SET_POSITION:
            return {
                ...state,
                position: action.payload as string,
            };
        case GAME_TYPES.SET_ACTIVE_BONUSE:
            return {
                ...state,
                activeBonuse: action.payload as IActiveBonuse,
            };
        case GAME_TYPES.SET_WIN:
            return {
                ...state,
                win: action.payload as boolean,
            };
        case GAME_TYPES.SET_GAME_START:
            return {
                ...state,
                gameStart: action.payload as boolean,
            };
        default:
            return state;
    }
};
export default gameReducer;