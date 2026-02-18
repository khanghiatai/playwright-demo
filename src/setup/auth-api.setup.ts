import {test} from '@playwright/test'
// import fs from 'fs'
// import user from '../../.auth/user.json'

// const authFile = '.auth/user.json'

test('Login', async({request}) => {
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {"user":{"email":process.env.EMAIL,"password":process.env.PASSWORD}}
    })
    const responseLogin = await response.json()
    const token = responseLogin.user.token
    // user.origins[0].localStorage[0].value = token
    // fs.writeFileSync(authFile, JSON.stringify(user))
    process.env['ACCEPT_TOKEN'] = token
})