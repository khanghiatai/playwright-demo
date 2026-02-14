import {test} from '@playwright/test'
import { ArticleApi } from '../api/article.api'
import { ArticleManager } from '../managers/article.manager'

test.describe('Test API & UI', () => {
    let articleApi: ArticleApi
    let manager: ArticleManager

    test.beforeEach(async ({page,request}) => {
        articleApi = new ArticleApi(request)
        manager = new ArticleManager(page)
    })

    test('Combining', async ({page}) => {
        // call API create 
        const slug = await articleApi.createArticle()
        test.skip(!slug)
        await page.goto(`/article/${slug}`)

        // update article on page 
        await manager.artile().updateArticlePage()
        
        // call API delete
        await articleApi.deleteArticle('123')
    })
})

// login api 
// tạo bài viết = api 
// sửa bài viết = ui 
// xóa bài viết = apI 