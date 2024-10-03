import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C111324.json";

test.describe(`TC_T19396_TC_T19397TC__T19409`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("@Zephyr-IO-T19396_T19396_T19397_T19409 @Env-All @Priority-P2", async ({io, page}) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
        selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.addStep("*** Clicked on add destination or lookup ***");
    await io.homePage.click(selectors.flowBuilderPagePO.ORACLEDB_APPLICATION);
    await io.homePage.addStep("*** Clicked on ORACLE application ***");
    await io.flowBuilder.clickByText("Import records into destination application");
    await io.homePage.addStep("*** Selected import records option ***");
    await io.flowBuilder.clickByText("Create flow step");
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'ORACLE_DB_Connection');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.homePage.addStep("*** Clicked on next button ***");
    await io.homePage.click(selectors.basePagePO.ADD_NAME);
    await io.homePage.addStep("*** Clicked on name field ***");
    await page.keyboard.press('/');
    await io.homePage.addStep("*** Entered name for the import ***");
    await io.homePage.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATIONTABLE_PLACEHOLDER, "Test");    
    await io.homePage.addStep("*** Clicked on destination table search field ***");
    //C120215
    await io.homePage.addStep("*** Selected A table ***");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE);
    await io.homePage.addStep("*** Saved the import ***");
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.homePage.addStep("*** Clicked on plus icon ***");
     await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS) 
await io.flowBuilder.loadingTime();
await io.homePage.clickByText('Create destination rows [ ] from source record { }');
await io.assert.verifyElementDisplayedByText("Create destination record { } from source record { }",
  "'Create destination record { } from source record { }'  dropdown option is not displayed");
 });
});