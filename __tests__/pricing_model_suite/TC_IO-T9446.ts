import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("TC_IO-T9446 Verify that when a user is in free tier period all gated features/newly added fields should be in disable mode and the data retention must default to 30 days and Audit logs must default to 1 year.", () => {
  test("@Zephyr-IO-T9446 @Env-All  Verify that when a user is in free tier period all gated features/newly added fields should be in disable mode and the data retention must default to 30 days and Audit logs must default to 1 year.", async ({
    io,
    page
  }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    const payloadFormat = {
      ...getLicensePayload(platformLicense),
      expires: "2044-04-10T13:14:33.363Z",
      apiManagement: true,
      disableOverage: false
    };
    await io.api.putCall(`v1/test/licenses/${platformLicense._id}`, {
      ...payloadFormat,
      tier: "free"
    });
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(
      selectors.myAccountPagePO.SUBSCRIPTION
    );
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    const greyColor = "rgb(177, 198, 215)";

    const ediTextElement = page.locator("text=EDI");
    const ediTextColor = await ediTextElement.evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    expect(ediTextColor).toBe(greyColor);

    const sandBoxTextElement = page.locator("text=Sandbox");
    const sandBoxTextcolor = await sandBoxTextElement.evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    expect(sandBoxTextcolor).toBe(greyColor);

    const auditLogTextElement = page.locator("text=Audit log retention");
    const auditLogTextcolor = await auditLogTextElement.evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    expect(auditLogTextcolor).toBe("rgb(51, 61, 71)");

    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
      ...payloadFormat,
      tier: "enterprise"
    });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
