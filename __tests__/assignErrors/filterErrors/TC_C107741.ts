import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C107741 from '@testData/Flows/C107741.json';

test.describe("TC_C107741 Verify Blue dot on Filter icon displayed after selecting tag", () => {
    test.describe.configure({ retries: 2 })

    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime()
    });

    test("@Zephyr-T24128 @Env-All @Priority-P2 TC_C107741 Verify Blue dot on Filter icon displayed after selecting tag", async ({ io, page }) => {
        await io.createResourceFromAPI(C107741, "FLOWS");
        await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.homePage.loadingTime();

        await io.homePage.addStep("*** Refresh page and open the error drawer ***")
        await io.homePage.reloadPage();
        await io.homePage.loadingTime();
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
        await io.flowBuilder.waitForElementAttached(selectors.filterErrorTag.ARIALABELFILTERERROR);

        await io.homePage.addStep("*** Verifying blue dot on Filter icon ***");
        await io.flowBuilder.waitForElementAttached(selectors.filterErrorTag.ARIALABELFILTERERROR);
        const Symbol = await page.$(selectors.filterErrorTag.ARIALABELFILTERERROR);
        expect(await Symbol.screenshot()).toMatchSnapshot("C107141.png",  {maxDiffPixelRatio: 0.8 });
    });
});