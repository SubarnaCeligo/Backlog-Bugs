import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber, decrypt } from "@celigo/aut-utilities";
import TC from "@testData/signoutPage/T37520.json";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T37520 @Zephyr-IO-T37521 @Zephyr-IO-T37522 @Zephyr-IO-T37523", () => {
    let email;
    test.afterEach(async ({ io }) => {
        await io.api.deleteUserViaEmail(email);
    });
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
    test("@Epic-IO-80201 @Priority-P2 @Env-All @Zephyr-IO-T37520 @Zephyr-IO-T37521 @Zephyr-IO-T37522 @Zephyr-IO-T37523", async ({ io, page }) => {
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

        //IO-T37520 Verify that the required fields display validation messages when left empty on the ser activation page.
        await io.homePage.click(selectors.signUpPagePO.SIGNUP);
        await io.assert.verifyElementDisplayedByText(
            "A value must be provided.Please enter your first and last name.",
            "'A value must be provided.Please enter your first and last name.' text is not displayed"
        );
        await io.assert.verifyElementDisplayedByText(
            "A value must be provided.",
            "'A value must be provided.' text is not displayed"
        );
        await io.assert.verifyElementDisplayedByText(
            "You must agree to the Terms of Service / Service Subscription Agreement and Privacy Policy to continue.",
            "'You must agree to the Terms of Service / Service Subscription Agreement and Privacy Policy to continue.' text is not displayed"
        );

        let enterNew = await page.getByText("Password is required.").nth(1);
        await io.assert.expectToBeTrue(await enterNew.isVisible(), 'Password is required. is not visible');

        let confirmNew = await page.getByText("Password is required.").nth(0);
        await io.assert.expectToBeTrue(await confirmNew.isVisible(), 'Password is required. is not visible');

        //IO-T37521 Verify user is not able to edit email field on the user activation page
        const email1 = await page.$(selectors.signUpPagePO.EMAIL);
        const status = await email1.isDisabled();
        await io.assert.expectToBeFalse(status, "Email field is not enabled");

        //IO-T37522 Verify that the region selection (North America, European Union) works correctly from user activation page.
        await io.homePage.click(selectors.signUpPagePO.EUROPEAN_UNION);
        await io.homePage.loadingTime();
        // verify sign in page
        const euLoginUrl = await io.homePage.getCurrentUrl();
        await io.assert.expectToContainValue("https://eu.integrator.io/signup", euLoginUrl, "Incorrect EU url")

        //IO-T37523 Verify that the 'Already have an account? Sign in' link redirects to the sign-in page from user activation page.
        await io.homePage.navigateTo(cleanedLink.toString());
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
        await io.homePage.loadingTime();
        const regex2 = /signin$/;
        await page.waitForURL(regex2);
        await io.assert.expectToContainValue(
            "signin",
            page.url(),
            "URL doesn't contain signin"
        );

    });
});