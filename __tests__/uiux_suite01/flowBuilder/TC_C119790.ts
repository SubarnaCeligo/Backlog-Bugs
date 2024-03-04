import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C119790 from '../../../testData/inputData/FlowBuilder/C119790.json';
import TC from '../../../testData/inputData/FlowBuilder/C119805.json';

test.describe("TC_C119790_C119792_C119794", () => {
    test("C119790", async ({ io, page }) => {
        await io.createResourceFromAPI(C119790, "FLOWS");
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
        await io.myAccountPage.delay(2000);
        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH)).isVisible(), "Simple toggle is not visible");
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)).isVisible(), "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        await io.assert.expectToBeFalse(await (await page.locator(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE)).isVisible(), "Configure export type is not hidden");
        await io.assert.expectToBeFalse(await (await page.locator(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB)).isVisible(), "What would you like to export? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.myAccountPage.delay(4000);
        expect(await page.screenshot()).toMatchSnapshot("Export_UX.png");
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis.screenshot()).toMatchSnapshot("launchFormBuilder.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    });
    test("C119792", async ({ io, page }) => {
        await io.createResourceFromAPI(C119790, "FLOWS");
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
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH)).isVisible(), "Simple toggle is visible");
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)).isVisible(), "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        await io.assert.expectToBeFalse(await (await page.locator(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE)).isVisible(), "Configure export type is not hidden");
        await io.assert.expectToBeFalse(await (await page.locator(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB)).isVisible(), "What would you like to export? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text1 = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text1, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.myAccountPage.delay(4000);
        expect(await page.screenshot()).toMatchSnapshot("LOOKUP_UX.png");
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis1 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis1.screenshot()).toMatchSnapshot("launchFormBuilder1.png");
    });
    test("C119794", async ({ io, page }) => {
        await io.createResourceFromAPI(C119790, "FLOWS");
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
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH)).isVisible(), "Simple toggle is visible");
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)).isVisible(), "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        await io.assert.expectToBeFalse(await (await page.locator(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE)).isVisible(), "Configure export type is not hidden");
        await io.assert.expectToBeFalse(await (await page.locator(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB)).isVisible(), "What would you like to export? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text2 = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text2, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.myAccountPage.delay(4000);
        expect(await page.screenshot()).toMatchSnapshot("IMPORT_UX.png");
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis2 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis2.screenshot()).toMatchSnapshot("launchFormBuilder2.png");
    });
});