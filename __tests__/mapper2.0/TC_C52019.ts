
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/Mapper2.0/TC_C52019.json";
import { allure } from "allure-playwright";

test.describe("TC_C52019", () => {
  test("@Env-All @Zephyr-IO-T22489 TC_C52019 | verify the settings page when user add value as expression in source fields", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Opened mappings ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on destination field***", async ()=>{});
    let mapperDestinationField = await page.locator(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input");
    await mapperDestinationField.focus();
    await mapperDestinationField.click();
    await page.keyboard.type("data");
    test.step("*** Clicking on source field***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS);
    let mapperSourceField = await page.locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS);
    await mapperSourceField.click();
    await page.keyboard.type("123");
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS
    )
    await io.homePage.loadingTime();
    test.step("*** Entered the value into source field ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTON);
    test.step("Clicked on Mapping settings button.", async ()=>{});
    var req = await page.locator(selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE);
    var res = await req.textContent();
    await io.assert.expectToBeValue(String(res), "Handlebars expression", "");
    await test.step("settings page is changed to handlebar expression", async ()=>{});
  });
});
