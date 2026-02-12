import {test as base} from '@playwright/test'
import { ArticleApi } from '../api/article.api'
import { ArticleManager } from '../managers/article.manager'

type fixtureAricle = {
    dataArticle: string 
    articleManager: ArticleManager
}

export const test = base.extend<fixtureAricle>({
    dataArticle: async({request}, use) => {
        const apiArticle = new ArticleApi(request)
        const slugId = await apiArticle.createArticle()
        await use(slugId)
        await apiArticle.deleteArticle(slugId)
    },
    articleManager: async({page}, use) => {
        const articleManager = new ArticleManager(page)
        await use(articleManager)
        await articleManager.artile().updateArticlePage()
    }
})