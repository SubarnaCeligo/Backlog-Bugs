
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51221.json";

test.describe("TC_C51221", () => {
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22388 TC_C51221", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on created import ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      await selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();

    var filepath = TC.pageGenerators[0].qa__export.qa__path;
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles(`testData/assets${filepath}`);
    await io.homePage.loadingTime();

    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on one of the child tabs ***", async ()=>{});

    await test.step("*** Removing one of the source field under child tab ***", async ()=>{});
    const hover = (await page.$$(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS
    ))[3];
    await hover.hover();
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.DELETEBUTTONS,
      3
    );

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Navigating to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    test.step("*** Obtaining the flowJson ***", async ()=>{});
    const flowJson = await io.api.getFlowById(flowID);
    test.step("*** Obtaining importId from flowJson ***", async ()=>{});
    const importId = flowJson.pageProcessors[0]._importId;

    test.step("*** Fetching import doc ***", async ()=>{});
    let importJson = await io.api.getCall(
      `v1/imports/${importId}`
    );

    await test.step("*** Validating deleting a row in any source should not effect the other source tabs ***", async ()=>{});
    await expect(importJson.mappings[1].buildArrayHelper[1].mappings[1]).hasOwnProperty("generate");
    await expect(importJson.mappings[1].buildArrayHelper[1].mappings[1]).hasOwnProperty("status");
  });
});
