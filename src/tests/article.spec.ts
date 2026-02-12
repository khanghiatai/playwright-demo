import {test} from '@playwright/test'
import { ArticleApi } from '../api/article.api'

test.describe.serial('Article Page', () => {
    let slug: any
    let articleApi: ArticleApi
    
    test.beforeEach('Init Article', async ({request}) => {
        articleApi = new ArticleApi(request)
    })

    test('Create article', async () => {
        slug = await articleApi.createArticle()
        // await 
    })  

    test('Update article', async () => {
        test.skip(!slug)
        slug = await articleApi.updateArticle(slug)
    })

    test('Get detail of article', async () => {
        test.skip(!slug)
        await articleApi.getDetailArticle(slug)
    })

    test('Delete article', async () => {
        test.skip(!slug)
        await articleApi.deleteArticle(slug)
    })
    
})