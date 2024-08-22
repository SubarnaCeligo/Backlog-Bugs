import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import payload from "@testData/edi_suite/LicenseUpdate.json"

test.describe("@Author-Shriti S Verify that platform users are able to view EDI activity dashboard.", () => {
  test.beforeEach(async ({ io }) => {
    //get licensce ID
    let licenses = await io.api.getCall('v1/licenses');
    let licenseID = licenses[0]._id;

    // Update license to platform
    let endPoint = 'v1/test/licenses/' + licenseID;
    payload.edi = true;
    payload.type = "platform";
    await io.api.putCall(endPoint, payload);
  });
  test("@Epic-IO-83533 @Env-All @Priority-P2 @Zephyr-IO-T34238 Verify that platform users are able to view EDI activity dashboard.", async ({ io, page }) => {

    // //Go to Dashboard
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    let isDashboardVisible = await io.homePage.isVisible(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.assert.expectToBeTrue(isDashboardVisible, 'Dashboard is visible for users with platform license.');


  });

  test.afterEach(async ({ io }) => {
    //get licensce ID
    let licenses = await io.api.getCall('v1/licenses');
    let licenseID = licenses[0]._id;

    // Update license to endpoint
    let endPoint = 'v1/test/licenses/' + licenseID;
    payload.edi = true;
    payload.type = "endpoint";
    await io.api.putCall(endPoint, payload);
  });
});