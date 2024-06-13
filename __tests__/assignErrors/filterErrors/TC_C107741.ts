import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C107741 from '@testData/Flows/C107741.json';
test.describe("TC_C107741 Verify Blue dot on Filter icon displayed after selecting tag", () => {
    test("@Zephyr-T24128 @Env-QA @Priority-P2 TC_C107741 Verify Blue dot on Filter icon displayed after selecting tag", async ({ io, page }) => {
        await io.createResourceFromAPI(C107741, "FLOWS");
        await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await page.waitForTimeout(70000);
        await io.homePage.addStep("*** Open the error drawer ***")
        await io.flowBuilder.clickByTextByIndex('2 errors', 2, { exact: false });
        await io.flowBuilder.clickByText('Open errors');

        await io.homePage.addStep("*** Creating and assigning 'Tag@1' tag to first error ***")
        const selectErrorCheckboxes = await page.locator(selectors.flowBuilderPagePO.SELECT_ERROR_CHECKBOX);
        await selectErrorCheckboxes.nth(0).click();
        await io.flowBuilder.clickByIndex(selectors.em2DotOLineGraphPO.TAG_ERRORS, 0);
        await io.flowBuilder.fill(selectors.em2DotOLineGraphPO.CREATE_NEW_TAG_INPUT, 'Tag@1');
        await io.flowBuilder.click(selectors.em2DotOLineGraphPO.CREATE_NEW_TAG);
        await io.flowBuilder.clickByText('Apply')

        await io.homePage.addStep("*** Creating and assigning 'Tag@2' tag to second error ***")
        await selectErrorCheckboxes.nth(0).click();
        await selectErrorCheckboxes.nth(1).click();
        await io.flowBuilder.clickByIndex(selectors.em2DotOLineGraphPO.TAG_ERRORS, 0);
        await io.flowBuilder.fill(selectors.em2DotOLineGraphPO.CREATE_NEW_TAG_INPUT, 'Tag@2');
        await io.flowBuilder.click(selectors.em2DotOLineGraphPO.CREATE_NEW_TAG);
        await io.flowBuilder.clickByText('Apply')
    
        await io.homePage.addStep("*** Filtering error by 'Tag@2' ***")
        await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);
        const firstSpan = await page.locator(selectors.filterErrorTag.FILTER_BY_TAG2);
        await firstSpan.click();
        await io.flowBuilder.clickByText('Apply')

        await io.homePage.addStep("*** Verifying blue dot on Filter icon ***");
        await io.flowBuilder.waitForElementAttached(selectors.filterErrorTag.ARIALABELFILTERERROR);
        const Symbol = await page.$(selectors.filterErrorTag.ARIALABELFILTERERROR);
        expect(await Symbol.screenshot()).toMatchSnapshot("C107141.png",  {maxDiffPixelRatio: 0.5 });

        await io.homePage.addStep("*** Delete Tags ***");
        await selectErrorCheckboxes.nth(0).click();
        await io.flowBuilder.clickByIndex(selectors.em2DotOLineGraphPO.TAG_ERRORS, 0);
        let button = await page.locator(selectors.filterErrorTag.DELETE_TAG2);
        await button.hover();
        await button.click();
        await io.flowBuilder.clickByText('Delete');

        await io.flowBuilder.clickByIndex(selectors.em2DotOLineGraphPO.TAG_ERRORS, 0);
        button = await page.locator(selectors.filterErrorTag.DELETE_TAG1);
        await button.hover();
        await button.click();
        await io.flowBuilder.clickByText('Delete');
    });
});