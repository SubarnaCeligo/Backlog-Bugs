import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C98708 from '@testData/FlowDebugger/C98708.json';

test.describe("@Author-Yashveer C98708 Verify screen should not be unresponsive when clicked on erros from integration page", () => {
    test("@Zephyr-IO-T1126 @Env-All C98708 Verify screen should not be unresponsive when clicked on erros from integration page", async ({ io, page }) => {
        await io.createResourceFromAPI(C98708, "FLOWS");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
        await io.homePage.click(selectors.basePagePO.RUNFLOW);
        await io.homePage.addStep("*** Running the flow ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.BUCKETNAME} input`, 'randomString');
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.click(selectors.basePagePO.RUNFLOW);
        await io.homePage.addStep("*** Running the flow ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
        //Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.SEARCH, "TC_C98708");
        await io.myAccountPage.delay(1000);
        await io.homePage.waitForElementAttached('tbody tr');
        await io.flowBuilder.clickButtonByIndex("tbody tr button", 1);
        await io.assert.verifyElementDisplayedByText(
            "Flow: TC_C98708",
            "Application type page did not load"
          );
    });
});