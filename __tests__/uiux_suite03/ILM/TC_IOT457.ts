import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import payload from "@testData/edi_suite/LicenseUpdate.json"

test.describe("TC_IOT457 To verify environment is not displayed along with cloned integration when user doesnt have sandbox account access", () => {
  test.beforeEach(async ({ io }) => {
    //get licensce ID
    let licenses = await io.api.getCall('v1/licenses');
    let licenseID = licenses[0]._id;
    let type = licenses[0].type;

    // Update license
    let endPoint = 'v1/test/licenses/' + licenseID;
    payload.sandbox = false;
    payload.type = type;
    await io.api.putCall(endPoint, payload);
  });
  test("@Env-All @Zephyr-IO-T457 C41576 To verify environment is not displayed along with cloned integration when user doesnt have sandbox account access", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.addStep("*** Navigated to home Page Url ***")
    await io.homePage.reloadPage();
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.homePage.addStep("*** Waiting for home page Search Bar ***")
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_IOT457_DND');
    await io.homePage.addStep("*** Searching for TC_IOT457_DND ***")
    await io.flowBuilder.clickByTextByIndex("TC_IOT457_DND",0);
    await io.homePage.addStep("*** Clicked on Integration TC_IOT457_DND ***")
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.homePage.addStep("*** Clicked on Clone Integration Button ***")
    const isEnviormentRadioButtonPresent = await page.locator('text="Environment"').isVisible();
    const isSandBoxEnviormentOption = await page.locator('text="Sandbox"').isVisible();
    expect(isEnviormentRadioButtonPresent).toBeFalsy();
    await io.homePage.addStep("*** Checking Environment selection not present ***")
    expect(isSandBoxEnviormentOption).toBeFalsy();
    await io.homePage.addStep("*** Checking Sandbox not present  ***")
    
  });

  test.afterEach(async ({ io }) => {
    //get licensce ID
    let licenses = await io.api.getCall('v1/licenses');
    let licenseID = licenses[0]._id;
    let type = licenses[0].type;

    // Update license
    let endPoint = 'v1/test/licenses/' + licenseID;

    payload.sandbox = true;
    payload.type = type;
    await io.api.putCall(endPoint, payload);
  });
});