import axios from "axios"
const BASE_URL = 'base.url'
export const getLeaders = () => {
    axios
        .get(BASE_URL)
        .then((response) => response.data)
        .catch((error) => error)
}
export const getUserData = (name: string) => {
    axios
        .get(BASE_URL)
        .then((response) => response.data)
        .catch((error) => error)
}