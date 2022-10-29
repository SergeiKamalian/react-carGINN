import { IBonuse } from "../model/model";

export const getRandomBonuse = (bonuses: IBonuse[], fuelCount: number) => {
    const bonuse = bonuses[Math.floor(Math.random() * bonuses.length)];
    console.log(fuelCount)
    if (bonuse.value === 'fuel' && fuelCount === 5) {
        return { value: 'wall', plus: false }
    } else {
        return bonuse
    }
}