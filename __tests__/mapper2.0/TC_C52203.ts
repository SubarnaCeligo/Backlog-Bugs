
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C52203.json";

test.describe("TC_C52203", () => {
  test("@Env-All @Zephyr-IO-T22519 TC_C52203", async ({io,page}, testInfo) => {
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

    test.step("*** Clicking on filter ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.FILTER_OPTION,
      0
    );
    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "Mapped fields"
    );
    await io.homePage.loadingTime();
    test.step("*** Selected Mapping field ***", async ()=>{});

    test.step("*** clicking on Apply button ***", async ()=>{});
    await io.homePage.clickByText(
      "Apply"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const datatypemappingfield = (await page.$$(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " button"
    ))[0];
    let isEnabled = await datatypemappingfield.isEnabled();
    await io.assert.expectToBeFalse(isEnabled, "");

    const fieldmappingSettings = (await page.$$(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS
    ))[0];
    let isEnabled1 = await fieldmappingSettings.isEnabled();
    await io.assert.expectToBeFalse(isEnabled1, "");

    const plusicon = (await page.$$(
      selectors.flowBuilderPagePO.FIELD_MAPPING_ADD
    ))[0];
    let isEnabled2 = await plusicon.isEnabled();
    await io.assert.expectToBeFalse(isEnabled2, "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
