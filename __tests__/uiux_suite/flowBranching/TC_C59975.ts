import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C55975 from '../../../testData/Flows/C59975.json';

test.describe("C59975 Verify User is able to see the script under flow dashboard for flow branching", () => {
    test("C59975 Verify User is able to see the script under flow dashboard for flow branching", async ({io, page}) => {
        await io.fillFormUI(C55975, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        // await page.locator('[data-test="addDataProcessor"]').nth(1).click();
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1)
        await io.flowBuilder.click('[data-test="pageProcessorHooks"]');
        await io.flowBuilder.fill('[name="script-preMap"]', 'test premap');
        // await page.locator('[data-test="scriptId"]').nth(0).click();
        await io.flowBuilder.clickByIndex('[data-test="scriptId"]', 0)
        await page.getByRole('menuitem').nth(1).click();
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click('[data-test="scripts"]');
        const scriptList = await page.locator('#tabpanel-3 tbody tr').all();
        expect(scriptList.length).toBe(1);
    });
  });