import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/database/C120205.json";

test.describe(`TC_T19398_TC_T19399_TC_T19400_TC_T19401_TC_T19398`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("@Zephyr-IO-T19398_T19399_T19400_T19401_T19398 @Env-All @Priority-P2", async ({io, page}) => {
    await io.homePage.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.click(
            selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
        );
        await io.homePage.addStep("*** Clicked on add destination or lookup ***");
        await io.homePage.click(selectors.flowBuilderPagePO.ORACLEDB_APPLICATION);
        await io.homePage.addStep("*** Clicked on ORACLE application ***");
        await io.flowBuilder.clickByText("Import records into destination application");
        await io.flowBuilder.clickByText("Create flow step");
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'ONPREM');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await io.homePage.addStep("*** Clicked on name field ***");
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Entered name for the import ***");
        // await page.pause();
        await io.homePage.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
        await io.homePage.addStep("*** Clicked on destination table search field ***");
        await io.flowBuilder.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.ORACLEDB_TABLE);
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
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, "name");
    await io.homePage.addStep("*** Added source field ***");
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
    await io.flowBuilder.clickByText("Standard");
    await page.getByText("Handlebars expression", { exact: true }).click();
    await io.homePage.loadingTime()
    await page.getByText("Please select", { exact: true }).click();
    await page.getByText("Do nothing", { exact: false })

    });
  });