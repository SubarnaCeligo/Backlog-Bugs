import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("T29046 Verify the flow entitlements for platform license for sandbox account.", () => {
  test("T29046 @Zephyr-IO-T29046  @Env-All,iaqa @Priority-P2 Verify the flow entitlements for platform license for sandbox account.", async ({
    io,
    page
  }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    const payloadFormat = {
      ...getLicensePayload(platformLicense),
      expires: "2044-04-10T13:14:33.363Z",
      apiManagement: true,
    };
    await io.homePage.addStep(
      "Updating license to standard tier and enabled sandbox."
    );
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
      ...payloadFormat,
      tier: "standard",
      sandbox: true,
      numSandboxEndpoints: 10,
      numSandboxFlows: 10,
    });

    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState("load", { timeout: 60000 });

    await io.homePage.addStep("Verifying Endpoints Entitlements.");
    await page.locator(selectors.connectionsPagePO.FIX_CONNECTION).nth(3).click();
    let url = await page.url();
    expect(url).toMatch(/\/sandbox\/endpoints$/);
    await io.myAccountPage.click(
      selectors.integrationPagePO.CLOSE_RIGHT_DRAWER_BUTTON
    );

    await io.homePage.addStep("Verifying Flow Entitlements.");
    await page.locator(selectors.connectionsPagePO.FIX_CONNECTION).nth(4).click();
    url = await page.url();
    expect(url).toMatch(/\/sandbox\/flows$/);
    await io.myAccountPage.click(
      selectors.integrationPagePO.CLOSE_RIGHT_DRAWER_BUTTON
    );

    await io.homePage.addStep("Reverting license changes.");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, payloadFormat);
  });
});
