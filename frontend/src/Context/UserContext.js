import { useState, createContext, useContext, useEffect } from 'react'
import axios from 'axios'

import Loading from '../Pages/Loading.js'

const UserContext = createContext()

export const useAuth = () => {
    return useContext(UserContext)
}

const UserProvider = (props) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const login = (username, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.post('/api/login', {
                    username: username,
                    password: password,
                })
                setUser(data)
                resolve()
            } catch (err) {
                return reject(err.request.response)
            }
        })
    }

    const logout = async () => {
        try {
            setUser(null)
            await axios.post('/api/logout')
        } catch (err) {
            return err.response.data
        }
    }

    useEffect(() => {
        axios.post('/api/auth')
        .then(res => {
            setUser({ id: res.data.id })
            setLoading(false)
        })
        .catch(err => {
            setLoading(false)
        })
    }, [])

    const value = {
        user,
        login,
        logout,
    }

    return (
        <UserContext.Provider value={value}>
            {!loading ? 
            props.children
            :
            <Loading />
            }
        </UserContext.Provider>
    )
}

export default UserProvider