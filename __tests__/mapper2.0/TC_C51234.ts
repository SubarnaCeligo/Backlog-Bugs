import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51234.json";

test.describe("TC_C51234 verify when user has 1 sources if it is removed and 2 new source added", () => {
  let flowID;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowID);
  });
  test("@Env-All @Zephyr-IO-T22397  verify when user has 1 sources if it is removed and 2 new source added", async ({
    io,
    page
  }) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the created export***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/assets/" + "FTP_uploads/TC_C51221.json");
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );
    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();

    test.step("*** Clicking on source fields ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS,
      1
    );
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.type("$.mother,$.siblings[*].children[*]");

    test.step("*** Click on Preview ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** Click On Save and close ***", async () => {});

    test.step("*** Obtaining the flowJson ***", async ()=>{});
    const flowJson = await io.api.getFlowById(flowID);
    test.step("*** Obtaining importId from flowJson ***", async ()=>{});
    const importId = flowJson.pageProcessors[0]._importId;

    test.step("*** Fetching import doc ***", async () => {});
    let importJson1 = await io.api.getCall(`v1/imports/${importId}`);

    await test.step("*** Validating new sources are added test.afterEach deleting one source ***", async () => {});
    await expect(importJson1.mappings[1].buildArrayHelper[0]).hasOwnProperty(
      "extract"
    );
    await expect(importJson1.mappings[1].buildArrayHelper[0]).hasOwnProperty(
      "$.mother"
    );
  });
});
