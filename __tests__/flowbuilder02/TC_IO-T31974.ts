import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/FlowBuilder/T31974.json';

test.describe("@Author_MaheshNivruttiSutar Verify section should be hidden if we set 'useAsPrimaryInterface' is Set to True in Script", () => {
    let id; let formInit;
    test.describe.configure({ retries: 1 })
    test.beforeEach(async ({ io, page }) => {
        formInit = await io.api.createScriptViaAPI(TC.script1);
    });
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(id);
        await io.api.deleteScriptViaAPI(formInit);
    });
    test("@Bug-IO-80699 @Env-All @Priority-P2 @Zephyr-IO-T31974", async ({ io, page }) => {
        TC.pageGenerators[0].qa__export.settingsForm.init._scriptId = formInit;
        id = await io.createResourceFromAPI(TC, "FLOWS");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();

        //Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_STUB);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_STUB);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_STUB);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_STUB, (TC.script.content));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
        const toggleSimple = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleSimple, "Simple toggle is not visible");
        const toggleHttp = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleHttp, "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        const exportType = await io.flowBuilder.isVisible(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE);
        await io.assert.expectToBeFalse(exportType, "Configure export type is not hidden");
        const wouldLike = await io.flowBuilder.isVisible(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.assert.expectToBeFalse(wouldLike, "What would you like to export? is not hidden");
        const apiPage = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.PAGE);
        await io.assert.expectToBeFalse(apiPage, "Does this API use paging? is not hidden");
        const apiResp = await io.flowBuilder.isVisible(selectors.exportsPagePO.NON_STANDARD_API_TAB);
        await io.assert.expectToBeFalse(apiResp, "Non-standard API response patterns is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("IO-T31974-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis.screenshot()).toMatchSnapshot("IO-T31974_1-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    });
});