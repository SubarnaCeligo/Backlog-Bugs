
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51238.json";

test.describe("TC_C51238", () => {
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22401 TC_C51238", async ({io,page}, testInfo) => {
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
    await io.homePage.loadingTime();

    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();

    await test.step("*** Clearing the source field and adding new source field ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS,
      0
    );

    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');

    await io.homePage.clickByIndex(
      selectors.mappings.MAPPER2DOT0PO.CHILDTREELIST,
      0
    );
    await io.homePage.loadingTime();

    test.step("*** Save the import mappings***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();

    test.step("*** Validating the child mappings ***", async ()=>{});
    const data = [
      "test",
      "test1",
      "test2",
    ];
    const resultsElements = await page.$$(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input");
    let result = true;
    for (let i = 1; i < resultsElements.length; i++) {
      let value = await resultsElements[i].getAttribute("value");
      if (value != data[i-1]) {
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
