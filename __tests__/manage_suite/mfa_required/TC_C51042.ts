import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./mfa.json";



test.describe(`C51042 Verify if the help link on the left side is redirected to MFA article in the help center when the MFA setup is incomplete.`, () => {
  test(`@Env-All @Zephyr-IO-T19649 C51042 Verify if the help link on the left side is redirected to MFA article in the help center when the MFA setup is incomplete.`, async ({
    page,
    io
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.myAccountPage.clickByTextByIndex("Security", 0);
    await io.myAccountPage.click(selectors.myAccountPagePO.HELP_TEXT);
    const expectedUrl = "https://docs.celigo.com/hc/en-us/articles/";
    const anchor = await page.locator('a:has-text("Learn more")').nth(0);
    const hrefAttribute = await anchor.getAttribute('href');
    const validate = hrefAttribute.toString().includes(expectedUrl);
    await io.assert.expectToBeTrue(validate, "link doesn,t match");
  });
});










