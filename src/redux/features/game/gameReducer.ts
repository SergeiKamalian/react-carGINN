import { IActiveBonuse, IBonuse, IReducerInitialState } from "../../../model/model";
import { GAME_TYPES } from "./gameTypes";
const bonuses: IBonuse[] = [
    { value: 'wall', plus: false },
    { value: 'rocks', plus: false },
    { value: 'crystal', plus: true },
    { value: 'fuel', plus: true },
]
const INITIAL_STATE: IReducerInitialState = {
    position: 'left',
    bonuses: bonuses,
    activeBonuse: null
};

const gameReducer = (state = INITIAL_STATE, action: { type: string; payload: string | IActiveBonuse }) => {
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
        default:
            return state;
    }
};
export default gameReducer;