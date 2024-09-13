import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber, decrypt } from "@celigo/aut-utilities";
import TC from "@testData/signoutPage/T37520.json";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T37519 @Zephyr-IO-T37544", () => {
    let email;
    test.afterEach(async ({ io }) => {
        await io.api.deleteUserViaEmail(email);
    });
    test.beforeEach('check sign out', async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        const isNotLoggedIn = await io.loginPage.checkLoginState();
        if (!isNotLoggedIn) {
            await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
            async function attemptSignIn() {
                await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
                await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
                await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
            }
            await attemptSignIn();
            const maxWaitTime = 30000;
            const startTime = Date.now();
            let errorMessage;
            let match;
            while (!match && (Date.now() - startTime) < maxWaitTime) {
                await page.waitForTimeout(2000);
                const pageContent = await page.content();
                const errorMessageRegex = /Please try again after (\d+) seconds/;
                match = pageContent.match(errorMessageRegex);
                if (match && match[1]) {
                    errorMessage = match[0];
                }
                if (errorMessage) {
                    const waitSeconds = parseInt(match[1]);
                    console.log('Waiting for', waitSeconds, 'seconds before retrying');
                    await page.waitForTimeout(waitSeconds * 1000);
                    console.log('Retrying sign-in after wait');
                    await attemptSignIn();
                }
            }
        }
    });
    test("@Epic-IO-80201 @Priority-P2 @Env-All @Zephyr-IO-T37519 @Zephyr-IO-T37544", async ({ io, page }) => {
        email = `qaautomation1+${randomString(5) + randomNumber(5)
            }emailsuite@celigo.com`;
        TC.newUser.emails[0] = email
        await io.api.inviteUserThruApi(TC.newUser);
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        await io.homePage.loadingTime();

        await page.waitForTimeout(5000);
        const webLink = new URL(process.env.IO_UI_CONNECTOR_URL);
        const userEmail = process.env.IO_UserName;
        // Define zero-width space
        const zeroWidthSpace = '\u200B';
        // Modify the email to insert zero-width spaces before and after dots or any specific locations
        const modifiedEmail = userEmail
            .replace(/\./g, `${zeroWidthSpace}.${zeroWidthSpace}`)  // Insert zero-width space around dots
            .replace(/\+/g, `${zeroWidthSpace}+${zeroWidthSpace}`);  // Insert zero-width space around plus sign

        // Now form the link using the modified email
        const link = await io.emailVal.getLinkFromEmail(`[${webLink.host}] ${modifiedEmail} sent you an invite`, true, "pwqa1");
        const linkString = Array.isArray(link) ? link[0] : link;
        // Clean the link by removing unwanted characters
        const cleanedLink = linkString.replace(/\\r\\n\\r\\nThe$/, '');
        await io.homePage.navigateTo(cleanedLink.toString());
        await io.homePage.loadingTime();

        //IO-T37519 Verify Layout and UI Elements on the user activation page
        // const leftPannel = await page.$$(selectors.signUpPagePO.LEFT_PANNEL);
        // const element = leftPannel[1];
        // const screenshot = await element.screenshot();
        // expect(screenshot).toMatchSnapshot("T37519.png", { maxDiffPixelRatio: 0.2 }); not able to validate as mail changing everytime

        //IO-T37544 Verify Layout and UI Elements when Activation link expire
        const modifiedUrl = cleanedLink + '3rt3';
        await io.homePage.navigateTo(modifiedUrl.toString());
        await io.homePage.loadingTime();
        await page.waitForTimeout(5000);
        const leftPannel1 = await page.$$(selectors.signUpPagePO.LEFT_PANNEL);
        const element1 = leftPannel1[1];
        const screenshot1 = await element1.screenshot();
        expect(screenshot1).toMatchSnapshot("T37544.png", { maxDiffPixelRatio: 0.8 });
    });
});