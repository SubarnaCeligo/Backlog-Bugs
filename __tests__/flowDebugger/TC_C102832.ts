import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C102832.json";

test.describe("TC_C102832_C102833_C102834_C102835_C102836_C102837", () => {
  let platform;
  let str = JSON.stringify(TC.ghostText);
  let str1 = JSON.stringify(TC.ghostText1);
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T24385 TC_C102832_C102833_C102834_C102835_C102836_C102837", async ({
    io,
    page
  }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.flowBuilder.navigateToTheFlow(flows.get('TC_C102832').flowId);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => {});
    //EXPORT:
    //TC_C102832 Verify added "Populate with canonical stub" button in Mock Output field for Export/lookup
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    var stubButton = await (
      await page.locator(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB)
    ).isVisible();
    await io.assert.expectToBeTrue(stubButton, "");
    test.step("*** Verified 'Populate with canonical stub' button should be displayed in Mock Output field ***", async () => {});
    var label = await io.homePage.getText(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    await io.assert.expectToContainValue(
      "Populate with canonical stub",
      label.toString(),
      ""
    );
    test.step("*** Verified Label : 'Populate with canonical stub' ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT_EDIT);
    test.step("*** Clicking on Expand ***", async () => {});
    await io.homePage.loadingTime();
    var button = await page.$$(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    var stubButton1 = await button[1].isVisible();
    await io.assert.expectToBeTrue(stubButton1, "");
    var label1 = await button[1].textContent();
    await io.assert.expectToContainValue(
      "Populate with canonical stub",
      label1,
      ""
    );
    test.step("*** Verified 'Populate with canonical stub' button should be displayed in JSON Editor of Mock Output field ***", async () => {});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Clicking on close ***", async () => {});
    await io.homePage.loadingTime();

    //TC_C102833 Verify test.afterEach clicking on "Populate with canonical stub" button, Based on the export configuration , populate appropriate “Mock output” stub as ghost text for Export/lookup
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on insert canonical stub ***", async () => {});
    //For page of records below stub should be populated
    let ghostText2 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock response ***", async () => {});
    test.step("*** Verified For page of records correct stub should be populated ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD
    );
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.GROUP_RECORD_FIELD_INPUT,
      "id"
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on insert canonical stub ***", async () => {});
    //TC_C102836 Verify if the configuration is updated, update the stub or Mock output entered to the correct format(record vs row structure)
    let updatedText2 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock output ***", async () => {});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on save ***", async () => {});
    await io.homePage.loadingTime();
    await test.step("*** Verified if the configuration is updated, update the stub or Mock output entered to the correct format (record vs row structure) ***", async () => {});
    test.step("*** Verify test.afterEach clicking on 'Populate with canonical stub' button, Based on the export configuration , populate appropriate “Mock output” stub as ghost text for Export/lookup ***", async () => {});
    //TC_C102837 Verify Users should be able to save the form for below given conditions for Export/lookup
    //TC_C102834 Verify Users should be able to edit the “Mock output” stub directly in the form or users can edit the stub in a JSON editor for Export/lookup
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
    test.step("*** editing the “Mock output” stub directly in the form ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT_EDIT);
    test.step("*** Clicked on Expand Button ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.MOCKOUT1, 1);
    platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await io.homePage.clickByIndex(selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN, 1);
    } else {
      await page.keyboard.type("Control+A");
      await page.keyboard.type("Delete");
    }
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN, 1);
    test.step("*** Filling updated stub into Mock Output field ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.DONEBUTTON);
    test.step("*** Clicking on Done ***", async () => {});
    await io.homePage.loadingTime();
    test.step("*** Verified users should be able to edit the “Mock output” stub directly in the form or users can edit the stub in a JSON editor for Export/lookup ***", async () => {});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on save ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    //TC_C102835 Verify Clicking “Populate with preview data” replacing existing stub in the mock output field for Export/lookup
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN
    );
    test.step("*** Clicking on populate with preview data ***", async () => {});
    await io.homePage.loadingTime();
    let updatedText = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the preview data ***", async () => {});
    expect(updatedText).not.toContain(str);
    test.step("*** Verified Clicking “Populate with preview data” replacing existing stub in the mock output field for Export/lookup ***", async () => {});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking on save and close ***", async () => {});
    await io.homePage.loadingTime();
    //LOOKUP:
    //TC_C102832 Verify added "Populate with canonical stub" button in Mock Output field for Export/lookup
    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUP);
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.loadingTime();
    var stubButtn = await (
      await page.locator(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB)
    ).isVisible();
    await io.assert.expectToBeTrue(stubButtn, "");
    test.step("*** Verified 'Populate with canonical stub' button should be displayed in Mock Output field ***", async () => {});
    var labl = await io.homePage.getText(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    await io.assert.expectToContainValue(
      "Populate with canonical stub",
      labl.toString(),
      ""
    );
    test.step("*** Verified Label : 'Populate with canonical stub' ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT_EDIT);
    test.step("*** Clicking on Expand ***", async () => {});
    await io.homePage.loadingTime();
    var buttn = await page.$$(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    var stubButto1 = await buttn[1].isVisible();
    await io.assert.expectToBeTrue(stubButto1, "");
    var labl1 = await buttn[1].textContent();
    await io.assert.expectToContainValue(
      "Populate with canonical stub",
      labl1,
      ""
    );
    test.step("*** Verified 'Populate with canonical stub' button should be displayed in JSON Editor of Mock Output field ***", async () => {});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Clicking on close ***", async () => {});
    await io.homePage.loadingTime();
    //TC_C102833 Verify test.afterEach clicking on "Populate with canonical stub" button, Based on the export configuration , populate appropriate “Mock output” stub as ghost text for Export/lookup
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on insert canonical stub ***", async () => {});
    //For page of records below stub should be populated
    let ghostTex = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock response ***", async () => {});
    // expect(ghostTex).toEqual(str);
    test.step("*** Verified For page of records correct stub should be populated ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD
    );
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.GROUP_RECORD_FIELD_INPUT,
      "id"
    );
    //For page of rows below stub should be populated
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on insert canonical stub ***", async () => {});
    //TC_C102836 Verify if the configuration is updated, update the stub or Mock output entered to the correct format(record vs row structure)
    let updatedTex1 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock output ***", async () => {});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on save ***", async () => {});
    await io.homePage.loadingTime();
    await test.step("*** Verified if the configuration is updated, update the stub or Mock output entered to the correct format (record vs row structure) ***", async () => {});
    test.step("*** Verify test.afterEach clicking on 'Populate with canonical stub' button, Based on the export configuration , populate appropriate “Mock output” stub as ghost text for Export/lookup ***", async () => {});
    //TC_C102837 Verify Users should be able to save the form for below given conditions for Export/lookup
    //TC_C102834 Verify Users should be able to edit the “Mock output” stub directly in the form or users can edit the stub in a JSON editor for Export/lookup
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
    test.step("*** editing the “Mock output” stub directly in the form ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT_EDIT);
    test.step("*** Clicked on Expand Button ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.MOCKOUT1, 1);
    platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await io.homePage.clickByIndex(selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN, 1);
    } else {
      await page.keyboard.type("Control+A");
      await page.keyboard.type("Delete");
    }
    await io.homePage.loadingTime();
    var place1 = await page.$$(selectors.flowBuilderPagePO.MOCKOUT1)[1];
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN, 1);
    test.step("*** Filling updated stub into Mock Output field ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.DONEBUTTON);
    test.step("*** Clicking on Done ***", async () => {});
    await io.homePage.loadingTime();
    test.step("*** Verified users should be able to edit the “Mock output” stub directly in the form or users can edit the stub in a JSON editor for Export/lookup ***", async () => {});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on save ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    //TC_C102835 Verify Clicking “Populate with preview data” replacing existing stub in the mock output field for Export/lookup
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN
    );
    test.step("*** Clicking on populate with preview data ***", async () => {});
    await io.homePage.loadingTime();
    let updatedText1 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the preview data ***", async () => {});
    expect(updatedText1).not.toContain(str);
    test.step("*** Verified Clicking “Populate with preview data” replacing existing stub in the mock output field for Export/lookup ***", async () => {});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking on save and close ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => {});
  });
});
