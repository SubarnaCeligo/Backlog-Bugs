import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C67232 from "@testData/Flows/C67232.json"

test.describe("C67232 Verify Red errored window is not displayed on 'Rule' section when there is an error on Script side of Transformation filter", () => {
    test("C67232 Verify Red errored window is not displayed on 'Rule' section when there is an error on Script side of Transformation filter", async ({io, page}) => {
        await io.fillFormUI(C67232, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
        await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_LIST_DROPDOWN_ID);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.flowBuilder.waitForElementAttached(selectors.mappings.Mapper2dot0PO.ERROR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RULES1);
        await io.assert.verifyElementIsDisplayed(selectors.mappings.Mapper2dot0PO.ERROR, 'Error box not present when switched tab to rule');
    });
  });