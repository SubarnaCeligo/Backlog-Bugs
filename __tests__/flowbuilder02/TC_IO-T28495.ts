import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import DateTime from '@testData/Exports/T28495.json'
import C20688 from '@testData/email_validations/C20688.json'

test.describe("FlowBuilder custom settings launch builder", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Priority-P2 @Zephyr-IO-T28495", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C20688, "FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(DateTime));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.DATE_CUSTOMSETTINGS,"Element not visible");
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TIME_CUSTOMSETTINGS,"Element not visible");  

          
});
});