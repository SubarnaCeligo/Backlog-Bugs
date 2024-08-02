import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T25388 Verify UX changes when we don't have any integration selected with custom role", () => {

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T25388  Verify UX changes when we don't have any integration selected with custom role", async ({
    io, page
  }) => {
    await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
    await io.homePage.loadingTime();
    await io.myAccountPage.click(selectors.myAccountPagePO.INVITE_USER_BUTTON);
    await io.myAccountPage.waitForElementAttached(
        selectors.myAccountPagePO.INVITE_USER_EMAIL
      );
      await io.myAccountPage.fill(
        selectors.myAccountPagePO.INVITE_USER_EMAIL,
        "qaautomation1+emailcheck@celigo.com"
      );
      await io.myAccountPage.click(selectors.integrationPagePO.CUSTOM);
      await io.myAccountPage.click(selectors.basePagePO.INVITEUSER2);
      const errorMessage = (
        await io.homePage.getText(selectors.basePagePO.INTEGRATIONSTOMONITOR)
      ).toString();
      await io.assert.expectToContainValue(
        errorMessage,
        "None selected",
        "error"
      );
      
      const errorMessage2 = (
        await io.homePage.getText(selectors.basePagePO.MANAGEINTEGRATION)
      ).toString();
      await io.assert.expectToContainValue(
        errorMessage,
        "None selected",
        "error"
      );
      const value1 = (
        await io.homePage.getText(selectors.myAccountPagePO.MONITOR_ACCESS)
      ).toString();
      await io.assert.expectToContainValue(
        value1,
        "A value must be provided",
        "error"
      );
      const value2 = (
        await io.homePage.getText(selectors.myAccountPagePO.MANAGE_ACCESS)
      ).toString();
      await io.assert.expectToContainValue(
        value2,
        "A value must be provided",
        "error"
      );
  });
});
