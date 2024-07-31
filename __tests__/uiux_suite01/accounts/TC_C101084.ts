import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe('C101084 To verify that the user will get error message when user provides the same email in change email operation', () => {

    test("@Env-All @Zephyr-IO-T24831 C101084 To verify that the user will get error message when user provides the same email in change email operation", async ({
        io,
        page
      }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.myAccountPage.click(selectors.basePagePO.EDIT_EMAIL_BUTTON)
        await io.myAccountPage.waitForElementAttached(selectors.basePagePO.NEW_EMAIL)
        await io.myAccountPage.fill(selectors.basePagePO.NEW_EMAIL, process.env.IO_UserName)
        await io.myAccountPage.waitForElementAttached(selectors.basePagePO.NEW_PASSWORD)
        await io.myAccountPage.fill( selectors.basePagePO.NEW_PASSWORD, 'Celigo@123');
        await io.flowBuilder.loadingTime();
        await io.myAccountPage.waitForElementAttached(selectors.basePagePO.CHANGE_EMAIL)
        await io.myAccountPage.click(selectors.basePagePO.CHANGE_EMAIL);
        await io.flowBuilder.loadingTime();
        await io.myAccountPage.waitForElementAttached(selectors.basePagePO.NOTIFICTION_BAR)
        await io.assert.verifyElementContainsText('#notification', "Another user already exists with the provided email address.");
        await io.myAccountPage.click(selectors.flowBuilderPagePO.CLOSEPOPUP);
      });
});