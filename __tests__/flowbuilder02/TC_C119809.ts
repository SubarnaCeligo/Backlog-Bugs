import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C119809 from '../../testData/inputData/FlowBuilder/C119809.json';
import T27332 from '../../testData/inputData/FlowBuilder/IO-T27332.json';

test.describe("TC_C119809_C119810_C119811", () => {
    let id; let id1;
    test.describe.configure({ retries: 1 })
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(id);
        await io.api.deleteFlowViaAPI(id1);
    });
    test("@Priority-P2  @Zephyr-T24239 @Zephyr-T24240 @Zephyr-T24241 @Env-All", async ({ io, page }) => {
        id = await io.createResourceFromAPI(C119809, "FLOWS");
        // await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        // await io.flowBuilder.reloadPage();
        // await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        // await io.flowBuilder.loadingTime();
        // await io.integrationPage.waitForElementAttached(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
        // );
        // await io.flowBuilder.click(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        // await io.integrationPage.fill(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
        //     "TC_C119809"
        // );
        // await io.flowBuilder.loadingTime();
        // //Open the flow
        // await io.flowBuilder.clickByText("TC_C119809");


        //Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(C119809.jsonText));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.flowBuilder.click(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119809_EXPORT-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        //Lookup
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(C119809.jsonText));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.flowBuilder.click(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119809_LOOKUP-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        //IMPORT
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(C119809.jsonText));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXISTINGRECORDSIMPORT);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119809_IMPORT-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    });
    test("@Epic-IO-63762  @Priority-P2  @Zephyr-T27332 @Env-All", async ({ io, page }) => {
        id1 = await io.createResourceFromAPI(T27332, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        // await io.flowBuilder.reloadPage();
        // await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        // await io.flowBuilder.loadingTime();
        // await io.integrationPage.waitForElementAttached(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
        // );
        // await io.flowBuilder.click(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        // await io.integrationPage.fill(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
        //     "IO-T27332"
        // );
        // await io.flowBuilder.loadingTime();
        // //Open the flow
        // await io.flowBuilder.clickByText("IO-T27332");
        // await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);

        //Export
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.EXPORT, 0);
        await io.homePage.loadingTime();
        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
        const toggleSimple = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleSimple, "Simple toggle is not visible");
        const toggleHttp = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleHttp, "Http toggle is not hidden");
        // -Other sections 'How would you like to parse files?' or 'What would you like to export' or any other should be hidden
        const wouldParse = await io.flowBuilder.isVisible(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.assert.expectToBeFalse(wouldParse, "What would you like to export? is not hidden");
        const wouldTrn2 = await io.flowBuilder.isVisible(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE);
        await io.assert.expectToBeFalse(wouldTrn2, "Configure export type is not hidden");
        const sortGrpoup = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD);
        await io.assert.expectToBeFalse(sortGrpoup, "Would you like to group records? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("IO-T27332-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis.screenshot()).toMatchSnapshot("IO-T27332 launchFormBuilder-chromium-linux.png", { maxDiffPixelRatio: 0.2 });

        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("IO-T27332 error-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        //IMPORT
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.IMPORT, 0);
        await io.homePage.loadingTime();
        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
        const toggleSimple2 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleSimple2, "Simple toggle is not visible");
        const toggleHttp2 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleHttp2, "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        const fileTransf = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EXISTINGRECORDSIMPORT);
        await io.assert.expectToBeFalse(fileTransf, "How would you like the records imported? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text2 = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text2, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.homePage.loadingTime();
        const Symbol1 = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
        expect(await Symbol1.screenshot()).toMatchSnapshot("IO-T27332 import-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis2 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis2.screenshot()).toMatchSnapshot("IO-T27332 import launchFormBuilder-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    });
});