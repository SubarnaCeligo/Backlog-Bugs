import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/FlowBuilder/TC_T37793.json";

test.describe("Verify the UI timeout for preview calls in exports and imports", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("@Zephyr-IO-T37793 @Zephyr-IO-T37794 @Zephyr-IO-T37795 @Zephyr-IO-T37796 @Zephyr-IO-T37797 @Zephyr-IO-T37798 @Zephyr-IO-T37799 @Env-All @Epic-IO-88804 @Priority-P2 - Verify the UI timeout for preview calls in exports and imports", async ({ io, page }) => {
    id = await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.NAME_ID);
    await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);

    await page.waitForTimeout(124000);

    const errorMsg = (await io.exportsPage.getText(selectors.flowBuilderPagePO.CONTENT)).toString();
    await io.assert.expectToContainValue('The preview failed after waiting two minutes without a response from the application.', errorMsg, "Error is not showing properly");

    await io.flowBuilder.click(selectors.basePagePO.CLOSE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.NAME_ID);

    await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);

    await page.waitForTimeout(124000);

    const errorMsg2 = (await io.exportsPage.getText(selectors.flowBuilderPagePO.CONTENT)).toString();
    await io.assert.expectToContainValue('The preview failed after waiting two minutes without a response from the application.', errorMsg2, "Error is not showing properly");
  });
});