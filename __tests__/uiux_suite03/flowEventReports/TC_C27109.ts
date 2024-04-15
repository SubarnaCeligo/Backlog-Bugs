import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27109 Run Report drawer - ‘Child integrations’ cannot be a required field", () => {
  test("@Zephyr- IO-T4374 (1.0) @Env-All C27109 Run Report drawer - ‘Child integrations’ cannot be a required field UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Tools", "Reports");
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.clickByText('Choose integration');
    const intID = await io.api.loadIntegrations();
    await io.flowBuilder.selectTextfromDropDown(page, intID.get('Automation Flows'))
    await io.homePage.fill(selectors.dashboardPagePO.REPORT_FLOWS, 'TC_C12034_DND')
    var flowId = await io.api.getFlowId("TC_C12034_Flow_DND");
    console.log(flowId);
    
    var flowIdlocator;
    flowIdlocator = "[data-test="+ "'"+flowId +"'"+"]";
    console.log(flowIdlocator)
    await io.homePage.click(flowIdlocator);
    await io.homePage.clickByText('Done');
    await io.homePage.clickByText("Choose date range");
    await io.homePage.clickByText("Last minute");
    await io.homePage.clickByText("Apply");
    // Validating child integration not available and without chlid able to run
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SAVE,'Run report not clickable')
  });
});