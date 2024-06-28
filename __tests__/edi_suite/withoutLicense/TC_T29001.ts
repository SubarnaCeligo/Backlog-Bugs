import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import payload from "@testData/edi_suite/LicenseUpdate.json"

test.describe("@Author-Shriti S Verify that users without EDI license cannot access EDI Dashboard.", () => {
  test.beforeEach(async ({ io }) => {
    //get licensce ID
    let licenses = await io.api.getCall('v1/licenses');
    let licenseID = licenses[0]._id;
    let type = licenses[0].type;

    // Update license
    let endPoint = 'v1/test/licenses/' + licenseID;
    payload.edi = false;
    payload.type = type;
    await io.api.putCall(endPoint, payload);
  });
  test("@Epic-IO-31713 @Env-All @Priority-P2 @Zephyr-IO-T29001 Verify that users without EDI license cannot access EDI Dashboard.", async ({ io, page }) => {

    // //Go to Dashboard
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is not visible
    let isDashboardVisible = await io.homePage.isVisible(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.assert.expectToBeFalse(isDashboardVisible, 'Dashboard is visible for users without license.');


    //FA Section should be hidden
    //Go to Homepage
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();

    //search for the integration
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "EDI_FA_DND");
    await io.homePage.clickByTextByIndex('EDI_FA_DND', 0);

    await io.homePage.loadingTime();

    await io.integrationPage.clickByTextByIndex('EDIFA_FTP_TO_FTP_DND', 0);

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);

    let isFASectionVisible = await io.exportsPage.isVisible(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT);
    await io.assert.expectToBeFalse(isFASectionVisible, 'FA section is visible when EDI license is disabled.');

  });

  test.afterEach(async ({ io }) => {
    //get licensce ID
    let licenses = await io.api.getCall('v1/licenses');
    let licenseID = licenses[0]._id;
    let type = licenses[0].type;

    // Update license
    let endPoint = 'v1/test/licenses/' + licenseID;
    payload.edi = true;
    payload.type = type;
    await io.api.putCall(endPoint, payload);
  });
});