import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber, decrypt } from "@celigo/aut-utilities";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T37965", () => {
    test.beforeEach('check sign out', async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        // const isNotLoggedIn = await io.loginPage.checkLoginState();
        // if (!isNotLoggedIn) {
        //     await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
        //     async function attemptSignIn() {
        //         await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
        //         await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
        //         await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
        //     }
        //     await attemptSignIn();
        //     const maxWaitTime = 30000;
        //     const startTime = Date.now();
        //     let errorMessage;
        //     let match;
        //     while (!match && (Date.now() - startTime) < maxWaitTime) {
        //         await page.waitForTimeout(2000);
        //         const pageContent = await page.content();
        //         const errorMessageRegex = /Please try again after (\d+) seconds/;
        //         match = pageContent.match(errorMessageRegex);
        //         if (match && match[1]) {
        //             errorMessage = match[0];
        //         }
        //         if (errorMessage) {
        //             const waitSeconds = parseInt(match[1]);
        //             console.log('Waiting for', waitSeconds, 'seconds before retrying');
        //             await page.waitForTimeout(waitSeconds * 1000);
        //             console.log('Retrying sign-in after wait');
        //             await attemptSignIn();
        //         }
        //     }
        // }
    });
    test("@Epic-IO-80201 @Priority-P2 @Env-All @Zephyr-IO-T37965", async ({ io, page, context }) => {
        // Navigate to the home page
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();

        await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
        await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
        await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();

        // Store the URL of the current page
        const currentURL = page.url();

        // Open a new tab and navigate to the same URL
        const newPage = await context.newPage();
        await newPage.goto(currentURL);
        await io.flowBuilder.loadingTime();

        // Perform actions in the new tab
        await newPage.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await newPage.click(selectors.basePagePO.SIGN_OUT);
        await io.flowBuilder.loadingTime();

        // Close the new tab
        await newPage.close();

        // Switch back to the original tab
        await page.bringToFront();
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Resources", "Imports");
        await page.waitForTimeout(2000);
        //IO-T37965 Verify session expire page is showing as expected
        const expirepage = await page.$$(selectors.signUpPagePO.SESSION_LEFT_PANNEL);
        const element = expirepage[1];
        const screenshot = await element.screenshot();
        expect(screenshot).toMatchSnapshot("T37965.png", { maxDiffPixelRatio: 0.8 });




    });
});