import { IActiveBonuse, IBonuse } from "../model/model";

export const getRandomBonuse = (bonuses: IBonuse[], fuelCount: number) => {
    const bonuse = bonuses[Math.floor(Math.random() * bonuses.length)];
    let returnBonuse: IBonuse;
    if (bonuse.value === 'fuel' && fuelCount >= 5) {
        returnBonuse = { value: 'wall', plus: false }
    } else {
        returnBonuse = bonuse;
    }
    console.log(returnBonuse)
    return returnBonuse;
}