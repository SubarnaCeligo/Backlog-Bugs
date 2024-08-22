import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C111495_C111496_C111497_C111498_C111499_C111500_C111501_C111502", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T13763 @Zephyr-IO-T13764  @Zephyr-IO-T13765 @Zephyr-IO-T13766 @Zephyr-IO-T13767 @Zephyr-IO-T13768 @Zephyr-IO-T13769 @Zephyr-IO-T13770  TC_C111495_C111496_C111497_C111498_C111499_C111500_C111501_C111502", async ({
    io,
    page
  }) => {
    let companyName = selectors.loginPagePO.COMPANY;

    await io.myAccountPage.click(selectors.myAccountPagePO.PROFILE);
    await io.homePage.fill(companyName, "13131");

    await io.assert.verifyElementDisplayedByText(
      "Please enter your company name.",
      "Company name is should not accept only numbers"
    );

    await io.homePage.fill(companyName, " ");
    await io.assert.verifyElementDisplayedByText(
      "Please enter your company name.",
      "Company name is should not accept single spaces"
    );

    await io.homePage.fill(companyName, "     ");
    await io.assert.verifyElementDisplayedByText(
      "Please enter your company name.",
      "Company name is should not accept multiple spaces"
    );

    await io.homePage.fill(companyName, "     ");
    await io.assert.verifyElementDisplayedByText(
      "Please enter your company name.",
      "Company name is should not accept multiple spaces"
    );

    await io.homePage.fill(companyName, "✅");
    await io.assert.verifyElementDisplayedByText(
      "Please enter your company name.",
      "Company name is should not accept emoji"
    );

    await io.homePage.fill(companyName, "$%&$%&");
    await io.assert.verifyElementDisplayedByText(
      "Please enter your company name.",
      "Company name is should not accept special characters"
    );

    await io.assert.verifyElementDisplayedByText(
      "Company *",
      "Company name is should be have mandatory symbol *"
    );

    await io.homePage.fill(companyName, "a$ap");
    await io.myAccountPage.click(selectors.basePagePO.MFA_SAVE);
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.MFA_SAVE,
      "a$ap Company should be saved but failed"
    );

    await io.homePage.fill(companyName, "CDEWASCCCcfccccccc");
    await io.myAccountPage.click(selectors.basePagePO.MFA_SAVE);
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.MFA_SAVE,
      "CDEWASCCCcfccccccc Company should be saved but failed"
    );

    await io.homePage.fill(companyName, "celigo");
    await io.myAccountPage.click(selectors.basePagePO.MFA_SAVE);
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.MFA_SAVE,
      "reset company name to celigo"
    );
  });
});
