import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C93992 from '@testData/Flows/C93992.json';

test.describe("TC_T25361 Verify And/OR toggle by default color is the same as the color when the user writing the first rule", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T25361 @Zephyr-IO-T25361 @Env-All @Priority-P2 T25361 Verify And/OR toggle by default color is the same as the color when the user writing the first rule UI_Backlog", async ({ io, page }) => {
        await io.createResourceFromAPI(C93992, "FLOWS");
        await io.flowBuilder.addStep('Waiting for add data processor icon and clicking it');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,1);
        await io.flowBuilder.addStep('Clicking on input filter');
        await io.flowBuilder.click(selectors.basePagePO.INPUTFILTER);
        await io.flowBuilder.loadingTime();

        const andBackgroundColor1 = await page
        .locator('.btn.btn-xs.btn-primary')
        .first()
        .evaluate(el => {
          return getComputedStyle(el).backgroundColor;
        });

        const orBackgroundColor1 = await page
        .locator('.btn.btn-xs.btn-primary')
        .nth(1)
        .evaluate(el => {
          return getComputedStyle(el).backgroundColor;
        });

        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.RULE_VALUE, 'CreateUser.json', 0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_RESULT_LINES);

        let andBackgroundColor2 = await page
        .locator('.btn.btn-xs.btn-primary')
        .first()
        .evaluate(el => {
          return getComputedStyle(el).backgroundColor;
        });

        let orBackgroundColor2 = await page
        .locator('.btn.btn-xs.btn-primary')
        .nth(1)
        .evaluate(el => {
          return getComputedStyle(el).backgroundColor;
        });

        expect(andBackgroundColor1).toBe(andBackgroundColor2);
        expect(orBackgroundColor1).toBe(orBackgroundColor2);
    });
});