import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";
import payload from "@testData/edi_suite/LicenseUpdate.json";

test.describe("TC_IOT12568 Test to update the subscription and see EDI text on subscriptions for the user is not changed", () => {

  test("C103921 @Zephyr-IO-T12568 @Env-All  Test to update the subscription and see EDI text on subscriptions for the user is not changed", async ({
    io,
    page
  }) => {

    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SUBSCRIPTION);  
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState();
    await io.homePage.loadingTime();
    const ediTextElement = page.locator("text=EDI").isVisible();
    expect(ediTextElement).toBeTruthy();

    let licenses = await io.api.getCall("v1/licenses");
    let licenseID = licenses[0]._id;
    let type = licenses[0].type;

    // Update license
    let endPoint = "v1/test/licenses/" + licenseID;
    payload.type = type;
    payload.tier = "premium";
    await io.api.putCall(endPoint, payload);

    await page.reload();
    expect(ediTextElement).toBeTruthy();

  });
  test.afterEach(async ({ io }) => {
    //get licensce ID
    let licenses = await io.api.getCall('v1/licenses');
    let licenseID = licenses[0]._id;
    let type = licenses[0].type;

    // Update license
    let endPoint = 'v1/test/licenses/' + licenseID;
    payload.type = type;
    payload.tier = "enterprise";
    await io.api.putCall(endPoint, payload);
  });
});
