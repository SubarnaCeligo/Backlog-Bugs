import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '@testData/FlowBuilder/T34772.json';

test.describe("@Author_MaheshNivruttiSutar Verify Save button is clickable if we update Custom setting multiple time", () => {
    test("@Bug-IO-82481 @Env-QA @Priority-P2 @Zephyr-IO-T34772", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(TC, "FLOWS");
        await io.homePage.loadingTime();

        //Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.CustomJson));
        await io.homePage.loadingTime();
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.SAVE,1);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.SAVE,1);
        await io.flowBuilder.loadingTime();
        await io.homePage.loadingTime();
        const status =  await io.assert.checkElementState(selectors.basePagePO.SAVE_AND_CLOSE,"isDisplayed");
        await io.assert.expectToBeFalse(status, 'Save&Close button is displayed');
    });
});