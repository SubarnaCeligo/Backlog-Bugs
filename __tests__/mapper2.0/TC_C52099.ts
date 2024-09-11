
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/Mapper2.0/TC_C52099.json";
import { allure } from "allure-playwright";

test.describe("TC_C52099", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T22546 TC_C52099 | Verify static lookups for all possible data types", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Opened mappings ***", async ()=>{});

    test.step("*** Obtaining the flowJson ***", async ()=>{});
    const flowJson = await io.api.getFlowById(flowID);
    test.step("*** Obtaining importId from flowJson ***", async ()=>{});
    const importId = flowJson.pageProcessors[0]._importId;
  
    const importJson = await io.api.getImportById(importId);

    await io.assert.expectToBeTrue(importJson.lookups[0].map["1"] == "fname", "");
    await io.assert.expectToBeTrue(importJson.lookups[0].map["2"] == "fname", "");

    await test.step("*** Validate staticlook, the destination field has multiple source values ***", async ()=>{});

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();

    test.step("*** clicking on Settings gear button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS,
      1
    );
    await io.homePage.loadingTime();

    await test.step("*** Change the Destination datatype as number ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.DATATYPE
    );
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.NUMBERVALUE);

    await test.step("*** Change the field mapping type to static lookup ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE
    );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.LOOKUPOPTIONVALUE
    );
    await io.homePage.loadingTime();

    let input = await page.locator(selectors.mappings.STATICLOOKUPIMPORT);
    await input.focus();
    await input.click();
    await page.keyboard.type("test");

    input = await page.locator(selectors.mappings.STATICLOOKUPEXPORT);
    await input.focus();
    await input.click();
    await page.keyboard.type("1, 2");

    input = await page.locator(selectors.mappings.STATICLOOKUPNAME);
    await input.focus();
    await input.click();
    await page.keyboard.type("sample");
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );

    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    const importJson1 = await io.api.getImportById(importId);

    await io.assert.expectToBeTrue(importJson1.lookups[1].map["1"] === "test", "");
    await io.assert.expectToBeTrue(importJson1.lookups[1].map[" 2"] === "test", "");
    await test.step("*** Validate staticlook, the destination field has multiple source values ***", async ()=>{});
  });
});
