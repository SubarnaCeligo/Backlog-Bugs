import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27104_In the Date range window of the Run report drawer, we should not be able to set start time that is older than 30 days from current date and time", () => {
    test("@Zephyr-IO-T4370 @Priority-P2 @Env-All C27104_In the Date range window of the Run report drawer, we should not be able to set start time that is older than 30 days from current date and time UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Reports");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.clickByText('Choose integration');
        const intID = await io.api.loadIntegrations();
        await io.flowBuilder.selectTextfromDropDown(page, intID.get('Automation Flows'))
        await io.homePage.fill(selectors.dashboardPagePO.REPORT_FLOWS, 'TC_C12034_Flow_DND')
       
        var flowId = await io.api.getFlowId("TC_C12034_Flow_DND");
        var flowIdlocator;
        flowIdlocator = "[data-test="+ "'"+flowId +"'"+"]"; //as the data-test is dynamic so unable to create data-test via selector class
        await io.homePage.click(flowIdlocator);

        await io.homePage.clickByText('Done');
        await io.homePage.clickByText("Choose date range");
        // Validating not able to select older than 30 days 
        await expect(await page.locator(selectors.dashboardPagePO.REPORT_FLOWS)).not.toHaveCSS("30 days", "Date range");
    });
});
