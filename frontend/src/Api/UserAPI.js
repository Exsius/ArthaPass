import axios from 'axios';

export const changeOrganization = async (user, organizationId) => {
    if (organizationId && user) {
        const result = await axios.post(`/api/user/userchangeorg/${organizationId}`)
        return result.data
    }
}

export const changePassword = async (oldPassword, newPassword) => {
    return await axios.post('/api/user/changePassword', {
        oldPassword: oldPassword,
        newPassword: newPassword
    })
}

export const updateProfilePic = async (formData) => {
    return await axios.post('/api/user/updateProfilePic', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const updateUserInfo = async (userInfo) => {
    return await axios.post('/api/user/updateInfo', userInfo)
}

const userAPI = async (user) => {
    const result = await axios.get('/api/user')
    return result.data
}

export default userAPI