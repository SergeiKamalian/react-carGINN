import { IBonuse } from "../model/model";

export const getRandomBonuse = (bonuses: IBonuse[]) => {
    return bonuses[Math.floor(Math.random() * bonuses.length)];
}