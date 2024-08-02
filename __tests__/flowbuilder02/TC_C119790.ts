import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C119790 from '../../testData/inputData/FlowBuilder/C119790.json';
import TC from '../../testData/inputData/FlowBuilder/C119805.json';

test.describe("T24220_T24222_T24224", () => {
    let id; let id1; let id2;
    test.describe.configure({ retries: 1 })
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(id);
        await io.api.deleteFlowViaAPI(id1);
        await io.api.deleteFlowViaAPI(id2);
    });
    test("@Epic-IO-63762  @Priority-P2  @Zephyr-T24220 @Env-All ", async ({ io, page }) => {
        id = await io.createResourceFromAPI(C119790, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        //Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.CustomJson));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
        const toggleSimple = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleSimple, "Simple toggle is not visible");
        const toggleHttp = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleHttp, "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        const exportType = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(exportType, "Configure export type is not hidden");
        const wouldLike = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(wouldLike, "What would you like to export? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("Export_UX-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis.screenshot()).toMatchSnapshot("launchFormBuilder-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    });
    test("@Epic-IO-63762  @Priority-P2  @Zephyr-T24222 @Env-All ", async ({ io, page }) => {
        id1 = await io.createResourceFromAPI(C119790, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        //Lookup
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.LOOKUP);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.CustomJson));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.myAccountPage.delay(2000);
        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
        const toggleSimple = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleSimple, "Simple toggle is not visible");
        const toggleHttp = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleHttp, "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        const exportType = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(exportType, "Configure export type is not hidden");
        const wouldLike = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(wouldLike, "What would you like to export? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text1 = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text1, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("LOOKUP_UX-chromium-linux.png");
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis1 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis1.screenshot()).toMatchSnapshot("launchFormBuilder1-chromium-linux.png");
    });
    test("@Epic-IO-63762  @Priority-P2  @Zephyr-T24224 @Env-All ", async ({ io, page }) => {
        id2 = await io.createResourceFromAPI(C119790, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);

        //IMPORT
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.CustomJson));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.myAccountPage.delay(2000);
        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
        const toggleSimple = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleSimple, "Simple toggle is not visible");
        const toggleHttp = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleHttp, "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        const exportType = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(exportType, "Configure export type is not hidden");
        const wouldLike = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(wouldLike, "What would you like to export? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text2 = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text2, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("IMPORT_UX-chromium-linux.png");
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis2 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis2.screenshot()).toMatchSnapshot("launchFormBuilder2-chromium-linux.png");
    });
});