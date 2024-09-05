import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T37493 @Zephyr-IO-T37502 @Zephyr-IO-T37493 @Zephyr-IO-T37502", () => {
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
    test("@Epic-IO-80201 @Priority-P2 @Env-All @Zephyr-IO-T37502", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        await io.homePage.loadingTime();

        await io.signInPage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "signup");
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
        //IO-T37502 Verify that the 'Already have an account? Sign in' link redirects to the sign-in page.
        await io.homePage.loadingTime();
        const regex2 = /signin$/;
        await page.waitForURL(regex2);
        await io.assert.expectToContainValue(
            "signin",
            page.url(),
            "URL doesn't contain signin"
        );

    });
    test("@Epic-IO-80201 @Priority-P2 @Env-All @Zephyr-IO-T37493", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        await io.homePage.loadingTime();
        await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
        await io.homePage.loadingTime();
        //IO-T37493 Verify error msg should display if a user clicks on Submit with Empty Input.
        await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
        await io.assert.verifyElementDisplayedByText(
            "Email is required.",
            "Email is required.' text is not displayed"
        );
    });
    test("@Epic-IO-80201 @Priority-P2 @Env-All @Zephyr-IO-T37493 @Zephyr-IO-T37502", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        await io.homePage.loadingTime();
        await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
        await io.homePage.loadingTime();
        //IO-T37493 Verify error msg should display if a user clicks on Submit with Empty Input.
        await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
        await io.assert.verifyElementDisplayedByText(
            "Email is required.",
            "Email is required.' text is not displayed"
        );
        await io.homePage.loadingTime();
        await io.homePage.fill(selectors.homePagePO.EMAIL, "qaautomation1+emailsuite@celigo.com");
        await io.homePage.click(selectors.basePagePO.SUBMIT);
        // Delay for new email to be sent, otherwise picks up old email
        await page.waitForTimeout(5000);
        const webLink = new URL(process.env.IO_UI_CONNECTOR_URL);
        const link = await io.emailVal.getLinkFromEmail(`[${webLink.host}] Request to reset your password`, false, "pwqa1");
        await io.homePage.navigateTo(link.toString());
        await io.homePage.loadingTime();
        await io.homePage.fill(selectors.importPagePO.PASSWORD, "123");
        await io.assert.verifyElementDisplayedByText(
            "Your password is not strong enough.",
            "'Your password is not strong enough.' text is not displayed"
        );
        await io.homePage.loadingTime();
        await io.homePage.clearTextValue(selectors.importPagePO.PASSWORD);
        await io.assert.verifyElementDisplayedByText(
            "New password is required.",
            "'New password is required.' text is not displayed"
        );

    });
});