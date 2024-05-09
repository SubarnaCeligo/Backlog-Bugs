import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import ProfessionalLicense from "@testData/Flows/ProfessionalLicense.json";
import { MyAccountPage } from "@celigo/ui-core-automation/dist/src/pageFactory/pages/MyAccountPage";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C53063 Verify that the 30 and 60 days option is enable for license types Professional tire", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T14552 C53063 Verify that the 30 and 60 days option is enable for license types Professional tire", async ({
    io,
    page
  }) => {
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
      await io.loginPage.click(selectors.basePagePO.SUBMIT);
      await page.waitForTimeout(10000);
      let rateLimitErrorsVisibility = await page
        .locator('[id="error-icon"]~div')
        .isVisible();
      if (rateLimitErrorsVisibility) {
        let rateLimitErrors = await io.flowBuilder.getTextFromElement(
          '[id="error-icon"]~div'
        );
        let rateLimitErrorTime = await String(rateLimitErrors).match(/\d/g).join("");
        await io.flowBuilder.delay(1000 * Number(rateLimitErrorTime));
        await io.loginPage.click(selectors.basePagePO.SUBMIT);
        await io.flowBuilder.loadingTime();
      }
    }
    await io.homePage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.homePage.loadingTime();
    const licenses = await io.api.getCall("v1/licenses");
    let putcall = await io.api.putCall(
      `v1/test/licenses/${process.env["IO_Integration_ID"]}`,
      ProfessionalLicense
    );

    await io.myAccountPage.click(selectors.myAccountPagePO.DATA_RETENTION);
    await io.myAccountPage.click(selectors.myAccountPagePO.DATA_RETENTION_PERIOD);

    await io.assert.verifyElementIsDisplayed(
      selectors.myAccountPagePO.THIRTY_DAYS,
      "Element is not displayed properly"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.myAccountPagePO.SIXTY_DAYS,
      "Element is not displayed properly"
    );

    await io.assert.verifyElementAttributeContainsText(
      selectors.myAccountPagePO.NINETY_DAYS,
      "class",
      "Mui-disabled"
    );
    await io.assert.verifyElementAttributeContainsText(
      selectors.myAccountPagePO.ONEEIGHTY_DAYS,
      "class",
      "Mui-disabled"
    );

    await io.assert.verifyElementContainsText(
      selectors.myAccountPagePO.ONEEIGHTY_DAYS,
      "upgrade required"
    );
    await io.assert.verifyElementContainsText(
      selectors.myAccountPagePO.NINETY_DAYS,
      "upgrade required"
    );
  });
});
