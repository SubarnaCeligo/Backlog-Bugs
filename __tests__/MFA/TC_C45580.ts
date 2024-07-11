import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C45580 Verify if the error message is shown correctly when the user is marked as MFA required but is later disabled.", () => {
  test("@Env-All C45580 @Zephyr-IO-T17220 Verify if the error message is shown correctly when the user is marked as MFA required but is later disabled.", async ({io, page}) => {
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
      await io.myAccountPage.waitForElementAttached(selectors.flowBuilderPagePO.COLUMNS);
      await io.flowBuilder.clickByIndex(selectors.myAccountPagePO.USER_MFA_TOGGLE, 1);
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ID, 'Success notification did not appear');
      await io.flowBuilder.clickByIndex(selectors.myAccountPagePO.USER_MFA_TOGGLE, 1);
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ID, 'Disable notification did not appear');
  });
});