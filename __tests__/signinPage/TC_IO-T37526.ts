import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('@Author_MaheshNivruttiSutar @Zephyr-IO-T37529 @Zephyr-IO-T37526 @Zephyr-IO-T37528 @Zephyr-IO-T37535 @Zephyr-IO-T37532 @Zephyr-IO-T37531', () => {
    test('@Epic-IO-80201 @Priority-P2 @Env-All @Zephyr-IO-T37529 @Zephyr-IO-T37526 @Zephyr-IO-T37528 @Zephyr-IO-T37535 @Zephyr-IO-T37532 @Zephyr-IO-T37531', async ({io, page }) => {
        await io.myAccountPage.navigateTo(`${process.env.IOURL}?application=shopify`);
        await io.homePage.loadingTime();
        await page.waitForTimeout(20000);

        //IO-T37529 Verify that the Sign-in page UI of /launch/shopify page is displayed properly in different browsers.
        //IO-T37526 Verify Layout and UI Elements on /launch/shopify Page
        expect(await page.screenshot()).toMatchSnapshot("IO-T37526.png", { maxDiffPixelRatio: 0.2 });

        //IO-T37528 Verify that Placeholder Text is added for the Email and Password fields on /launch/shopify page.
        const email = await io.flowBuilder.isVisible("text='Email'");
        await io.assert.expectToBeTrue(email, "'Email' text is not displayed");

        const Password = await io.flowBuilder.isVisible("text='Password'");
        await io.assert.expectToBeTrue(Password, "'Password' text is not displayed");

        //IO-T37535 Verify the user is re-directed Forgot password page after clicking on the 'Forgot password?' link from /launch/shopify page.
        await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
        await io.flowBuilder.loadingTime();
        await io.assert.expectToContainValue(
            "/request-reset",
            page.url(),
            "User is not re-directing to forgot password page."
        );

        //IO-T37532 Verify the user is re-directed sign-up page after clicking on Sign up from /launch/shopify page.
        await io.myAccountPage.navigateTo(`${process.env.IOURL}?application=shopify`);
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
        await io.homePage.loadingTime();
        expect(page.url()).toContain("/signup");

        //IO-T37531 Verify error msg should display if the user tries to login with Unregistered Email/with invalid mail from /launch/shopify page.
        await io.myAccountPage.navigateTo(`${process.env.IOURL}?application=shopify`);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.loginPagePO.EMAIL,'test@celigo.com');
        await io.flowBuilder.fill(selectors.loginPagePO.PASSWORD,'test-C65455');
        await io.flowBuilder.click(selectors.basePagePO.SUBMIT);
        await io.homePage.loadingTime();
        await io.assert.verifyElementDisplayedByText("Sign in failed. Please try again.", "'Sign in failed. Please try again.' text is not displayed");
    });
});