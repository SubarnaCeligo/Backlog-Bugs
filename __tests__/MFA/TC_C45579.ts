import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C45579 Verify if the message is shown correctly when the user is marked as MFA required.", () => {
  test("@Env-All C45579 @Zephyr-IO-T17219 Verify if the message is shown correctly when the user is marked as MFA required.", async ({io, page}) => {
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.loadingTime()
      await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
      await io.myAccountPage.waitForElementAttached(selectors.flowBuilderPagePO.COLUMNS);
      await io.flowBuilder.clickByIndex(selectors.myAccountPagePO.USER_MFA_TOGGLE, 1);
      await io.myAccountPage.loadingTime()
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ID, 'Success notification did not appear');
      await io.myAccountPage.loadingTime()
      await io.flowBuilder.clickByIndex(selectors.myAccountPagePO.USER_MFA_TOGGLE, 1);
  });
});