import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("TC_IOT12568 Test to update the subscription and see EDI text on subscriptions for the user is not changed", () => {
  test("C103921 @Zephyr-IO-T12568 @Env-All  Test to update the subscription and see EDI text on subscriptions for the user is not changed", async ({
    io,
    page
  }) => {

    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    const payloadFormat = {
      ...getLicensePayload(platformLicense),
      tier: 'enterprise',
      expires: "2044-04-10T13:14:33.363Z",
      apiManagement: true
    };

    await io.api.putCall(`v1/test/licenses/${platformLicense._id}`, {
      ...payloadFormat,
      numEndpoints: 6
    });
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SUBSCRIPTION);  
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState();
    await io.homePage.loadingTime();
    const ediTextElement = page.locator("text=EDI").isVisible();
    expect(ediTextElement).toBeTruthy();

    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      getLicensePayload(platformLicense)
    );
  });
});
