import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_C119815_C119816`, () => {
  test.describe.configure({ retries: 1 })
  test.afterEach(async ({ io, page }) => {
    await io.api.deleteIntegrationRecursively("TC_C119816_Delete");
    await io.api.deleteIntegrationRecursively("Clone - TC_C119816_Delete");
  });
  test(`@Epic-IO-63762  @Priority-P2  @Zephyr-T24245 @Zephyr-T24246 @Env-All`, async ({ page, io }) => {
    //TC_C119816 Verify on installing the integration user is able to see Export/Lookup/Import having 'useAsPrimaryInterface' set to true under custom form displayed under Custom Settings of Export/Lookup/Import
    await io.homePage.navigateTo(`${io.data.links.HOME_PAGE_URL}/installIntegration`);
    await io.homePage.addStep(
      "Navigated to install integration page (/home/installIntegration)"
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/Templates/TC_C119816_Delete.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io.homePage.clickByTextByIndex("S3 CONNECTION", 1);
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.clickByText("TC_C119816 Flow");

    //Transfer
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
    const toggleSimple = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleSimple, "Simple toggle is not visible");
    const toggleHttp = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleHttp, "Http toggle is not hidden");
    // -Other sections 'How would you like to parse files?' or 'What would you like to export' or any other should be hidden
    const howParse = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.HOW_WOULD_PARSE);
    await io.assert.expectToBeFalse(howParse, "How would you like to parse files? is not hidden");
    const wouldTransfer = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.WHERE_WOULD_TRANSFER);
    await io.assert.expectToBeFalse(wouldTransfer, "Where would you like to transfer from? is not hidden");
    const sortGrpoup = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SORTANDGROUP);
    await io.assert.expectToBeFalse(sortGrpoup, "How would you like to group and sort records? is not hidden");
    //-'Custom settings' should be renamed to 'Settings'.
    const Text = await io.homePage.isVisible("text='Settings'");
    await io.assert.expectToBeTrue(Text, "Settings name not shown");

    // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
    // -'Custom settings' section should be displayed below 'General' section.
    await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.homePage.loadingTime();
    expect(await page.screenshot()).toMatchSnapshot("TC_C119816-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

    //-'Launch form builder' button should be displayed in 'Settings' section
    const buttonDis = await page.$(selectors.flowBuilderPagePO.SETTING);
    expect(await buttonDis.screenshot()).toMatchSnapshot("TC_C119816 launchFormBuilder-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    //Lookup
    await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
    // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
    const toggleSimple1 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleSimple1, "Simple toggle is not visible");
    const toggleHttp1 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleHttp1, "Http toggle is not hidden");
    // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
    const wouldTrn1 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.WHERE_WOULD_TRANSFER);
    await io.assert.expectToBeFalse(wouldTrn1, "Where would you like to transfer from? is not hidden");
    //-'Custom settings' should be renamed to 'Settings'.
    const Text1 = await io.homePage.isVisible("text='Settings'");
    await io.assert.expectToBeTrue(Text1, "Settings name not shown");

    // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
    // -'Custom settings' section should be displayed below 'General' section.
    await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.homePage.loadingTime();
    const Symbol = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
    expect(await Symbol.screenshot()).toMatchSnapshot("TC_C119816 Lookup-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

    //-'Launch form builder' button should be displayed in 'Settings' section
    const buttonDis1 = await page.$(selectors.flowBuilderPagePO.SETTING);
    expect(await buttonDis1.screenshot()).toMatchSnapshot("TC_C119816 Lookup launchFormBuilder-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);


    //IMPORT
    await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 2);
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
    await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.homePage.loadingTime();
    const Symbol1 = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
    expect(await Symbol1.screenshot()).toMatchSnapshot("TC_C119816 Import-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

    //-'Launch form builder' button should be displayed in 'Settings' section
    const buttonDis2 = await page.$(selectors.flowBuilderPagePO.SETTING);
    expect(await buttonDis2.screenshot()).toMatchSnapshot("TC_C119816 Import launchFormBuilder-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    //TC_C119815 Verify on cloning the integration user is able to see Export/Lookup/Import having 'useAsPrimaryInterface' set to true under custom form displayed under Custom Settings of Export/Lookup/Import
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.CLOSE_FLOW_BUILDER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_FLOW_BUILDER);
    await io.homePage.waitForElementAttached(selectors.homePagePO.CLONE_INTEGRATION);
    await io.homePage.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.homePage.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);

    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io.homePage.clickByTextByIndex("S3 CONNECTION", 1);
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.loadingTime();
    await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "TC_C119816 Flow");
    await io.flowBuilder.clickByText("TC_C119816 Flow");

    //Transfer
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
    const toggleSimple3 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleSimple3, "Simple toggle is not visible");
    const toggleHttp3 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleHttp3, "Http toggle is not hidden");
    // -Other sections 'How would you like to parse files?' or 'What would you like to export' or any other should be hidden
    const wouldParse = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.HOW_WOULD_PARSE);
    await io.assert.expectToBeFalse(wouldParse, "How would you like to parse files? is not hidden");
    const wouldTrn2 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.WHERE_WOULD_TRANSFER);
    await io.assert.expectToBeFalse(wouldTrn2, "Where would you like to transfer from? is not hidden");
     const sortGoup = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SORTANDGROUP);
    await io.assert.expectToBeFalse(sortGoup, "How would you like to group and sort records? is not hidden");
    //-'Custom settings' should be renamed to 'Settings'.
    const Tex = await io.homePage.isVisible("text='Settings'");
    await io.assert.expectToBeTrue(Tex, "Settings name not shown");

    // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
    // -'Custom settings' section should be displayed below 'General' section.
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.loadingTime();
    expect(await page.screenshot()).toMatchSnapshot("TC_C119815-chromium-linux.png");
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

    //-'Launch form builder' button should be displayed in 'Settings' section
    const buttonDi = await page.$(selectors.flowBuilderPagePO.SETTING);
    expect(await buttonDi.screenshot()).toMatchSnapshot("TC_C119815 launchFormBuilder-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);


    //Lookup
    await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
    // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
    const toggleSimple4 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleSimple4, "Simple toggle is not visible");
    const toggleHttp4 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleHttp4, "Http toggle is not hidden");
    // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
    const wouldTrn = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.WHERE_WOULD_TRANSFER);
    await io.assert.expectToBeFalse(wouldTrn, "Where would you like to transfer from? is not hidden");
    //-'Custom settings' should be renamed to 'Settings'.
    const Tex1 = await io.homePage.isVisible("text='Settings'");
    await io.assert.expectToBeTrue(Tex1, "Settings name not shown");

    // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
    // -'Custom settings' section should be displayed below 'General' section.
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.loadingTime();
    const Symbo = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
    expect(await Symbo.screenshot()).toMatchSnapshot("TC_C119815 Lookup-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

    //-'Launch form builder' button should be displayed in 'Settings' section
    const buttonDi1 = await page.$(selectors.flowBuilderPagePO.SETTING);
    expect(await buttonDi1.screenshot()).toMatchSnapshot("TC_C119815 Lookup launchFormBuilder-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);


    //IMPORT
    await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 2);
    // -'Simple/HTTP' toggle at the very top of the bubble drawers (i.e. for HTTP based connectors) should be hidden
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);
    const toggleSimple5 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleSimple5, "Simple toggle is not visible");
    const toggleHttp5 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.assert.expectToBeFalse(toggleHttp5, "Http toggle is not hidden");
    // -Other sections 'Configure export type' or 'What would you like to export' or any other should be hidden
    const fileTransf1 = await io.flowBuilder.isVisible(selectors.importPagePO.FILES_TRANSFERED);
    await io.assert.expectToBeFalse(fileTransf1, "Where would you like the files transferred? is not hidden");
    const genFile1 = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.HOW_WOULD_GENE_FILE);
    await io.assert.expectToBeFalse(genFile1, "How would you like to generate files? is not hidden");
    //-'Custom settings' should be renamed to 'Settings'.
    const Tex2 = await io.homePage.isVisible("text='Settings'");
    await io.assert.expectToBeTrue(Tex2, "Settings name not shown");

    // -'Mock output' and 'Advanced' sections should be displayed below 'Settings'
    // -'Custom settings' section should be displayed below 'General' section.
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.loadingTime();
    const Symbo1 = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
    expect(await Symbo1.screenshot()).toMatchSnapshot("TC_C119815 Import-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);

    //-'Launch form builder' button should be displayed in 'Settings' section
    const buttonDi2 = await page.$(selectors.flowBuilderPagePO.SETTING);
    expect(await buttonDi2.screenshot()).toMatchSnapshot("TC_C119815 Import launchFormBuilder-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
  });
});