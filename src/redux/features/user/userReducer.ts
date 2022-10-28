import { IUserReducerInitialState } from "../../../model/model";
import { USER_TYPES } from "./userTypes";

const INITIAL_STATE: IUserReducerInitialState = {
    fuel: 0,
    crystal: 0,
    ratingUser: null
};

const userReducer = (state = INITIAL_STATE, action: { type: string; payload: string | number }) => {
    switch (action.type) {
        case USER_TYPES.SET_CRYSTAL_COUNT:
            return {
                ...state,
                crystal: action.payload as number,
            };
        case USER_TYPES.SET_FUEL_COUNT:
            return {
                ...state,
                fuel: action.payload as number,
            };
        case USER_TYPES.SET_USER_RATING:
            return {
                ...state,
                ratingUser: action.payload as string,
            };
        default:
            return state;
    }
};
export default userReducer;