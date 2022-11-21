import { useState, createContext, useContext, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const useAuth = () => {
    return useContext(UserContext)
}

const UserProvider = (props) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState({})
    const [organizationInfo, setOrganizationInfo] = useState({})
    const [activeSnackbar, setActiveSnackbar] = useState()
    const [navbarAction, setNavbarAction] = useState()
    const [params, setParams] = useState()

    const login = async (username, password) => {
        const result = await axios.post('/api/login', {
            username: username,
            password: password,
        })
        if (result.data.error) {
            return result.data.error
        } else {
            setUser(result.data)
        }
    }

    const register = async (fname, lname, username, password) => {
        const result = await axios.post('/api/register', {
            fname: fname.value,
            lname: lname.value,
            email: username.value,
            password: password.value
        })
        return result.data
    }

    const logout = async () => {
        const result = await axios.post('/api/logout')
        setUser(null)
        return result.data.success
    }

    useEffect(() => {
        axios.get('/api/auth').then(res => {
            if (!res.data.error) {
                setUser(res.data)
                setLoading(false)
            } else {
                setLoading(false)
            }
        })
    }, [])

    const value = {
        user,
        login,
        register,
        logout,
        activeSnackbar,
        setActiveSnackbar,
        userInfo,
        setUserInfo,
        organizationInfo,
        setOrganizationInfo,
        navbarAction,
        setNavbarAction,
        params,
        setParams
    }

    return (
        <UserContext.Provider value={value}>
            {!loading && props.children}
        </UserContext.Provider>
    )
}

export default UserProvider