import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C51284 from "@testData/Mapper2.0/TC_C51284.json";

test.describe("TC_C51284 verify error messages when user has missing extracts for (required fields) both parent and child", () => {
  let flowID;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowID);
  });
  test("@Env-All @Zephyr-IO-T22413  verify error messages when user has missing extracts for (required fields) both parent and child", async ({
    io
  }) => {
    test.step(" *** CREATED FLOW VIA API ***", async () => {});
    flowID = await io.createResourceFromAPI(TC_C51284, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the import mappings***", async () => {});
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the auto papulate fields***", async () => {});
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU,
      2
    );

    await io.homePage.click(selectors.importPagePO.AUTO_POPULATE_MAPPINGS);
    await io.homePage.loadingTime();
    test.step("*** Expand parent mapping ***", async () => {});

    await io.homePage.click(
      selectors.flowBuilderPagePO.CLOSE_AUTOPOPULATE_MESSAGE_POPUP
    );
    await io.homePage.loadingTime();
    test.step("*** Click on preview ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    test.step("*** Validate the error message ***", async () => {});

    var data = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.PREVIEWERR
    );
    const commonPrefix =
      "Mapper 2.0: Source field value not entered for destination field(s): ";

    const expectedFields = data.replace(commonPrefix, "").split(",").sort();
    const receivedFields = data.replace(commonPrefix, "").split(",").sort();

    expect(expectedFields).toEqual(receivedFields);

    test.step("*** Click on save button ***", async () => {});
    await io.homePage.click(selectors.basePagePO.SAVE);
  });
});
