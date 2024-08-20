import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C110731 from '../../testData/inputData/FlowDebugger/C110731.json';

test.describe("TC_C110731 Verify user should be able to run flow in Test mode after editing stub", () => {
    test("@Env-All @Zephyr-IO-T14152 TC_C110731 Verify user should be able to run flow in Test mode after editing stub", async ({io, page}) => {
        await io.createResourceFromAPI(C110731, "FLOWS");

        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
        await io.homePage.addStep('clicking on import');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
        await io.flowBuilder.doubleClick(selectors.flowBuilderPagePO.MOCK_OUTPUT_STUB);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.MOCK_OUTPUT_STUB);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.MOCK_OUTPUT_STUB, JSON.stringify(C110731.editedStub));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        const status = await page.$(selectors.flowBuilderPagePO.JOB_ERRORS);
        var statusText = await status.textContent();
        await io.assert.expectToContainValue(
            "Success",
            statusText,
            "Status not found"
          );
    });
});