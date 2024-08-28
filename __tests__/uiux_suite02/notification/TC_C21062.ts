import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C21062 Verify updating invalid email value in the url when opened 'manage notification' on user tab in an integration", () => {
  test("@Env-All @Zephyr-IO-T286 C21062 Verify updating invalid email value in the url when opened 'manage notification' on user tab in an integration", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.USERS);
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.NOTIFICATIONS_TAB);
    await io.homePage.clickByIndex(selectors.integrationPagePO.NOTIFICATIONS_TAB, 0);
    const notificationURL = page.url();
    let notificationURLArray = notificationURL.split('/');
    notificationURLArray[notificationURLArray.length - 1] = 'invalid@email.com';
    const invalidNotificationURL = notificationURLArray.join('/');
    await page.goto(invalidNotificationURL);
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.USERS, 'Users tab not loaded and invalid email url did not work as expected');
    await io.assert.verifyElementDisplayedByText('Invite user', 'Ivite user button not displayed and invalid email url did not work as expected');
  });
});