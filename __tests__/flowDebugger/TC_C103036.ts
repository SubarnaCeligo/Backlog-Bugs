import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C103036.json";
import TC1 from "../../testData/inputData/FlowDebugger/TC_C103036_1.json";

test.describe("TC_C103036", () => {
  let str = JSON.stringify(TC.ghostText);
  let str1 = JSON.stringify(TC.ghostText1);
  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Home Page ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T24398 TC_C103036", async ({ io }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => {}
    );
    await io.flowBuilder.navigateToTheFlow(flows.get('TC_C103036')["flowId"]);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => {});
    //BigQuery
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.EXPORT_BUBBLE,
      0
    );
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    let mockRes13 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock response ***", async () => {});
    test.step("*** Verified mock response stub should be populated ***", async () => {});
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
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    let updatedText1 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock output ***", async () => {});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    //Netsuite Export
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.EXPORT_BUBBLE,
      0
    );
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    await io.homePage.loadingTime();
    let mockRes = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock response ***", async () => {});
    test.step("*** Verified mock response stub should be populated ***", async () => {});
    test.step("*** Clicked on Group row checkbox ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    let updatedTex2 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock output ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MAP_ZOOM_TO_FIT);
    await io.homePage.loadingTime();
    //AZure blob storage
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    await io.homePage.loadingTime();
    let mockRes2 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock response ***", async () => {});
    test.step("*** Verified mock response stub should be populated ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.SORTANDGROUP
    );
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.FILE_GROUP_BY_FIELDS,
      "id"
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    await io.homePage.loadingTime();
    let updatedText2 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock output ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    //AS2 Export
    await io.homePage.click(selectors.flowBuilderPagePO.LISTENER);
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    await io.homePage.loadingTime();
    let listmockRes = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock response ***", async () => {});
    test.step("*** Verified mock response stub should be populated ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.SORTANDGROUP);
    test.step("*** Clicked on Group row checkbox ***", async () => {});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.FILE_GROUP_BY_FIELDS_ID_FORM_CONTROL_ROOT,
      "Id"
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    let listupdatedTex2 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock output ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    //Netsuite Transfer
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    await io.homePage.loadingTime();
    let nsmockRes2 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock response ***", async () => {});
    test.step("*** Verified mock response stub should be populated ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.SORTANDGROUP);
    test.step("*** Clicked on Group row checkbox ***", async () => {});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.FILE_GROUP_BY_FIELDS_ID_FORM_CONTROL_ROOT,
      "Id"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    await io.homePage.loadingTime();
    // await io.homePage.click(
    //   selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    // );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    let nsupdatedText2 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock output ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Navigate to home page ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T24398 TC_C103036_1", async ({ io }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC1);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => {}
    );
    await io.flowBuilder.navigateToTheFlow(flows.get('TC_C103036')["flowId"]);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => {});
    await io.homePage.doubleClick(selectors.flowBuilderPagePO.MAP_ZOOM_TO_FIT);
    await io.homePage.loadingTime();
    //S3 export
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    await io.homePage.loadingTime();
    let mockRes11 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock response ***", async () => {});
    test.step("*** Verified mock response stub should be populated ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.SORTANDGROUP);
    test.step("*** Selecting Sort Field ***", async () => {});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.FILE_GROUP_BY_FIELDS_ID_FORM_CONTROL_ROOT,
      "id"
    );
    test.step("*** Selecting Group Field ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    await io.homePage.loadingTime();
    let updatedText1 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock output ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    //FTP export
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    await io.homePage.loadingTime();
    let mockRes = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock response ***", async () => {});
    test.step("*** Verified mock response stub should be populated ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.SORTANDGROUP);
    test.step("*** Selecting Sort Field ***", async () => {});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.FILE_GROUP_BY_FIELDS_ID_FORM_CONTROL_ROOT,
      "id"
    );
    test.step("*** Selecting Group Field ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    await io.homePage.loadingTime();
    let updatedText = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock output ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    //mongoDB export
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.EXPORT_BUBBLE,
      0
    );
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    await io.homePage.loadingTime();
    let mongomockRes12 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock response ***", async () => {});
    test.step("*** Verified mock response stub should be populated ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD
    );
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.GROUP_RECORD_FIELD_INPUT,
      "Name"
    );
    test.step("*** Selecting Group Field ***", async () => {});
    test.step("*** Clicking on Done ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    await io.homePage.loadingTime();
    let mongoupdatedText1 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock output ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    //DynamoDB export
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.EXPORT_BUBBLE,
      0
    );
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    let mongomockResDynamoDB = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Verified mock response stub should be populated ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD
    );
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.GROUP_RECORD_FIELD_INPUT,
      "id"
    );
    test.step("*** Selecting Group Field ***", async () => {});
    test.step("*** Clicking on Done ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on Populate with canonical stub button ***", async () => {});
    let mongoupdatedTextDynamoDB = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock output ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to home page ***", async () => {});
  });
});
