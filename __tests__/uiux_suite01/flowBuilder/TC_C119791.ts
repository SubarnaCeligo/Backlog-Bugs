import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C119791 from '../../../testData/inputData/FlowBuilder/C119791.json';
import TC from '../../../testData/inputData/FlowBuilder/C119805.json';

test.describe("TC_C119791_C119793_C119795", () => {
    test("C119791_C119793_C119795", async ({ io, page }) => {
        await io.createResourceFromAPI(C119791, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.flowBuilder.reloadPage();
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.integrationPage.waitForElementAttached(
            selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
        );
        await io.flowBuilder.click(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(
            selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
            "TC_C119791"
        );
        //Open the flow
        await io.flowBuilder.clickByText("TC_C119791");
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
        await io.myAccountPage.delay(2000);
        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH)).isVisible(), "Simple toggle is not visible");
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)).isVisible(), "Http toggle is not hidden");
        // -Other sections 'How would you like to parse files?' or 'What would you like to export' or any other should be hidden
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.HOW_WOULD_PARSE)).isVisible(), "How would you like to parse files? is not hidden");
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.WHERE_WOULD_TRANSFER)).isVisible(), "Where would you like to transfer from? is not hidden");
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.SORTANDGROUP)).isVisible(), "How would you like to group and sort records? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.myAccountPage.delay(2000);
        expect(await page.screenshot()).toMatchSnapshot("TC_C119791.png");
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis.screenshot()).toMatchSnapshot("TC_C119791 launchFormBuilder.png");
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
        await io.myAccountPage.delay(2000);
        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH)).isVisible(), "Simple toggle is not visible");
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)).isVisible(), "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.WHERE_WOULD_TRANSFER)).isVisible(), "Where would you like to transfer from? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text1 = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text1, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.myAccountPage.delay(2000);
        const Symbol = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
        expect(await Symbol.screenshot()).toMatchSnapshot("TC_C119795.png");
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis1 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis1.screenshot()).toMatchSnapshot("TC_C119795 launchFormBuilder.png");
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
        await io.myAccountPage.delay(2000);
        // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH)).isVisible(), "Simple toggle is not visible");
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)).isVisible(), "Http toggle is not hidden");
        // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
        await io.assert.expectToBeFalse(await (await page.locator(selectors.importPagePO.FILES_TRANSFERED)).isVisible(), "Where would you like the files transferred? is not hidden");
        await io.assert.expectToBeFalse(await (await page.locator(selectors.flowBuilderPagePO.HOW_WOULD_GENE_FILE)).isVisible(), "How would you like to generate files? is not hidden");
        //-'Custom settings' should be renamed to 'Settings'.
        const Text2 = await io.homePage.isVisible("text='Settings'");
        await io.assert.expectToBeTrue(Text2, "Settings name not shown");

        // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
        // -'Custom settings' section should be displayed below 'General' section.
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.myAccountPage.delay(2000);
        const Symbol1 = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
        expect(await Symbol1.screenshot()).toMatchSnapshot("TC_C119793.png");
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

        //-'Launch form builder' button should be displayed in 'Settings' section
        const buttonDis2 = await page.$(selectors.flowBuilderPagePO.SETTING);
        expect(await buttonDis2.screenshot()).toMatchSnapshot("TC_C119793 launchFormBuilder.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    });
});