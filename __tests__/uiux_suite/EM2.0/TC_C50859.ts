import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C50859 from '@testData/Flows/C50859.json';

test.describe("C50859 Verify the displayed default page in 'Error Dashboard' when there is no error in the flow", () => {
    test("C50859 Verify the displayed default page in 'Error Dashboard' when there is no error in the flow", async ({io, page}) => {
        const id = await io.fillFormUI(C50859, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C50859', id);
        const lastRun = page.getByText('Last run');
        await lastRun.waitFor({state: 'visible', timeout: 180000});
        await io.flowBuilder.clickByTextByIndex("Success", 1);
        await io.flowBuilder.waitForElementAttached(`${selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB}.Mui-selected`);
        await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB, 'class', 'Mui-selected');
    });
  });