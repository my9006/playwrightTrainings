import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    console.log('Starting navigation')
    await page.goto('https://demoqa.com/text-box');
})

test("Fill 'Full name' valid name", async ({page}) => {

        const fullNameElement = await page.getByPlaceholder("Full name");
        const submitButton = await page
            .getByRole('button', {name: 'Submit'});
        const fullNameValue = 'Vardan Mamikonyan';
        await fullNameElement.click();
        await fullNameElement.fill(fullNameValue);
        await submitButton.click();

        const resultElement = await page.locator('#name');

        const resultValue = await resultElement.textContent();
        await expect(resultElement).toBeVisible();
        expect(resultValue).toContain(fullNameValue);
    }
)