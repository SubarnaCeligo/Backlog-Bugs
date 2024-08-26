import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C113932 from '../../testData/inputData/FlowDebugger/C113932.json';


test.describe(" @Zephyr-IO-T2477 C98688  Save and close button should be disabled until data is added in mock response canonical format", () => {
    let flowId;
    test("@Env-All @Zephyr-IO-T2477 C98688 Save and close button should be disabled until data is added in mock response canonical format", async ({ io, page }) => {
       
    flowId = await io.createResourceFromAPI(C113932, "FLOWS");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT,0);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MOCKRESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCKRESPONSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCKRES1);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await io.importsPage.fill(selectors.importPagePO.INPUT_MOCK_RESPONSE_XPATH, '{}');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await expect(page.getByText("Mock response must be in integrator.io canonical format.")).toBeVisible();

    });

});
