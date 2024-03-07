import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../../testData/inputData/FlowBuilder/C119805.json';

test.describe("TC_C119805", () => {
    let intId; let flowId;
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteIntegration(intId);
    });
    test("TC_C119805", async ({ io, page }) => {
        intId = await io.api.createIntegrationThruAPI(TC);
        TC.qa__api_tdata[0].createFlow._integrationId = intId;
        var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC, true);
        flowId = flows.get(TC.name)["flowId"];
        console.log("Flowgrouping flow id", flowId);
        await io.integrationPage.navigateToIntegrationById(intId);
        await io.flowgrouping.createFlowGroups("TC_C119805 FlowGroup", [flowId]);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SETTINGS);
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        // let selector = await page.$$(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT).nth(0)
        // const selector = await page.$$(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT)[0];
        // await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT,1);
        // await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        // await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, 1);
        // await page.keyboard.down('Meta');

        await io.flowBuilder.clearTextValue('[id="data"]>textarea');
        await page.keyboard.press("Meta+A");
        await io.integrationPage.delay(4000);
        await page.keyboard.press('Backspace');
        // let locator = await page.$$('[id="data"] > textarea');
        // let sele = await locator[1].cl
        // await page.keyboard.down('Meta');
        // await page.keyboard.press('A');
        // await page.keyboard.up('Meta');
        // await page.keyboard.press('Backspace');
        await io.flowBuilder.fill('[id="data"]>textarea', JSON.stringify(TC.CustomJson));
        // await io.flowBuilder.fill(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.CustomJson));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.click(selectors.templatePagePO.flows);
        await io.flowBuilder.clickByText("TC_C119805");

        //Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        const simpleToggle = await (await page.$(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH)).isHidden();
        await io.assert.expectToBeTrue(simpleToggle, "Simple toggle is not hidden");
        const httpToggle = await (await page.$(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)).isHidden();
        await io.assert.expectToBeTrue(httpToggle, "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        const confExportType = await (await page.$(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE)).isHidden();
        await io.assert.expectToBeTrue(confExportType, "Configure export type is not hidden");
        const whatWouldULiketoExport = await (await page.$(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB)).isHidden();
        await io.assert.expectToBeTrue(whatWouldULiketoExport, "What would you like to export? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text, "Settings name not shown");
        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis.screenshot()).toMatchSnapshot("launchFormBuilder.png");
        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        const pageLayout = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await pageLayout.screenshot()).toMatchSnapshot("launchFormBuilder.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        //Lookup
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        const simpleToggle1 = await (await page.$(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH)).isHidden();
        await io.assert.expectToBeTrue(simpleToggle1, "Simple toggle is not hidden");
        const httpToggle1 = await (await page.$(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)).isHidden();
        await io.assert.expectToBeTrue(httpToggle1, "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        const confExportType1 = await (await page.$(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE)).isHidden();
        await io.assert.expectToBeTrue(confExportType1, "Configure export type is not hidden");
        const whatWouldULiketoExport1 = await (await page.$(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB)).isHidden();
        await io.assert.expectToBeTrue(whatWouldULiketoExport1, "What would you like to export? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text1 = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text1, "Settings name not shown");
        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis1 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis1.screenshot()).toMatchSnapshot("launchFormBuilder1.png");
        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        const pageLayout1 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await pageLayout1.screenshot()).toMatchSnapshot("launchFormBuilder.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        //IMPORT
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);

        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        const simpleToggle2 = await (await page.$(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH)).isHidden();
        await io.assert.expectToBeTrue(simpleToggle2, "Simple toggle is not hidden");
        const httpToggle2 = await (await page.$(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)).isHidden();
        await io.assert.expectToBeTrue(httpToggle2, "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        const confExportType2 = await (await page.$(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE)).isHidden();
        await io.assert.expectToBeTrue(confExportType2, "Configure export type is not hidden");
        const whatWouldULiketoExport2 = await (await page.$(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB)).isHidden();
        await io.assert.expectToBeTrue(whatWouldULiketoExport2, "What would you like to export? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text2 = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text2, "Settings name not shown");
        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis2 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis2.screenshot()).toMatchSnapshot("launchFormBuilder.png");
        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        const pageLayout2 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await pageLayout2.screenshot()).toMatchSnapshot("launchFormBuilder.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);




    });
});