
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C52207.json";

test.describe("TC_C51858", () => {
  test("@Env-All @Zephyr-IO-T22522 TC_C51858", async ({io,page}, testInfo) => {
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

    const fieldmappingSettings = (await page.$$(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS
    ))[1];
    let isEnabled1 = await fieldmappingSettings.isEnabled();
    await io.assert.expectToBeTrue(isEnabled1, "");

    test.step("*** clicking on Settings gear button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS,
      1
    );

    await test.step("*** Change the field mapping type to static lookup ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE
    );
    await io.homePage.click(
      "[data-value='lookup']"
    );

    var data = await io.homePage.isVisible(
      "[data-test='lookup.mapList']"
    );
    await io.assert.expectToBeTrue(data, "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
