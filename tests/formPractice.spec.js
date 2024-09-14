import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://demoqa.com/automation-practice-form')
})

test.only('Fill full form', async ({page}) => {
    const firstName = await page.getByPlaceholder('First Name');
    const lastName = await page.getByPlaceholder('Last Name');
    const email = await page.getByPlaceholder('Email');
    const subjectElement = await page.locator('[id="subjectsContainer"]>div>div:nth-child(1)')
    await subjectElement.click();
    await subjectElement.locator('[id="subjectsInput"]').fill("Math");

    // const genderFemale = await page.getByRole('radio', {name: 'gender'}).nth(1);
    // const genderOther = await page.getByRole('radio', {name: 'gender'}).nth(2);

    debugger;
})