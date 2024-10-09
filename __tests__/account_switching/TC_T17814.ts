import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("@Author-Shriti S Verify audit logs when user switches from account 'A' to account 'B'.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Priority-P2 @Zephyr-IO-T38740 Verify audit logs when user switches from account 'A' to account 'B'.", async ({ io, page }) => {
        //Login with owner account
        await io.loginPage.waitForElementAttached(selectors.loginPagePO.EMAIL);
        await io.loginPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_OWNER_EMAIL"]);
        await io.loginPage.waitForElementAttached(selectors.loginPagePO.PASSWORD);
        await io.loginPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_OWNER_PASSWORD"]));
        await io.loginPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
        await io.homePage.loadingTime();

        //Click Profile
        await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
        await io.homePage.click(selectors.myAccountPagePO.AUDIT_LOG);
        await io.homePage.loadingTime();

        //Get audit log row1
        let row1 = (await io.homePage.getText(selectors.integrationPagePO.LICENSE_TABLE + ':nth-child(1)')).toString();

        //Get logged in username
        await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
        await io.homePage.click(selectors.myAccountPagePO.PROFILE);

        let loggenInUserNameLocator = await page.locator(selectors.flowBuilderPagePO.NAME);

        let loggenInUserNameOwner = await loggenInUserNameLocator.getAttribute('value');

        await io.assert.expectToContainValue(loggenInUserNameOwner, row1, '');
        await io.assert.expectToContainValue('Sign in', row1, '');
        await io.assert.expectToContainValue('IP address', row1, '');

        //Logout
        //Click Profile
        await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        await io.homePage.loadingTime();

        await io.myAccountPage.navigateTo(process.env["IOURL"]);
        await io.homePage.loadingTime();

        //Login with user account
        await io.loginPage.waitForElementAttached(selectors.loginPagePO.EMAIL);
        await io.loginPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_USER1_EMAIL"]);
        await io.loginPage.waitForElementAttached(selectors.loginPagePO.PASSWORD);
        await io.loginPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_USER1_PASSWORD"]));
        await io.loginPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
        await io.homePage.loadingTime();

         //Click Profile
         await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
         await io.homePage.click(selectors.myAccountPagePO.AUDIT_LOG);
         await io.homePage.loadingTime();

        //Get audit log row1 and row2
        row1 = (await io.homePage.getText(selectors.integrationPagePO.LICENSE_TABLE + ':nth-child(1)')).toString();
        let row2 = (await io.homePage.getText(selectors.integrationPagePO.LICENSE_TABLE + ':nth-child(2)')).toString();

         //Get logged in username
         await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
         await io.homePage.click(selectors.myAccountPagePO.PROFILE);
 
         let loggenInUserNameUser = await loggenInUserNameLocator.getAttribute('value');
         await io.homePage.loadingTime();
 
         await io.assert.expectToContainValue(loggenInUserNameUser, row1, '');
         await io.assert.expectToContainValue('Sign in', row1, '');
         await io.assert.expectToContainValue('IP address', row1, '');

         await io.assert.expectToContainValue(loggenInUserNameOwner, row2, '');
         await io.assert.expectToContainValue('Sign out', row2, '');
         await io.assert.expectToContainValue('IP address', row2, '');


    });
});