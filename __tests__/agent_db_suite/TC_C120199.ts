import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C111324.json";

test.describe(`C120199_C120203_C120215`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("C120199_C120203_C120215", async ({io, page}) => {
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
    //C120215
    await io.homePage.click(selectors.flowBuilderPagePO.ORACLEDB_TABLE);
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