import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL = "http://localhost:3001";

// contains all API calls related to recipe endpoints. 

class UserAPI {

    static token;

    static async register(data) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/register`, data)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    static async login(data) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/token`, data)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    static async editUser(username, data, token) {

        if (data.firstName === '') data.firstName = null
        if (data.lastName === '') data.lastName = null
        if (data.email === '') data.email = null
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.patch(`${BASE_URL}/users/${username}`, data, { headers })
        console.log('edit user res', res)
        return res
    }

    static async getUserInfo(username, token) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get(`${BASE_URL}/users/${username}`, { headers })
            return res.data.user
        } catch (err) {
            console.log(err)
        }
    }


}

export default UserAPI;