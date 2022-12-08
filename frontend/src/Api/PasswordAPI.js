import axios from 'axios';

export const getPassword = async (id) => {
    const result = await axios.get(`/api/password/get/${id}`)
    return result.data
}

export const getPasswordList = async (user_email) => {
    const result = await axios.get(`/api/password/getList/`)
    return result.data
}

export const editPassword = async (id, username, password, tags) => {
    const result = await axios.post(`/api/password/edit/${id}`, {
        username: username,
        password: password,
        tags: tags,
    })
    return result.data
}

export const createPassword = async (site, username, password) => {
    const result = await axios.post(`/api/password/create/`, {
        site: site,
        username: username,
        password: password,
    })
    return result.data
}

export const scanPassword = async (id) => {
    const result = await axios.get(`/api/password/scan/${id}`)
    return result.data
}

export const deletePassword = async (id) => {
    const result = await axios.post(`/api/password/delete/${id}`)
    return result.data
}