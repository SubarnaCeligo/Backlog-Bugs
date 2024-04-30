import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C45579 Verify if the message is shown correctly when the user is marked as MFA required.", () => {
  test("@Env-All C45579 Verify if the message is shown correctly when the user is marked as MFA required.", async ({io, page}) => {
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
      await io.myAccountPage.waitForElementAttached(selectors.flowBuilderPagePO.COLUMNS);
      const firstUser = await page.locator(selectors.flowBuilderPagePO.COLUMNS).nth(1);
      await firstUser.locator(selectors.myAccountPagePO.MFA_TOGGLE).nth(1).click();
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ID, 'Success notification did not appear');
      await firstUser.locator(selectors.myAccountPagePO.MFA_TOGGLE).nth(1).click();
  });
});