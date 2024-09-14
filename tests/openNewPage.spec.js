import {test, expect} from '@playwright/test';

const playwright = require('playwright');

test.only("check test", async({page}) => {
    await page.goto('https://demoqa.com/browser-windows')
    const tabBtn = await page.locator("#tabButton")
    await tabBtn.click();

    const sampleText = await page.get("#sampleHeading").textContent()
    await expect(sampleTxt).toHaveText("This is a sample page");
})