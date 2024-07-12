import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T19656 Verify the message displayed when MFA is enabled and disabled for the users.", () => {
  test("@Priority-P2 @Zephyr-IO-T19656 @Env-All Verify the message displayed when MFA is enabled and disabled for the users.", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
    await io.myAccountPage.waitForElementAttached(selectors.flowBuilderPagePO.COLUMNS);
    await io.flowBuilder.clickByIndex(selectors.myAccountPagePO.USER_MFA_TOGGLE, 1);
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ID, 'Success notification did not appear');
    await io.myAccountPage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.myAccountPagePO.USER_MFA_TOGGLE, 1);
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ID, 'Disable notification did not appear');
  });
});