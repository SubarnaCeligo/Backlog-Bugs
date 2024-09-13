import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber, decrypt } from "@celigo/aut-utilities";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T37536 @Zephyr-IO-T37517 @Zephyr-IO-T37540", () => {
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
    test("@Epic-IO-80201 @Priority-P2 @Env-All @Zephyr-IO-T37536 @Zephyr-IO-T37517 @Zephyr-IO-T37540", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        await io.homePage.loadingTime();

        await io.signInPage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "signup");
        await io.homePage.loadingTime();
        await io.signInPage.fill(selectors.basePagePO.NAME, "Test Auto");
        let email = `qaautomation1+${randomString(5) + randomNumber(5)
            }emailsuite@celigo.com`;
        await io.signInPage.fill(selectors.loginPagePO.EMAIL, email);
        await io.signInPage.fill(selectors.loginPagePO.COMPANY, "Celigo");
        await io.signInPage.click(selectors.basePagePO.AGREETOSANDPP);
        await io.signInPage.click(selectors.loginPagePO.SIGN_UP_BUTTON);
        await io.homePage.loadingTime();
        await page.waitForTimeout(2000);

        //IO-T37517 Verify Layout and UI Elements on Screen display after sign-up.
        const leftPannel = await page.$$(selectors.signUpPagePO.LEFT_PANNEL);
        const element = leftPannel[1];
        const screenshot = await element.screenshot();
        expect(screenshot).toMatchSnapshot("T37517.png", { maxDiffPixelRatio: 0.8 });



        //IO-T37536 Verify Layout and UI Elements on create password Page
        await page.waitForTimeout(5000);
        let link = await io.emailVal.getLinkFromEmail(
            "Activate your Celigo staging.integrator.io account",
            true,
            "pwqa1"
        );
        await io.homePage.navigateTo(link[0].split("<br>")[0]);
        await io.homePage.loadingTime();
        let createMsg = await page.getByText("Create your password");
        expect(await createMsg.isVisible()).toBeTruthy();
        const leftPannels = await page.$$(selectors.signUpPagePO.LEFT_PANNEL);
        const elements = leftPannels[1];
        const screenshot1 = await elements.screenshot();
        expect(screenshot1).toMatchSnapshot("T37536.png", { maxDiffPixelRatio: 0.8 });


        //IO-T37540 Verify Layout and UI Elements when Accept invite link expire
        const modifiedUrl = link[0].split("<br>")[0] + '3rt3';
        await io.homePage.navigateTo(modifiedUrl.toString());
        await io.homePage.loadingTime();
        const leftPannel1 = await page.$$(selectors.signUpPagePO.LEFT_PANNEL);
        const element1 = leftPannel1[1];
        const screenshot2 = await element1.screenshot();
        expect(screenshot2).toMatchSnapshot("T37540.png", { maxDiffPixelRatio: 0.8 });

    });
});