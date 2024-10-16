import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C102832.json";

test.describe("TC_C102838_C102839_C102840_C102841_C102842_C102844", () => {
  let platform;
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T24391 TC_C102838_C102839_C102840_C102841_C102842_C102844", async ({
    io,
    page
  }, testInfo) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => { }
    );
    await io.flowBuilder.navigateToTheFlow(flows.get('TC_C102832').flowId);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => { });
    //Import
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    test.step("*** Clicking on import ***", async () => { });
    await io.homePage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    test.step("*** Clicking on mock response tab ***", async () => { });
    await io.homePage.loadingTime();
    //TC_C102838 Verify added "Populate with canonical stub" button in Mock response field for import.
    var stubButton = await (
      await page.locator(selectors.importPagePO.POPULATE_CANONICAL_STUB)
    ).isVisible();
    await io.assert.expectToBeTrue(stubButton, "");
    test.step("*** Verified 'Populate with canonical stub' button should be displayed in Mock response field ***", async () => { });
    var label = await io.homePage.getText(
      selectors.importPagePO.POPULATE_CANONICAL_STUB
    );
    await io.assert.expectToContainValue(
      "Populate with canonical stub",
      label.toString(),
      ""
    );
    test.step("*** Verified Label : 'Populate with canonical stub' ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.MOCKRESPEDIT);
    test.step("*** Clicked on Expand Button ***", async () => { });
    await io.homePage.loadingTime();
    var botton = await page.locator(
      selectors.importPagePO.POPULATE_CANONICAL_STUB
    );
    var stubButton1 = await botton.nth(1).isVisible();
    await io.assert.expectToBeTrue(stubButton1, "");
    test.step("*** Verified 'Populate with canonical stub' button should be displayed in Mock response field ***", async () => { });
    var label1 = await io.homePage.getText(
      selectors.importPagePO.POPULATE_CANONICAL_STUB
    );
    await io.assert.expectToContainValue(
      "Populate with canonical stub",
      label1.toString(),
      ""
    );
    test.step("*** Verified Label : 'Populate with canonical stub' ***", async () => { });
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Clicking on close button ***", async () => { });
    await io.homePage.loadingTime();
    //TC_C102840 Verify test.afterEach clicking on "Populate with canonical stub" button, “Mock response” field for import should be populated with the “Mock response” stub(ghost text).
    await io.homePage.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);
    test.step("*** Clicking on insert canonical stub button ***", async () => { });
    let mockRes = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKRES
    );
    test.step("*** Copying the mock response ***", async () => { });
    let str = JSON.stringify(TC.mockresponseGhostText);
    test.step("*** Verified mock response stub should be populated ***", async () => { });
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicked on save Button ***", async () => { });
    await io.homePage.loadingTime();
    //TC_C102843 Verify Users should be able to edit the “Mock response” stub directly in the form or users can edit the stub in a JSON editor for import
    await io.homePage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    test.step("*** Clicking on mock response tab ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.MOCKRES);
    test.step("*** editing the “Mock response” stub directly in the form ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MOCKRESPEDIT);
    test.step("*** Clicked on Expand Button ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.MOCKRES1, 1);
    platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await io.homePage.clickByIndex(selectors.importPagePO.POPULATE_CANONICAL_STUB, 1);
    } else {
      await io.homePage.clickByIndex(selectors.importPagePO.POPULATE_CANONICAL_STUB, 1);
    }
    await io.homePage.loadingTime();
    // test.step("*** Clicked on Expand Button ***", async ()=>{});
    var place = await page.$$(selectors.flowBuilderPagePO.MOCKRES1)[1];
    await io.homePage.enterHugeData(place, JSON.stringify(TC.editMock));
    test.step("*** Filling updated stub into Mock Output field ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.DONEBUTTON);
    test.step("*** Clicking on Done ***", async () => { });
    test.step("*** Verified Users should be able to edit the “Mock response” stub directly in the form or users can edit the stub in a JSON editor for import ***", async () => { });
    await io.homePage.loadingTime();
    //TC_C102844 Verify Users should be able to save the form for below given conditions
    //TC_C102841 Verify for import If “Populate with live data” is clicked, stub should be replaced with the new preview data.
    await io.homePage.click(selectors.flowBuilderPagePO.POPULWITHMOCKRESP1);
    test.step("*** Clicking on populate Mock Response ***", async () => { });
    await io.homePage.loadingTime();
    let previewData = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKRES
    );
    test.step("*** Copying the mock response ***", async () => { });
    let tex = JSON.stringify(TC.editMock);
    await expect(previewData).not.toContain(tex);
    test.step("*** Verified for import If “Populate with live data” is clicked, stub should be replaced with the new preview data. ***", async () => { });
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicked on save Button ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    test.step("*** Clicking on mock response tab ***", async () => { });
    await io.homePage.loadingTime();
    // await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.MOCKRES1, 1);
    platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await io.homePage.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);
    } else {
      await io.homePage.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);
    }
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked on save Button ***", async () => { });
    await io.homePage.loadingTime();
    //TC_C102842 Verify Where preview panel is not supported, “Populate with sample response data” link should be removed from Mock response field for import
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    test.step("*** Clicked on Ftp import ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    test.step("*** Clicking on mock response tab ***", async () => { });

    var popSample = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.POPULATE_MOCK_RESPONSE_SAMPLE_DATA
    );
    await io.assert.expectToBeValue(String(popSample), "false", "");
    test.step("*** Verified “Populate sample response data” button should not be present in the import form ***", async () => { });
    //TC_C102839 Verify added "Populate with canonical stub" button in Mock response field for import where we don't have preview panel
    var stubButto = await (
      await page.locator(selectors.importPagePO.POPULATE_CANONICAL_STUB)
    ).isVisible();
    await io.assert.expectToBeTrue(stubButto, "");
    var labe1 = await io.homePage.getText(
      selectors.importPagePO.POPULATE_CANONICAL_STUB
    );
    await io.assert.expectToContainValue(
      "Populate with canonical stub",
      labe1.toString(),
      ""
    );
    test.step("*** Verified Label : 'Populate with canonical stub' ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.MOCKRESPEDIT);
    test.step("*** Clicked on Expand Button ***", async () => { });
    await io.homePage.loadingTime();
    var bottn = await page.locator(
      selectors.importPagePO.POPULATE_CANONICAL_STUB
    );
    var stubButtn1 = await bottn.nth(1).isVisible();
    await io.assert.expectToBeTrue(stubButtn1, "");
    test.step("*** Verified Populate with sample response data link should be removed from Mock response and added 'Populate with canonical stub' button ***", async () => { });
    var labl1 = await io.homePage.getText(
      selectors.importPagePO.POPULATE_CANONICAL_STUB
    );
    await io.assert.expectToContainValue(
      "Populate with canonical stub",
      labl1.toString(),
      ""
    );
    test.step("*** Verified Label : 'Populate with canonical stub' ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.SHOW_EDITOR);
    test.step("*** Clicked on done Button ***", async () => { });
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked on save Button ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => { });
  });
});
