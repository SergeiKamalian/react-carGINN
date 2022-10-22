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
}