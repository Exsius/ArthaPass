if (!localStorage.getItem('refreshKey')) {
    fetch('http://localhost:3000/api/auth/refreshtoken', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((data) => data.json()).then(data => { return data.refreshToken })
}

window.addEventListener('load', function () {
    const passwordInput = document.querySelector('input[type="password"]').parentElement

    const arthaBox = document.createElement("div");
    arthaBox.innerHTML = '🔒'
    arthaBox.style.borderRadius = '32px'
    arthaBox.style.fontSize = '24px'
    arthaBox.style.textAlign = 'center'
    arthaBox.style.lineHeight = `${(document.querySelector('input[type="password"]')).offsetHeight}px`
    arthaBox.style.backgroundColor = '#03989e'
    arthaBox.style.width = `${(document.querySelector('input[type="password"]')).offsetHeight}px`
    arthaBox.style.height = `${(document.querySelector('input[type="password"]')).offsetHeight}px`
    arthaBox.style.cursor = 'pointer'
    arthaBox.style.position = 'absolute'
    arthaBox.style.left = `${(document.querySelector('input[type="password"]')).offsetWidth - (document.querySelector('input[type="password"]')).offsetHeight}px`
    arthaBox.style.bottom = '0px'
    // arthaBox.style.top = `${(document.querySelector('input[type="password"]')).offsetHeight}px`
    arthaBox.setAttribute("id", "artha-pass helper");

    passwordInput.appendChild(arthaBox)

    document.querySelector('button[type="submit"]').addEventListener('click', async (event) =>{
        const userTokens = await fetch("./conf.json")
        const { refreshToken, accessToken } = await userTokens.json()
        const result = await createPassword()
        if (result.error) {
            localStorage.setItem('accessToken', await refreshToken())
            try {
                await createPassword()
            } catch (err) {
                console.log(err)
            }
        }
    })

},)

const createPassword = async () => {
    const result = await fetch('http://localhost:3000/api/password/create', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('refreshToken')
        },
        body: JSON.stringify({
            site: window.location.href,
            username: document.querySelector('input[type="text"]').value,
            password: document.querySelector('input[type="password"]').value
        })
    })
    return result
}

const refreshToken = async () => {
    const result = await fetch('http://localhost:3000/api/auth/refreshtoken', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('refreshToken')
        },
        body: {
            refreshToken: localStorage.getItem('refreshToken')
        }
    })
    return result
}