import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C98698 from '@testData/FlowDebugger/C98698.json';

test.describe("C98698 Verify on toggling from test result to rules result panel is empty", () => {
    test("@Env-All @Zephyr-IO-T2483 C98698 Verify on toggling from test result to rules result panel is empty", async ({ io, page }) => {
        await io.createResourceFromAPI(C98698, "FLOWS");
        //Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await page.getByText("Completed").nth(1).waitFor({ state: "visible", timeout:360000 });
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.assert.verifyElementContainsText(selectors.basePagePO.RESULT_PREVIEW_CONTENT, "{  \"value\": \"81\"}")
        await io.flowBuilder.click(selectors.importPagePO.SWITCH_TO_MAPPING);
        await io.assert.verifyElementContainsText(selectors.basePagePO.RESULT_PREVIEW_CONTENT, "");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.assert.verifyElementContainsText(selectors.basePagePO.RESULT_PREVIEW_CONTENT, "{  \"value\": \"81\"}")
    });
});