import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C94646 from '@testData/FlowDebugger/C94646.json';

test.describe("C94646_C94645", () => {
  test("@Env-All @Zephyr-IO-T14136 @Zephyr-IO-T14135 C94646_C94645", async ({ io, page }) => {
    await io.createResourceFromAPI(C94646, "FLOWS");
    //Disable the flow
    await io.homePage.loadingTime()
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    // await io.flowBuilder.reloadPage();
    await io.homePage.loadingTime();
    // await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    // await io.flowBuilder.reloadPage();
    // await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    // await io.flowBuilder.reloadPage();
    // await io.homePage.loadingTime()
    // await io.flowBuilder.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    // await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C94646');
    // await io.flowBuilder.clickByTextByIndex('TC_C94646', 0);
    // await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    await page.getByText("Completed").nth(1).waitFor({ state: "visible", timeout:360000 });
    let testRunRunningLonger = await io.flowBuilder.isVisible(selectors.basePagePO.CLOSE_BUTTON);
    if (testRunRunningLonger){
        await io.flowBuilder.click(selectors.basePagePO.CLOSE_BUTTON);
    }
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.POSTGREAFEEDITOR);
    //TC_C94646 Test run result should show if we have AFE1.0. is selected
    //TC_C94645 Verify Empty state message when AFE2.0 is selected but 2.0 template has no content and there are no result to show
    await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.homePage.addStep('Clicking on AFE 2.0');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EMPTY_STATE_MESSAGE);
    const msg = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.EMPTY_STATE_MESSAGE)).toString();
    const masg = JSON.stringify(msg);
    await io.assert.expectToContainValue("\"No results to show since AFE 2.0 was not used in the last test run. Switch to AFE 1.0 to see test run results.\"", masg, "Empty state msg not found");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.homePage.addStep('Clicking on AFE 1.0');
    await io.homePage.addStep('Verified Test run result should show if we have AFE1.0. is selected');
    
  });
});