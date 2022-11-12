import { useAuth } from '../Context/UserContext.js';

const Logout = () => {
    const { logout } = useAuth()
    logout()
}

export default Logout