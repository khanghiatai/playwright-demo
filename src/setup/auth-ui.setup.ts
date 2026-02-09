import {expect, test} from '@playwright/test'

const authFile = '.auth/user.json'

test('Login on Page', async({page}) => {
    await page.goto('/login')
    await page.getByPlaceholder('Email').fill(process.env.EMAIL as string)
    await page.getByPlaceholder('Password').fill(process.env.PASSWORD as string)
    await page.getByRole('button', {name: 'Sign In'}).click()
    await expect(page.getByRole('link', {name: 'Setting'})).toBeVisible()
    await page.context().storageState({path: authFile})
    // fs.writeFileSync(authFile, responseLogin.user.token)
})