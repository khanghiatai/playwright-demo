import {Page} from '@playwright/test'
import { ArticlePage } from '../pages/article.page'

export class ArticleManager{
    private readonly page: Page 
    private readonly artilcePage: ArticlePage

    constructor(page: Page) {
        this.page = page
        this.artilcePage = new ArticlePage(page)
    }

    artile(){
        return this.artilcePage
    }
}