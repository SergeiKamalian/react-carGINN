export interface IBonuse {
    value: string,
    plus: boolean
}
export interface IActiveBonuse {
    activeBonuse: IBonuse | null,
    position: string
}
export interface IReducerInitialState {
    position: string,
    bonuses: IBonuse[],
    activeBonuse: null | IActiveBonuse
    win: boolean | null
    gameStart: boolean
}
export interface IAnimations {
    wheelToRight: IAnimation
    wheelToLeft: IAnimation
}
export interface IAnimation {
    animation: string
}
export interface IUserReducerInitialState {
    fuel: number
    crystal: number
    ratingUser: string | null
}

export interface IGinnInformation {
    ratingUser: string | null
    fuel: number
    crystal: number
}