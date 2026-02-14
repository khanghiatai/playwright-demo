import {APIRequestContext, expect} from '@playwright/test'
import artile from '../data/article.json'
import { faker } from '@faker-js/faker'

export class ArticleApi {
    private request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request
    }

    initArticleData () {
        const data = {
            ...artile,
        }
        data.article.title = JSON.stringify(Date.now())
        return data
    }

    artileDataUpdate (slug: string) {
        const data = {
            ...artile, 
        }
        data.article.slug = slug
        data.article.title = faker.name.jobTitle() 
        data.article.description = faker.name.jobDescriptor()
        data.article.body = faker.name.suffix() 
        data.article.tagList = [faker.name.firstName(), faker.name.lastName()]
        return data
    }

    async createArticle(){
        // data test 
        const payload = this.initArticleData()
        // console.log(payload)
        const response = await this.request.post('https://conduit-api.bondaracademy.com/api/articles/', {
            data: payload
        })
        
        // validate status code response 
        expect(response.status()).toBe(205)
        // validate header content-type
        expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
        
        // validate response  
        const responseBody = await response.json()
        // console.log('responseBody', responseBody)
        const article = responseBody.article
        const slug = article.slug //get slug
        
       // validate data structure
        expect(responseBody).toHaveProperty('article')
        expect(responseBody.article).toHaveProperty('slug')
        
        // validate data format/schema
        expect(typeof article.title).toBe('string')
        expect(article.title.length).toBeGreaterThan(0)
        expect(article.title).toMatch(/^[A-Z0-9]+$/)

        return slug
    }

    async updateArticle(slug: string){
        const payload = this.artileDataUpdate(slug)

        const response = await this.request.put(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, {
            data: payload
        })
        // get body 
        const responseBody = await response.json()

        // validate status 
        expect(response.status()).toBe(200)

        // validate header content-type 
        expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

        // validate schema/strucuture
        expect(responseBody.article).toHaveProperty('author')
        expect(responseBody.article).toHaveProperty('slug')
        expect(responseBody.article).toHaveProperty('title')

        // validate format/ field require
        expect(typeof await responseBody.article.slug).toBe('string')
        return responseBody.article.slug
    }

    async deleteArticle(slug: string){
        const request = await this.request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}`)
        expect(request.status()).toBe(204)
    }

    async getDetailArticle(slug: string){
        const response = await this.request.get(`https://conduit-api.bondaracademy.com/api/articles/${slug}`)
        // Check status 
        expect(response.status()).toBe(200)
        // Check header 
        expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
        // check schelma
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('article')
        const dataType = responseBody.article 
        expect(dataType).toHaveProperty('slug')
        expect(dataType).toHaveProperty('title')
        expect(dataType).toHaveProperty('description')
        expect(dataType).toHaveProperty('body')
        expect(dataType).toHaveProperty('tagList')
        expect(dataType).toHaveProperty('favorited')
        expect(dataType).toHaveProperty('favoritesCount')
        expect(dataType).toHaveProperty('updatedAt')
        expect(dataType).toHaveProperty('author')
        // check type of field
        expect(typeof dataType.slug).toBe('string')
        expect(typeof dataType.title).toBe('string')
        expect(typeof dataType.description).toBe('string')
        expect(typeof dataType.body).toBe('string')
        expect(Array.isArray(dataType.tagList)).toBe(true) // array 
        expect(typeof dataType.favorited).toBe('boolean')
        expect(typeof dataType.favoritesCount).toBe('number')
        expect(typeof dataType.updatedAt).toBe('string')
        expect(typeof dataType.author).toBe('object')
        return response.status()
    }
}