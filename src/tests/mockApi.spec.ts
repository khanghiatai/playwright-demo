import { test, expect } from '@playwright/test'
import user from '../data/userMockApi.json'
import articles from '../data/homeMockApi.json'
import tags from '../data/tagMockApi.json'

test.beforeEach(async ({ page }) => {
    await page.route('**/api/articles?limit=10&offset=0',
        async route => {
            await route.fulfill({
                body: JSON.stringify(
                    articles
                )
            });
        }
    );
    await page.route('*/**/api/user',
        async route => {
            await route.fulfill({
                body: JSON.stringify(
                    user
                )
            });
        }
    );
    await page.route('**/api/tags', async route => {
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })
    
    await page.goto('/');
    await page.waitForLoadState('networkidle')
});

test('mock tags api', async ({ page }) => {
    await expect(page).toHaveURL('/')
    // Assertion user name 
    await expect(page.getByText('Xin chào ^^')).toBeVisible()
});