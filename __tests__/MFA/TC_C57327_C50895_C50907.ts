
import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";


test.describe("C57327_C50895_C50907", () => {
    test.beforeEach('check sign out', async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        const isNotLoggedIn = await io.loginPage.checkLoginState();
        if (!isNotLoggedIn) {
            await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
            await io.homePage.click(selectors.basePagePO.SIGN_OUT);

        }
    })
    test.skip("@Env-All @Zephyr-IO-T17011 @Zephyr-IO-T19643 @Zephyr-IO-T19641 C57327_C50895_C50907", async ({ io, page }) => {
        await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
        await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
        await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
        await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
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
        }
        if (errorMessage) {
            const waitSeconds = parseInt(match[1]);
            await page.waitForTimeout(waitSeconds * 1000);
            console.log('Waiting time is', waitSeconds)
            await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
            console.log('After successfully wait clicked signin')
        }
        await io.signInPage.waitForElementAttached(':has-text("Trust this device")');
        await io.signInPage.reloadPage();
        await io.signInPage.waitForElementAttached(':has-text("Trust this device")');

        await test.step("C57327 Verify if we refresh the MFA verify page we should be staying on the same page and not navigated to other pages", async () => {
            await io.assert.verifyElementDisplayedByText('Authenticate with one-time passcode', 'Authenticate with one-time passcode is not displayed');
            await io.assert.verifyElementDisplayedByText('Trust this device', 'Trust this device is not displayed');
        });

        await test.step("C50895 Verify the trusted device message for account owner.", async () => {
            await io.assert.verifyElementContainsText('[id="notification"]', 'You are signing in from a new device. Enter your passcode to verify your account.');
        });

        await test.step("C50907 Verify if the user can trust the device from the OTP page window..", async () => {
            await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.TRUST_DEVICE, 'Trust device is not displayed');
        });

    });

});