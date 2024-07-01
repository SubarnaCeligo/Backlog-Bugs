import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/monitorSuite/C93715.json";
import testData from "@testData/monitorSuite/monitor_all.json";


test.describe('C93709 Validate user is able to create "formInit" script through flow builder page (Monitor)', () => {
    test('@Env-All C93709 Validate user is able to create "formInit" script through flow builder page (Monitor)', async ({ io, page }) => {
        const res = await io.api.putCall(
            `v1/ashares/${process.env.IO_Ashare_ID}`,
            testData
            );
            await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
            await io.homePage.loadingTime()
            await io.flowBuilder.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
            await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "C68510_DND");
            await io.homePage.loadingTime()
            await io.flowBuilder.clickByText('C68510_DND');
            await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
            await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
            await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK);
            await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
            await io.assert.verifyElementAttributeContainsText(`${selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR} button`, 'class', 'Mui-disabled');
    });
});