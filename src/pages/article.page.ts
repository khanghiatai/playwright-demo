import { expect, Locator, Page } from "@playwright/test"
import { faker } from '@faker-js/faker'

export class ArticlePage {
    private page: Page 
    private editButton: Locator
    private puslishButton: Locator
    private aboutArticleText: Locator
    private descriptionText: Locator
    private tagText: Locator

    constructor(page: Page){
        this.page = page
        this.editButton = page.getByRole('link', {name: 'Edit Article'}).last()
        this.puslishButton = page.getByRole('button', {name: 'Publish Article'})
        this.aboutArticleText = page.getByPlaceholder("What's this article about?")
        this.descriptionText = page.locator('textarea')
        this.tagText = page.getByPlaceholder('Enter tags')
    }

    async updateArticlePage(){
        await this.editButton.click()
        await expect(this.puslishButton).toBeVisible()
        await this.aboutArticleText.fill(faker.name.firstName())
        await this.descriptionText.fill(faker.lorem.paragraphs())
        await this.tagText.fill(faker.lorem.slug())
        await this.tagText.press('Enter')
        await this.tagText.fill(faker.internet.color())
        await this.tagText.press('Enter')
        await this.puslishButton.click()
    }

}