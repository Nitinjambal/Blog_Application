
import axios from "axios";
import { getAccessToken } from "../utils/commenUtils";

const API_URL = 'http://localhost:3000/api/v1/users'


export const registerUser = async (userData) => {
    try {
        const { data } = await axios.post(`${API_URL}/signup`, userData, {
            headers: {
                authorization: getAccessToken()
            }
        })
        console.log('output:', data)
    } catch (error) {
        console.log('error:', error)
    }
}



export const loginUser = async (userData) => {
    try {
        const { data } = await axios.post(`${API_URL}/login`, userData, {
            headers: {
                authorization: getAccessToken()
            }
        })
        console.log('output:', data)

    } catch (error) {
        console.log('error:', error)
    }
}
