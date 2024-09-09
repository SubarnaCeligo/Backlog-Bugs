import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber, decrypt } from "@celigo/aut-utilities";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T37495 @Zephyr-IO-T37494 @Zephyr-IO-T37509 @Zephyr-IO-T37484", () => {
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
    test("@Epic-IO-80201 @Priority-P2 @Env-All @Zephyr-IO-T37495 @Zephyr-IO-T37494 @Zephyr-IO-T37509 @Zephyr-IO-T37484", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        await io.homePage.addStep("*** Navigated to Signin page ***");
        await io.homePage.loadingTime();
        await io.homePage.navigateTo(process.env["IOURL"]);
        await io.homePage.loadingTime();
        await page.getByText("Loading...").waitFor({ state: "hidden", timeout: 360000 });

        //IO-T37509 Verify sign-in button is showing in black
        const element = page.locator(selectors.basePagePO.SUBMIT);
        const backgroundColor = await element.evaluate(el => {
            return window.getComputedStyle(el).backgroundColor;
        });
        await io.assert.expectToBeValue("rgb(9, 9, 11)", backgroundColor, "Sign inn button not showing in black");

        //IO-T37484 Verify that Placeholder Text is added for the Email and Password fields.
        //Email
        const email = await io.flowBuilder.isVisible("text='Email'");
        await io.assert.expectToBeTrue(email, 'Email placeholder text is not displayed');
        //Password
        const password = await io.flowBuilder.isVisible("text='Password'");
        await io.assert.expectToBeTrue(password, 'Password placeholder text is not displayed');

        await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
        await io.homePage.loadingTime();
        //IO-T37495 Verify the user is re-directed Sign in page after clicking on the “Contact us” link.
        await io.assert.verifyElementAttributeContainsText(
            selectors.signUpPagePO.CONTACT_US,
            'href',
            'https://www.celigo.com/contact-us/');



        //IO-T37494 Verify the user is re-directed Sign in page after clicking on the “Back to sign in” Link
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