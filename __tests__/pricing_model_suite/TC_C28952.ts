import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("C28952 Verify the audit log retention, ßconcurrency for expired license account.", () => {
  test("C28952 @Zephyr-IO-T28952  @Env-All @Priority-P2 Verify the audit log retention, concurrency for expired license account.", async ({
    io,
    page
  }) => {
    await io.homePage.reloadPage();
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    const payloadFormat = {
      ...getLicensePayload(platformLicense),
      expires: "2044-04-10T13:14:33.363Z",
      apiManagement: true
    };
    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {...getLicensePayload(platformLicense), sandbox: false, "apiManagement": true, "expires": "2044-04-10T13:14:33.363Z"}
    );

    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.homePage.loadingTime();
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SUBSCRIPTION);    
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState("load", { timeout: 90000 });

    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.SUBSCRIPTION, "Audit log retention");
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.SUBSCRIPTION, "Connection concurrency limit");
    await io.myAccountPage.click(selectors.myAccountPagePO.AUDIT_LOG);
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.AUDIT_LOG, "More options available - Upgrade your account for longer audit log periods.");
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.SUBSCRIPTION, "Your subscription has expired. Request to renew now");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, payloadFormat);
  });
});
