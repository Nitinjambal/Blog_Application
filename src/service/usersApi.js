
import axios from "axios";

const API_URL = 'http://localhost:3000/api/v1/users'


export const registerUser = async (userData) => {
    try {
        const { data } = await axios.post(`${API_URL}/signup`, userData)
        console.log('output:', data)
    } catch (error) {
        console.log('error:', error)
    }
}



export const loginUser = async (userData) => {
    try {
        const { data } = await axios.post(`${API_URL}/login`, userData)
        console.log('output:', data)
        
    } catch (error) {
        console.log('error:', error)
    }
}
