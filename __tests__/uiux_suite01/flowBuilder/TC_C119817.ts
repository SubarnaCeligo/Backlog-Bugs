import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C119817 from '../../../testData/inputData/FlowBuilder/C119817.json';

test.describe("TC_C119817", () => {
  let id;
  test.afterEach(async ({ io, page }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("TC_C119817", async ({ io, page }) => {
    id = await io.createResourceFromAPI(C119817, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.reloadPage();
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.integrationPage.waitForElementAttached(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
    );
    await io.flowBuilder.click(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "TC_C119817"
    );
    //Open the flow
    await io.flowBuilder.clickByText("TC_C119817");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);


    //Export
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
    //clicking on launch from builder
    await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
    await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
    await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(C119817.customSetting));
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.CUSTOM_ERROR, 'The·"displayAfter"·and·"useAsPrimaryInterface"·properties·are·incompatible·with·each·other.·To·proceed·further,·remove·one·of·the·properties.¶');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.myAccountPage.delay(2000);
    // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
    const toggleSimple1 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleSimple1, "Simple toggle is not visible");
    const toggleHttp1 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleHttp1, "Http toggle is not hidden");
    // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
    await io.assert.expectToBeFalse(await (await page.locator(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB)).isVisible(), "What would you like to export? is not hidden");
    //-'Custom settings' should be renamed to 'Settings'.
    const Text = await io.homePage.isVisible("text='Settings'");
    await io.assert.expectToBeTrue(Text, "Settings name not shown");

    // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
    // -'Custom settings' section should be displayed below 'General' section.
    await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
    await io.myAccountPage.delay(2000);
    expect(await page.screenshot()).toMatchSnapshot("TC_C119817 export.png");
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

    //-'Launch form builder' button should be displayed in 'Settings' section
    const buttonDis = await page.$(selectors.flowBuilderPagePO.SETTING);
    expect(await buttonDis.screenshot()).toMatchSnapshot("TC_C119817 export launchFormBuilder.png");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    //Lookup
    await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
    //clicking on launch from builder
    await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
    await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
    await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(C119817.customSetting));
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.CUSTOM_ERROR, 'The·"displayAfter"·and·"useAsPrimaryInterface"·properties·are·incompatible·with·each·other.·To·proceed·further,·remove·one·of·the·properties.¶');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.myAccountPage.delay(2000);

    // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
    const toggleSimple2 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleSimple2, "Simple toggle is not visible");
    const toggleHttp2 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleHttp2, "Http toggle is not hidden");
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
    await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
    await io.myAccountPage.delay(2000);
    expect(await page.screenshot()).toMatchSnapshot("TC_C119817 LOOKUP.png");
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.myAccountPage.delay(2000);
    //-'Launch form builder' button should be displayed in 'Settings' section
    const buttonDis1 = await page.$(selectors.flowBuilderPagePO.SETTING);
    expect(await buttonDis1.screenshot()).toMatchSnapshot("TC_C119817_Lookup_launchFormBuilder.png");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    //IMPORT
    await io.flowBuilder.click(selectors.importPagePO.CLICKIMPORT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
    //clicking on launch from builder
    await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
    await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
    await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(C119817.customSetting));
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.CUSTOM_ERROR, 'The·"displayAfter"·and·"useAsPrimaryInterface"·properties·are·incompatible·with·each·other.·To·proceed·further,·remove·one·of·the·properties.¶');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.myAccountPage.delay(2000);
    // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
    const toggleSimple = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleSimple, "Simple toggle is not visible");
    const toggleHttp = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleHttp, "Http toggle is not hidden");
    // -Other sections 'How would you like the records imported?' or any other should be hidden
    const wouldLikeImp = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EXISTINGRECORDSIMPORT);
    await io.assert.expectToBeFalse(wouldLikeImp, "How would you like the records imported? is not hidden");
    //-'Custom settings' should be renamed to 'Settings'.
    const Text2 = await io.homePage.isVisible("text='Settings'");
    await io.assert.expectToBeTrue(Text2, "Settings name not shown");

    // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
    // -'Custom settings' section should be displayed below 'General' section.
    await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
    await io.myAccountPage.delay(2000);
    const Symbol1 = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
    expect(await Symbol1.screenshot()).toMatchSnapshot("TC_C119817 import.png");
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.myAccountPage.delay(2000);
    //-'Launch form builder' button should be displayed in 'Settings' section
    const buttonDis2 = await page.$(selectors.flowBuilderPagePO.SETTING);
    expect(await buttonDis2.screenshot()).toMatchSnapshot("TC_C119817 import launchFormBuilder.png");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
  });
});