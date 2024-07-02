import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C119791 from '../../testData/inputData/FlowBuilder/C119791.json';
import TC from '../../testData/inputData/FlowBuilder/C119805.json';

test.describe("TC_C119791_C119793_C119795", () => {
    let id;
    test.describe.configure({ retries: 1 })
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(id);
    });
    test("@Epic-IO-63762  @Priority-P2  @Zephyr-T24221 @Zephyr-T24223 @Zephyr-T24225 @Env-All", async ({ io, page }) => {
        id = await io.createResourceFromAPI(C119791, "FLOWS");
        // await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        // await io.flowBuilder.reloadPage();
        // await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        // await io.integrationPage.waitForElementAttached(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
        // );
        // await io.flowBuilder.click(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        // await io.integrationPage.fill(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
        //     "TC_C119791"
        // );
        // //Open the flow
        // await io.flowBuilder.clickByText("TC_C119791");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);

        //TC_C119791 Verify user is able to add 'useAsPrimaryInterface' value under custom form displayed under Custom Settings of Export created with settting 'Transfer files out of source application'
        //Transfer
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);
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
        // -Other sections 'How would you like to parse files?' or 'What would you like to export' or any other should be hidden
        const wouldParse = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.HOW_WOULD_PARSE);
        await io.assert.expectToBeFalse(wouldParse, "How would you like to parse files? is not hidden");
        const wouldTrn2 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.WHERE_WOULD_TRANSFER);
        await io.assert.expectToBeFalse(wouldTrn2, "Where would you like to transfer from? is not hidden");
        const sortGrpoup = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SORTANDGROUP);
        await io.assert.expectToBeFalse(sortGrpoup, "How would you like to group and sort records? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119791-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis.screenshot()).toMatchSnapshot("TC_C119791 launchFormBuilder-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);


        //Lookup
        //TC_C119795 Verify user is able to add 'useAsPrimaryInterface' value under custom form displayed under Custom Settings of Lookup created with setting 'Lookup additional files (per record)'
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
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
        const toggleSimple1 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleSimple1, "Simple toggle is not visible");
        const toggleHttp1 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleHttp1, "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        const wouldTrn = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.WHERE_WOULD_TRANSFER);
        await io.assert.expectToBeFalse(wouldTrn, "Where would you like to transfer from? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text1 = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text1, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.homePage.loadingTime();
        const Symbol = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
        expect(await Symbol.screenshot()).toMatchSnapshot("TC_C119795-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis1 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis1.screenshot()).toMatchSnapshot("TC_C119795 launchFormBuilder-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);


        //IMPORT
        //TC_C119793 Verify user is able to add 'useAsPrimaryInterface' value under custom form displayed under Custom Settings of Import created with 'Transfer files into destination application'
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 2);
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
        const toggleSimple2 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleSimple2, "Simple toggle is not visible");
        const toggleHttp2 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        await io.assert.expectToBeFalse(toggleHttp2, "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        const fileTransf = await io.flowBuilder.isVisible(selectors.importPagePO.FILES_TRANSFERED);
        await io.assert.expectToBeFalse(fileTransf, "Where would you like the files transferred? is not hidden");
        const genFile = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.HOW_WOULD_GENE_FILE);
        await io.assert.expectToBeFalse(genFile, "How would you like to generate files? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text2 = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text2, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.homePage.loadingTime();
        const Symbol1 = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
        expect(await Symbol1.screenshot()).toMatchSnapshot("TC_C119793-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis2 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis2.screenshot()).toMatchSnapshot("TC_C119793 launchFormBuilder-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    });
});