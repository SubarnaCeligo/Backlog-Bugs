import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber, decrypt } from "@celigo/aut-utilities";

test.describe("@Author_MaheshNivruttiSutar IO-IO-80201 Epic automation", () => {
    // test.beforeEach('check sign out', async ({ io, page }) => {
    //     await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    //     const isNotLoggedIn = await io.loginPage.checkLoginState();
    //     if (!isNotLoggedIn) {
    //         await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
    //         async function attemptSignIn() {
    //             await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
    //             await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
    //             await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
    //         }
    //         await attemptSignIn();
    //         const maxWaitTime = 30000;
    //         const startTime = Date.now();
    //         let errorMessage;
    //         let match;
    //         while (!match && (Date.now() - startTime) < maxWaitTime) {
    //             await page.waitForTimeout(2000);
    //             const pageContent = await page.content();
    //             const errorMessageRegex = /Please try again after (\d+) seconds/;
    //             match = pageContent.match(errorMessageRegex);
    //             if (match && match[1]) {
    //                 errorMessage = match[0];
    //             }
    //             if (errorMessage) {
    //                 const waitSeconds = parseInt(match[1]);
    //                 console.log('Waiting for', waitSeconds, 'seconds before retrying');
    //                 await page.waitForTimeout(waitSeconds * 1000);
    //                 console.log('Retrying sign-in after wait');
    //                 await attemptSignIn();
    //             }
    //         }
    //     }
    // });
    test("@Epic-IO-IO-80201 @Priority-P2 @Env-All @Zephyr-IO-T37545", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        await io.homePage.addStep("*** Navigated to Signin page ***");
        await io.homePage.loadingTime();
        await page.getByText("Loading...").waitFor({ state: "hidden", timeout: 360000 });

        await io.homePage.navigateTo(
            process.env.IO_UI_CONNECTOR_URL + "accept-invite/681e45e607f3429da067db26fb52efba"
        );
        await io.homePage.addStep("*** Navigated to Invitation link page ***");
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.signUpPagePO.SIGNIN);
        await io.homePage.loadingTime();
        const regex1 = /signin$/;
        await page.waitForURL(regex1);
        await io.assert.expectToContainValue(
            "signin",
            page.url(),
            "URL doesn't contain signin"
        );
    });
});