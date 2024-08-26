import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/FlowBuilder/T33600.json';

test.describe("@Author_MaheshNivruttiSutar Verify Save button gets disabled when user updates the form values in assistant form and toggle to http for the created resource", () => {
    let id;
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(id);
    });
    test("@BUG-IO-84235 @Priority-P2 @Env-All @Zephyr-IO-T33600", async ({ io, page }) => {
        id = await io.createResourceFromAPI(TC, "FLOWS");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.homePage.clickByText('Blocklist');
        await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.homePage.clickByText('List blocklist items');
        await io.connectionPage.click(selectors.basePagePO.HTTP_2DOT0);
        await io.flowBuilder.loadingTime();
        await io.assert.expectToBeTrue(await (await page.$(selectors.basePagePO.SAVE_AND_CLOSE)).isEnabled(), "Save&Close button is not enabled");
        await io.assert.expectToBeTrue(await (await page.$(selectors.basePagePO.SAVE)).isEnabled(), "Save button is not enabled");
        //Navigating to simple view
        await io.connectionPage.click(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.flowBuilder.loadingTime();
        await io.assert.expectToBeTrue(await (await page.$(selectors.basePagePO.SAVE_AND_CLOSE)).isEnabled(), "Save&Close button is not enabled");
        await io.assert.expectToBeTrue(await (await page.$(selectors.basePagePO.SAVE)).isEnabled(), "Save button is not enabled");
    });
});