import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C51285.json";
import { allure } from "allure-playwright";

test.describe("TC_C51285 Verify custom value dropdown values when destination data type is [boolean] and the field mapping type is standard", () => {
  
  test("@Env-All @Zephyr-IO-T22414 Verify custom value dropdown values when destination data type is [boolean] and the field mapping type is standard", async ({ io, page }) => {
    // *Create Page Generators
    await io.homePage.addStep("*** Creating PageGenerator ***");
    await io.pageGenerator(allure, FTP);

    // *Create Page Processors
    await io.homePage.addStep("*** Creating PageProcessor ***");
    await io.pageProcessor(allure, FTP);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.addStep("*** Clicking on import mappings ***");
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();

    test.step("*** Clicking on destination field***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS
    );

    await test.step("*** Entered the text in the destination field***", async ()=>{});
    await io.flowBuilder.fill(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER,
      "name"
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER
    );

    await page.locator(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS).nth(0).click();

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.DATATYPE);
    await io.homePage.clickByText(
     'boolean'
    );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE,
    );
    await io.homePage.clickByText(
      'Standard'
     );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SOURCEDATATYPE,
    );
    await io.homePage.clickByTextByIndex(
      'boolean',
      1
     );


    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.DEFAULT_MAPPING,
    );
    await io.homePage.clickByText(
      'Use custom default value'
     );


    await io.homePage.loadingTime();
    await await io.homePage.addStep(
      "*** Validating custom value is by default true ***"
    );
    var result = await io.homePage.getText("[data-test='boolDefault']");
    await io.assert.expectToBeValue(String(result), "True", "");

    await io.homePage.click("[data-test='boolDefault']");

    const trueElement =  page.getByRole('menuitem', { name: 'True' }).locator('span').first();
    await expect(trueElement).toBeVisible();
   
    const falseElement =  page.getByRole('menuitem', { name: 'False' }).locator('span').first()
    await expect(falseElement).toBeVisible();
    await io.homePage.addStep("*** Navigate to home page ***");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
