import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../../testData/inputData/FlowBuilder/C119812.json';

test.describe("TC_C119812_C119813_C119814", () => {
    let id;
    test("TC_C119812_C119813", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        id = await io.connMap.get("ZENDESK CONNECTION");
        TC.export._connectionId = id;
        TC.lookup._connectionId = id;
        await io.api.postCall(`v1/exports`, TC.export);
        await io.api.postCall(`v1/exports`, TC.lookup);
        await io.flowBuilder.reloadPage();
        await io.homePage.goToMenu("Resources", "Exports");
        await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "TC_C119812 Zendesk Export");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
        await io.flowBuilder.click(selectors.integrationPagePO.CLONE_FLOW_INTABLE);

        //Clone Export
        await io.flowBuilder.click(selectors.basePagePO.CLONE_BTN);
        await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
        await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
        await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
        await io.homePage.clickByTextByIndex("ZENDESK CONNECTION", 1)
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SEARCH);
        await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "Clone - TC_C119812 Zendesk Export");
        await io.flowBuilder.clickByText("Clone - TC_C119812 Zendesk Export");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DATATEST);

        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH)).isVisible(), "Simple toggle is visible");
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
        await io.myAccountPage.delay(2000);
        expect(await page.screenshot()).toMatchSnapshot("TC_C119812 Export.png");
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis.screenshot()).toMatchSnapshot("TC_C119812 launchFormBuilder.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        await io.flowBuilder.reloadPage();
        //Lookup
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SEARCH);
        await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "TC_C119812 Zendesk Lookup");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
        await io.flowBuilder.click(selectors.integrationPagePO.CLONE_FLOW_INTABLE);

        //Clone lookup
        await io.flowBuilder.click(selectors.basePagePO.CLONE_BTN);
        await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
        await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
        await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
        await io.homePage.clickByTextByIndex("ZENDESK CONNECTION", 1)
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SEARCH);
        await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "Clone - TC_C119812 Zendesk Lookup");
        await io.flowBuilder.clickByText("Clone - TC_C119812 Zendesk Lookup");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DATATEST);

        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
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
        await io.myAccountPage.delay(2000);
        expect(await page.screenshot()).toMatchSnapshot("TC_C119813 Lookup.png");
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);


        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis1 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis1.screenshot()).toMatchSnapshot("TC_C119812 launchFormBuilder.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    });
    test("TC_C119814", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        id = await io.connMap.get("NETSUITE CONNECTION");
        TC.import._connectionId = id;
        await io.api.postCall(`v1/imports`, TC.import);
        await io.flowBuilder.reloadPage();
        await io.homePage.goToMenu("Resources", "Imports");
        await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "TC_C119812 Netsuite import");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
        await io.flowBuilder.click(selectors.integrationPagePO.CLONE_FLOW_INTABLE);

        //Clone import
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_IMPORT);
        await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
        await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
        await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
        await io.homePage.clickByTextByIndex("NETSUITE CONNECTION", 1)
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "Clone - TC_C119812 Netsuite import");
        await io.flowBuilder.clickByText("Clone - TC_C119812 Netsuite import");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.DATATEST);

        //Import
        await io.myAccountPage.delay(2000);
        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH)).isVisible(), "Simple toggle is visible");
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)).isVisible(), "Http toggle is not hidden");
        // -Other sections 'How would you like the records imported?' or any other should be hidden
        await io.assert.expectToBeFalse(await (await page.locator(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB)).isVisible(), "How would you like the records imported? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text2 = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text2, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.myAccountPage.delay(3000);
        const Symbol = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
        expect(await Symbol.screenshot()).toMatchSnapshot("TC_C119814_IMPORT_UX.png");
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis2 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis2.screenshot()).toMatchSnapshot("TC_C119814_launchFormBuilder.png");
    });
});