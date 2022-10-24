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
}
export interface IAnimations {
    wheelToRight: IAnimation
    wheelToLeft: IAnimation
}
export interface IAnimation {
animation: string
}