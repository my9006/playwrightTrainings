const {test, expect} = require('@playwright/test');

let moviesNames = new Map();
let numberOfMovies;

test.describe('Movie Tests', () => {
    let page;
    let sharedBrowser;
    test.beforeAll(async ({browser}) => {
        sharedBrowser = await browser;
        page = await browser.newPage();
        await page.goto('https://www.imdb.com/chart/top/');
        await page.waitForLoadState('networkidle');

        const movies = await page.locator('.cli-parent [class="ipc-title-link-wrapper"]').all();
        for (let i = 0; i < movies.length; i++) {
            let movieName = await movies[i].textContent();
            moviesNames.set(i, movieName.trim());
        }
        numberOfMovies = Array.from(moviesNames.keys()).length;
        await page.close();
    });

    for (let i = 0; i < 250; i++) {
        test(`Namings ${i}`, async ({page}) => {
            // const page = await sharedBrowser.newPage();
            await page.goto('https://www.imdb.com/chart/top/');
            await page.waitForLoadState('networkidle');
            const movieElement = await page.locator('.cli-parent', {hasText: moviesNames.get(i)});
            const rating = await movieElement.locator(".ipc-rating-star--rating");
            const voteCount = await movieElement.locator(".ipc-rating-star--voteCount");
            const topPageRating = await rating.textContent();
            const topPageVoteCount = await voteCount.textContent();
            const topPageVoteCount1 = topPageVoteCount.replace("(", "").replace(")", "").trim();
            await movieElement.locator(".ipc-title__text").click();
            console.log(`${topPageRating} + ${topPageVoteCount1}`)

            const movieDetailRatingEl = await page.locator("[data-testid='hero-rating-bar__aggregate-rating__score']").first();
            const movieDetailRatingAll = await movieDetailRatingEl.textContent();
            const movieDetailRatingValue = movieDetailRatingAll.split('/')[0];

            const movieDetailsVotesEl = await page.locator('[data-testid="hero-rating-bar__aggregate-rating"]').first();
            const movieVotesElAll = await movieDetailsVotesEl.textContent();
            const movieVotesElValue = movieVotesElAll.split('10')[1];

            expect(movieDetailRatingValue).toBe(topPageRating);
            expect(movieVotesElValue).toBe(topPageVoteCount1);
            await page.close();
        });
    }
});


