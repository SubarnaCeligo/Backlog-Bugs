
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C51324 from "@testData/Mapper2.0/TC_C51324.json";

test.describe("TC_C51324", () => {
  test("@Env-All @Zephyr-IO-T22421 TC_C51324 | Verify when user has multiple sources and the search field match is in second tab", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C51324, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    test.step("*** Click on the created export***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/assets/" + TC_C51324.pageGenerators[0].qa__export.qa__path);
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
    await io.flowBuilder.isPageReady();

    await io.homePage.loadingTime();

    await test.step("*** Verify the child destination value test.beforeEach search***", async ()=>{});
    let ele = await page.$$("[role='tree'] " + selectors.flowBuilderPagePO.TAB);
    let result = await ele[0].getAttribute("tabindex");
    await io.assert.expectToBeValue(result, "0", "");
    let data = await (await page.locator(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input").nth(1)).getAttribute("value");
    await io.assert.expectToContainValue("auto", data, "");

    test.step("*** Click on search button ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SEARCH
    );
    test.step("*** Clicking on search input field***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON + " input", "test");
    await io.homePage.loadingTime();

    await test.step("*** Verify tab got changed and the child destination value test.afterEach search***", async ()=>{});
    ele = await page.$$("[role='tree'] " + selectors.flowBuilderPagePO.TAB);
    result = await ele[1].getAttribute("tabindex");
    await io.assert.expectToBeValue(result, "0", "");
    data = await (await page.locator(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input").nth(1)).getAttribute("value");
    await io.assert.expectToContainValue("test", data, "");

    test.step("*** Close the import mapping ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Navigate to home ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
