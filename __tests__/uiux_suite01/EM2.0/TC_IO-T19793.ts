import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C50858 from "@testData/EM2.0/C24621.json"

test.describe("T19793 EM1.0 Verify the tooltip for the Actions icon", () => {
    let errorFlowId
    test.afterEach(async ({ io }) => {
       let status =  await io.api.deleteFlowsWithId(errorFlowId)
       console.log(status)
       
    });

    test("@Zephyr-IO-T19793 @Env-All T19793 Verify the tooltip for the Actions icon", async ({io, page}) => {
        errorFlowId = await io.createResourceFromAPI(C50858, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C50858', errorFlowId);
        await io.integrationPage.delay(2000); 
        await page.locator(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RESOLVE_AND_NEXT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB);
        await io.flowBuilder.clickByText('Refresh errors');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU);
        expect(await page.$(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU)).toBeDefined();
    });
});