
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C51799 from "@testData/Mapper2.0/TC_C51799.json";

test.describe("TC_C51799", () => {
  test("@Env-All @Zephyr-IO-T22446 TC_C51799| Verify when there are existing mappings the tree structures should expand all rows by default [rows to rows]", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C51799, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Opened mappings ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on import mapping ***", async ()=>{});
    await test.step("*** Validate the mappings tree structure ***", async ()=>{});
    var data: any[] = ["test", "test1", "test2", "test4", "test5"];
    let resultsElements = await page.$$(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
    let result = true;
    for (let i = 0; i < resultsElements.length - 1; i++) {
      let value = await resultsElements[i].getAttribute("value");
      console.log(value);
      if (value != data[i]) {
        result = false;
      }
      if (!result) {
        break;
      }
    }
    await io.assert.expectToBeTrue(result, "");

    test.step("*** Closing the import mappings***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Navigate to home ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
