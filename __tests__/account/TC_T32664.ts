import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";
import { expect } from "@celigo/ui-core-automation";

test.describe("TC_T32664 when user email is changed from profile page, verify  Notification pop-up", async () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T32664 TC_T32664 Verify the notification pop-up for change email under profile", async ({
    io,
    page
  }, testInfo) => {
    let signInLink = await page.url();
    if (signInLink.endsWith("signin")) {
      await io.loginPage.fill(
        selectors.loginPagePO.EMAIL,
        "qaautomation1+emailcheck5@celigo.com"
      );
      await io.loginPage.fill(
        selectors.loginPagePO.PASSWORD,
        decrypt(process.env["IO_Password"])
      );
      await io.flowBuilder.delay(1000 * 60 * 2);
      await io.loginPage.click(selectors.basePagePO.SUBMIT);
      let rateLimitErrorsVisibility = await page
        .locator(selectors.importPagePO.RATE_LIMIT_ERRORS_MESSAGE)
        .isVisible();
      if (rateLimitErrorsVisibility) {
        let rateLimitErrors = await page
          .locator(selectors.importPagePO.RATE_LIMIT_ERRORS_MESSAGE)
          .textContent();
        let rateLimitErrorTime = String(rateLimitErrors).match(/\d/g).join("");
        await io.flowBuilder.delay(1000 * parseInt(rateLimitErrorTime));
        await io.loginPage.click(selectors.basePagePO.SUBMIT);
      }
      await io.homePage.loadingTime();
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.homePage.loadingTime();
      await io.myAccountPage.click(selectors.basePagePO.EDIT_EMAIL_BUTTON);
      // Click on edit email button
      await io.myAccountPage.waitForElementAttached(
        selectors.basePagePO.NEW_EMAIL
      );
      await io.myAccountPage.fill(
        selectors.basePagePO.NEW_EMAIL,
        "qaautomation1+emailcheck@celigo.com"
      );
      await io.myAccountPage.waitForElementAttached(
        selectors.basePagePO.NEW_PASSWORD
      );
      await io.myAccountPage.fill(
        selectors.basePagePO.NEW_PASSWORD,
        decrypt(process.env["IO_Password"])
      );
      await io.myAccountPage.waitForElementAttached(
        selectors.basePagePO.CHANGE_EMAIL
      );
    await io.myAccountPage.click(selectors.basePagePO.CHANGE_EMAIL);
    await test.step("T32664 Verify the notification pop-up for change email under profile", async () => {
      await io.assert.verifyElementContainsText('[id="notification"]', 'Validation link sent to your new email address. If you don’t receive a link, check your spam folder or try again.');
  }); 
  await io.flowBuilder.click('[data-test="snackbarclose-button"]');
  await io.myAccountPage.click(selectors.basePagePO.EDIT_EMAIL_BUTTON);
      // Click on edit email button
      await io.myAccountPage.waitForElementAttached(
        selectors.basePagePO.NEW_EMAIL
      );
      await io.myAccountPage.fill(
        selectors.basePagePO.NEW_EMAIL,
        "io.auto.edit.qa@celigo.com"
      );
      await io.myAccountPage.waitForElementAttached(
        selectors.basePagePO.NEW_PASSWORD
      );
      await io.myAccountPage.fill(
        selectors.basePagePO.NEW_PASSWORD,
        decrypt(process.env["IO_Password"])
      );
      await io.myAccountPage.waitForElementAttached(
        selectors.basePagePO.CHANGE_EMAIL
      );
    await io.myAccountPage.click(selectors.basePagePO.CHANGE_EMAIL);
    await test.step("T32664 Verify the error message for change email under profile", async () => {
      await io.assert.verifyElementContainsText('[id="notification"]', 'Another user already exists with the provided email address.');
  }); 
  await io.homePage.addStep("*** Clicked on 'X' button ***");
  await io.exportsPage.click(selectors.flowBuilderPagePO.CLOSEPOPUP);
  // Click on edit email button
  await io.myAccountPage.waitForElementAttached(
    selectors.basePagePO.NEW_EMAIL
  );
  await io.myAccountPage.fill(
    selectors.basePagePO.NEW_EMAIL,
    "io.auto.edit.qa@celigo.com"
  );
  await io.myAccountPage.waitForElementAttached(
    selectors.basePagePO.NEW_PASSWORD
  );
  await io.myAccountPage.fill(
    selectors.basePagePO.NEW_PASSWORD,
   "test1234"
  );
  await io.myAccountPage.waitForElementAttached(
    selectors.basePagePO.CHANGE_EMAIL
  );
await io.myAccountPage.click(selectors.basePagePO.CHANGE_EMAIL);
await test.step("T32664 Verify the error message for change email under profile", async () => {
  await io.assert.verifyElementContainsText('[id="notification"]', 'Current password failed to authenticate.  Please try again.');
}); 
}});
});
