import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import JS from '../../testData/inputData/FlowBuilder/C117949.json';

test.describe("TC_C117949", () => {
    test("TC_C117949 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SETTINGS);
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(JS.text));
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.LAUNCH_EDITOR);
        //Account Type
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_TYPE);
        await io.homePage.clickByTextByIndex("Customer - Channel", 1);
        //Customer stage
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CUSTOMER_STAGE);
        await io.homePage.clickByTextByIndex("CUSTOMER", 1);
        //Customer status
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CUSTOMER_STATUS);
        await io.homePage.clickByTextByIndex("Closed Lost", 1);
        await io.flowBuilder.click(selectors.basePagePO.MFA_SAVE);
        await io.assert.checkElementState(selectors.basePagePO.MFA_SAVE,"isEditable");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FIELD);
        await io.flowBuilder.click(selectors.basePagePO.MFA_SAVE);
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.CUSTOM_EDITOR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CUSTOM_EDITOR);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.CUSTOM_EDITOR);
        await io.flowBuilder.click(selectors.basePagePO.MFA_SAVE);
    });
});