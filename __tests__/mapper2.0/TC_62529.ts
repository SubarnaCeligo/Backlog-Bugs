
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import httpconn from "@testData/Mapper2.0/TC_62529.json";

test.describe("TC_62529", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Env-All @Zephyr-IO-T22570 Mapper", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(httpconn, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    test.step("*** Navigated to mapper flow ***", async ()=>{});
    await io.homePage.clickByIndex(
      selectors.basePagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    test.step("*** Clicked on import mapping ***", async ()=>{});
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " button"
    );
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.mappings.MAPPER2DOT0PO.DATATYPES,
      1
    );
    test.step("*** selected source field datatype ***", async ()=>{});
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    let mapperDestinationField = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
    await mapperDestinationField.focus();
    await mapperDestinationField.dblclick();
    await page.keyboard.type("test");
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS
    );
    test.step("*** added destination value ***", async ()=>{});
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " button"
    );
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.mappings.MAPPER2DOT0PO.DATATYPES,
      1
    );
    test.step("*** selected destination field datatype ***", async ()=>{});
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    var datatype = await (
      await page.locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " button")
    ).textContent();
    await io.assert.expectToBeValue("number", datatype, "");
    await test.step("*** validated source field datatype value ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    test.step("*** Testcase passed ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
