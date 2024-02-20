import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/database/C120205.json";

test.describe(`TC120204_TC_C120205_TC_C120206_TC_C120207_TC120204`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("TC120204_TC_C120205_TC_C120206_TC_C120207_TC120204", async ({io, page}) => {
    await io.homePage.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.click(
            selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
        );
        await io.homePage.addStep("*** Clicked on add destination or lookup ***");
        await io.homePage.click("[data-test= 'Oracle DB (SQL)']");
        await io.homePage.addStep("*** Clicked on ORACLE application ***");
        await io.flowBuilder.clickByText("Import records into destination application");
        await io.homePage.addStep("*** Selected import records option ***");
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "ORACLE_DB_Connection");
        await io.homePage.addStep("*** Searched for ORACLE CONNECTION ***");
        await io.homePage.clickByText('ORACLE_DB_Connection');
        await io.homePage.addStep("*** Selected  ORACLE connection ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Clicked on next button ***");
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await io.homePage.addStep("*** Clicked on name field ***");
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Entered name for the import ***");
        await io.homePage.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
        await io.homePage.addStep("*** Clicked on destination table search field ***");
        await io.homePage.click("[data-test='dropdownoption-ARUNNEWTABLE1']");
        await io.homePage.addStep("*** Selected A table ***");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE);
        await io.homePage.addStep("*** Saved the import ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.homePage.addStep("*** Clicked on plus icon ***");
         await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS) 
        await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickButtonByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 2);
    await io.assert.verifyElementDisplayedByText('Auto-populate destination fields', "Field is not displayed properly");
    await io.flowBuilder.clickByText("Auto-populate destination fields");
    await io.homePage.addStep("*** Opened the import mappings ***");
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT);
    await io.homePage.addStep("*** Clicked on changing output format button ***");
    await io.flowBuilder.click(selectors.basePagePO.COLLAPSE_ALL);
    await io.homePage.addStep("*** Clicked on collapseall button ***");
    await io.flowBuilder.click(selectors.basePagePO.EXPAND_ALL);
    await io.homePage.addStep("*** Clicked on expandall button ***");
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "name");
    await io.homePage.addStep("*** Added destination field ***");
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, "name");
    await io.homePage.addStep("*** Added source field ***");
    await io.homePage.addStep("*** Clicked on destination field and verified the dropdown with destination fields from ORACLE ***");
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.homePage.addStep("*** Clicked on preview button ***");
    await io.assert.verifyElementIsDisplayed(
      selectors.mappings.MAPPER2DOT0PO.PREVIEW,
      "Fetch Preview is not displayed"
    )
    await io.homePage.clickByIndex(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTON,1);
    await page.getByText("Standard").click();
    await page.getByText("Handlebars expression", { exact: true }).click();
    await io.homePage.loadingTime()
    await io.flowBuilder.clickByText("Please select")
    let displaytext = false; 
try{

 (await io.assert.verifyElementDisplayedByText(
     "Do nothing",
     "'Do nothing'  dropdown option is not displayed"));
     displaytext = true;
}
   catch(e)
   {
     expect(displaytext).toBeFalsy();
   }
  });
})