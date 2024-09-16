
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C51532.json";

test.describe("TC_C51533", () => {
  test("@Env-All @Zephyr-IO-T22430 TC_C51533", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Search the destination field ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SEARCH
    );
    test.step("*** Entering the search value ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.integrationPagePO.HOME_SEARCH, "Test");

    test.step("*** Validate the searched destination field test.afterEach applying records outputformat dropdown ***", async ()=>{});
    let data: any[] = ["Test"];
    let resultsElements = await page.$$(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input");
    let result = true;
    for (let i = 0; i < resultsElements.length - 1; i++) {
      let value = await resultsElements[i].getAttribute("value");
      if (value != data[i]) {
        result = false;
      }
      if (!result) {
        break;
      }
    }
    await io.assert.expectToBeTrue(result, "");

    test.step("*** Clicking on output format dropdown ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT
    );
    await io.homePage.clickButtonByIndex(
      "[id='outputFormats'] li",
      1
    );
    
    test.step("*** Validate the searched destination field test.afterEach applying records outputformat dropdown ***", async ()=>{});
    data = ["", "Test"];
    resultsElements = await page.$$(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input");
    result = true;
    for (let i = 0; i < resultsElements.length - 1; i++) {
      let value = await resultsElements[i].getAttribute("value");
      if (value != data[i]) {
        result = false;
      }
      if (!result) {
        break;
      }
    }
    await io.assert.expectToBeTrue(result, "");

    await test.step("*** Validate the search matches should persists when user switches between outputformats dropdown ***", async ()=>{});
    const existt = await io.homePage.isVisible(
      selectors.integrationPagePO.HOME_SEARCH
    );
    await io.assert.expectToBeTrue(existt, "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
