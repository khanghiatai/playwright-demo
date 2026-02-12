import {test as base} from '@playwright/test'
import { ArticleApi } from '../api/article.api'
import { ArticleManager } from '../managers/article.manager'

type ArticleFixture = {
    articleFixture: string
    articleManager: ArticleManager
}

export const test =  base.extend<ArticleFixture> ({
    articleFixture: async({request}, use) => {
        const articleApi = new ArticleApi(request)
        const slugId = await articleApi.createArticle()
        
        await use(slugId) // 
        
        await articleApi.deleteArticle(slugId)
    }, 

    articleManager: async({page}, use) => {
        const articleManager = new ArticleManager(page)
        await use(articleManager)
    }
})