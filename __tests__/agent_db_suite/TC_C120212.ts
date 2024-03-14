import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C120210_TC_C120211_TC_C120212_TC_C120213,TC_C120214_TC_C120216", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_C120212", async ({ io, page }) => {
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
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our import ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Opened the import ***");
        await io.homePage.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
        await io.assert.verifyElementDisplayedByText("Destination table *", "Destination table is not added");
        await io.homePage.click(selectors.flowBuilderPagePO.ORACLEDB_TABLE);
        await io.assert.checkElementState(selectors.flowBuilderPagePO.REFRESHBUTTONPOSTGRE, 'isVisible');
    await io.importsPage.click('[id="rdbms.bulkInsert.tableName"]>div>div>button');
    await io.assert.verifyElementDisplayedByText(`Select a data destination for bulk inserts. You can bulk insert data into a table.`,
          'prefix lookup text is incorrect');
        await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
        await io.homePage.addStep("*** Clicked on destination table search field ***");
        await io.homePage.click(selectors.flowBuilderPagePO.CLEARTEXTBUTTONPOSTGRE);
        await io.homePage.addStep("*** Clicked the 'X' button  ***");
        await io.homePage.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
        await io.homePage.addStep("*** Clicked on destination table search field ***");
        await page.getByPlaceholder('Enter the name of the table').click();
        await page.getByPlaceholder('Enter the name of the table').fill('abcdef');

        await io.assert.verifyElementDisplayedByText("Your search didn’t return any matching results. Enter the name of an existing table.", "Error message not displayed properly");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});