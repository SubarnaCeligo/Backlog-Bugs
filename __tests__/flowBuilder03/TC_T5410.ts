import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/FlowBuilder/TC_T5410.json';

test.describe("T5410 Verify Preview, save and close buttons on AFE2.0", () => {
    let flowId;
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowViaAPI(flowId);
    });
    test("@Env-All @Priority-P2 @Zephyr-IO-T5410 C23856 Verify Preview, Save and Close buttons on AFE2.0", async ({ io, page }) => {
        flowId = await io.createResourceFromAPI(TC, "FLOWS");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
        await page.keyboard.press('Enter');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_LOOKUP);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
        await io.homePage.clickByTextByIndex('FTP CONNECTION', 0);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DIRECTORYHANLEBAR);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RULE_ACE_EDITOR_INPUT, '{{{connection.name}}}');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_RESULT_LINES, "FTP");
        const saveButton = await page.locator(selectors.basePagePO.SAVE).nth(1);
        await saveButton.click();
        await io.flowBuilder.loadingTime();
        expect(saveButton).toBeDisabled();
        await page.locator(selectors.basePagePO.CLOSE).nth(1).click();
        await io.flowBuilder.loadingTime();
        expect(await page.locator(selectors.exportsPagePO.FTP_DIRECTORY_PATH).inputValue()).toContain("{{{connection.name}}}");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DIRECTORYHANLEBAR);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RULE_ACE_EDITOR_INPUT, '');
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Meta+A');
        await page.keyboard.press('Backspace');
        await io.flowBuilder.clickByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
        expect(await page.locator(selectors.exportsPagePO.FTP_DIRECTORY_PATH).inputValue()).toContain("");
    });
});