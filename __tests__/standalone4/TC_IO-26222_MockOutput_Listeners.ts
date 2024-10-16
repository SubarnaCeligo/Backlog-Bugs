
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("IO-26222_MockOutput_Listeners", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("IO-26222_MockOutput_Listeners @Env-All @Zephyr-IO-T14474 @Zephyr-IO-T14458", async ({io,page}, testInfo) => {
    //C55475 - Verify a new section called Mock output added to listener page generators
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLICATION);
    await page.keyboard.type("webhook");
    await io.homePage.click(selectors.exportsPagePO.WEBHOOK);
    await io.homePage.loadingTime();
    
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var mockOutputSection = await io.homePage.isVisible(selectors.exportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON);
    await io.assert.expectToBeTrue(mockOutputSection, "");
    test.step("*** Validation for C55475 - Verify a new section called Mock output added to listener page generators ***", async ()=>{});

    //C55476 - Verify Help text for “Mock output” field for listeners
    var mockSection = await page.$(
      selectors.exportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON
    );
    await mockSection.focus();
    await io.homePage.click(selectors.exportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON);
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_MOCKOUTPUT);
    var expectedHelpText =
      "Mock output simulates exported data when you configure a flow or execute a flow test run. Instead of executing the export to retrieve live sample data (or waiting for webhook listeners to receive data), integrator.io uses the mock output you provide to simulate how source records will appear while you are configuring your flow.";
    var actualHelpText = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue(expectedHelpText, String(actualHelpText),"");
    test.step("*** Validation for C55476 - Verify Help text for “Mock output” field for listeners ***", async ()=>{});

    //C55459 - Verify Populate with preview data is not available for listeners
    var populateWithPreviewDataBtn = await io.homePage.isVisible(selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN);
    await io.assert.expectToBeFalse(populateWithPreviewDataBtn, "");
    test.step("*** Validation for C55459 - Verify Populate with preview data is not available for listeners ***", async ()=>{});
  });
});
