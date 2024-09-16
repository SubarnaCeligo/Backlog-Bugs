
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

import FTP from "@testData/Mapper2.0/TC_C51532.json";

test.describe("TC_C51532", () => {
  test("@Env-All @Zephyr-IO-T22429 TC_C51532", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on output format dropdown ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT
    );
    await io.homePage.clickButtonByIndex(
      "[id='outputFormats'] li",
      0
    );
    test.step("*** Search the destination field ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SEARCH
    );
    test.step("*** Entering the search value ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.integrationPagePO.HOME_SEARCH, "Test");

    await test.step("*** Validate the searched destination field test.afterEach applying records outputformat dropdown ***", async ()=>{});
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

    await test.step("*** Validate the searched destination field test.afterEach applying rows outputformat dropdown ***", async ()=>{});
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

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
