
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51239.json";

test.describe("TC_C51239", () => {
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22402 TC_C51239 | verify when user has 5 sources with comma separated value and if all the sources are removed , then the child rows should be retains as is", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the created export***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/assets/" + TC.pageGenerators[0].qa__export.qa__path);
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );
    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();

    test.step("*** Clearing the parent source field ***", async ()=>{});
    const inputField = await page.locator(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER).nth(0);
    await inputField.click();

    await io.homePage.loadingTime();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');

    await io.homePage.loadingTime();

    test.step("*** Save the import ***", async ()=>{});
    await io.homePage.clickByIndex(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS,
      1
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();

    test.step("*** Validating the child mappings ***", async ()=>{});
    var data: any[] = [
        "",
        "$.children[*].firstName",
        "$.mother.lName",
        "$.siblings[*].fName",
      ];
    let resultsElements = await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " input");
    let result = true;
    for (let i = 0; i < resultsElements.length; i++) {
      let value = await resultsElements[i].getAttribute("value");
      if (value != data[i]) {
        result = false;
      }
      if (!result) {
        break;
      }
    }
    await io.assert.expectToBeTrue(result, "");

    test.step("*** Navigate to home ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
