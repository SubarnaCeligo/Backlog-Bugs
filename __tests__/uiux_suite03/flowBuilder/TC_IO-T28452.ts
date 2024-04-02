import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import DateTime from '@testData/Exports/T28495.json'
import C1465 from '@testData/email_validations/C1465.json'

test.describe("IO-T28495 ", () => {
    test.beforeEach(async ({ io }) => {
        await io.flowBuilder.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-QA @Zephyr-IO-T28495", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C1465, "FLOWS");

        await page.pause();
await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR)
await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
await io.flowBuilder.click(selectors.flowBuilderPagePO.RULES1);
await io.flowBuilder.fill(selectors.flowBuilderPagePO.GENERATE_RULES,"abc");
await page.keyboard.press('Backspace');
await page.keyboard.press('Backspace');
await page.keyboard.press('Backspace');
await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EXPORT_BUBBLE,"Element not displayed");

    });
});