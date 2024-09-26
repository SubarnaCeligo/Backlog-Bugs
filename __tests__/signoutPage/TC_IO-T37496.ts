import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T37482 @Zephyr-IO-T37485 @Zephyr-IO-T37492 @Zephyr-IO-T37505 @Zephyr-IO-T37496", () => {
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
    test("@Epic-IO-80201 @Priority-P2 @cross-browser @Env-All @Zephyr-IO-T37482 @Zephyr-IO-T37485 @Zephyr-IO-T37492 @Zephyr-IO-T37505 @Zephyr-IO-T37496", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        // await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
        // await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
        // await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        await io.homePage.waitForElementAttached(selectors.loginPagePO.FORGOT_PASSWORD);
        await io.homePage.loadingTime();

        //IO-T37485 Verify that the Sign-in page UI is displayed properly in different browsers.
        //IO-T37482 Verify Layout and UI Elements on Sign-in Page
        const leftPannel = await page.$$(selectors.signUpPagePO.LEFT_PANNEL);
        const element = leftPannel[1];
        const screenshot = await element.screenshot();
        expect(screenshot).toMatchSnapshot("T37482.png", { maxDiffPixelRatio: 0.8 });

        //IO-T37492 Verify Layout and UI Elements on Forgot passaword Page
        await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
        await io.homePage.waitForElementAttached(selectors.basePagePO.SUBMIT);
        await io.homePage.loadingTime();
        const leftPannel1 = await page.$$(selectors.signUpPagePO.LEFT_PANNEL);
        const element1 = leftPannel1[1];
        const screenshot1 = await element1.screenshot();
        expect(screenshot1).toMatchSnapshot("T37492.png", { maxDiffPixelRatio: 0.8 });

        //IO-T37505 Verify Layout and UI Elements on Reset password Page
        await io.homePage.loadingTime();
        await io.homePage.fill(selectors.homePagePO.EMAIL, "qaautomation1+emailsuite@celigo.com");
        await io.homePage.click(selectors.basePagePO.SUBMIT);
        // Delay for new email to be sent, otherwise picks up old email
        await page.waitForTimeout(5000);
        const webLink = new URL(process.env.IO_UI_CONNECTOR_URL);
        const link = await io.emailVal.getLinkFromEmail(`[${webLink.host}] Request to reset your password`, false, "pwqa1");
        await io.homePage.navigateTo(link.toString());
        await io.homePage.waitForElementAttached(selectors.basePagePO.SUBMIT);
        await io.homePage.loadingTime();
        const leftPannel2 = await page.$$(selectors.signUpPagePO.LEFT_PANNEL);
        const element2 = leftPannel2[1];
        const screenshot2 = await element2.screenshot();
        expect(screenshot2).toMatchSnapshot("T37505.png", { maxDiffPixelRatio: 0.8 });

        //Reset password expire
        const modifiedUrl = link + '3rt3';
        await io.homePage.navigateTo(modifiedUrl.toString());
        await io.homePage.loadingTime();
        const leftPannel4 = await page.$$(selectors.signUpPagePO.LEFT_PANNEL);
        const element4 = leftPannel4[1];
        const screenshot4 = await element4.screenshot();
        expect(screenshot4).toMatchSnapshot("T37505_1.png", { maxDiffPixelRatio: 0.8 });


        //IO-T37496 Verify Layout and UI Elements on sign-up Page
        await io.signInPage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "signup");
        await io.homePage.waitForElementAttached(selectors.signUpPagePO.EUROPEAN_UNION);
        await io.homePage.loadingTime();
        const leftPannel3 = await page.$$(selectors.signUpPagePO.LEFT_PANNEL);
        const element3 = leftPannel3[1];
        const screenshot3 = await element3.screenshot();
        expect(screenshot3).toMatchSnapshot("T37496.png", { maxDiffPixelRatio: 0.8 });

    });
});