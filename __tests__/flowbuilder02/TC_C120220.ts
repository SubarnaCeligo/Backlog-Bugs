import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C120220,C120111,C120110,C120109,C120108,C120107,C120105,C120104,C120103,C120102", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T10099 @Zephyr-IO-T10097 @Zephyr-IO-T10096 @Zephyr-IO-T10095 @Zephyr-IO-T10094 @Zephyr-IO-T10093 @Zephyr-IO-T10092 @Zephyr-IO-T10091 @Zephyr-IO-T10090 @Zephyr-IO-T10089 @Env-All @Priority-P2 ", async ({ io, page }) => {
        await io.homePage.loadingTime();
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(
          selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
        );
        await io.flowBuilder.click(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD );
        await io.flowBuilder.clickByText('MariaDB');
        await io.flowBuilder.clickByText("Import records into destination application");
       // await io.flowBuilder.clickByText('Create from scratch');
       await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);

        await io.flowBuilder.clickByText("MariaDBCred");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
        await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "MariaDB");
        await io.assert.checkElementState(selectors.flowBuilderPagePO.BULKINSERTPOSTGRE,'isChecked');
        await io.assert.verifyElementDisplayedByText("Use bulk insert SQL query (recommended)", "option is not displayed");
        await io.assert.verifyElementDisplayedByText("Use SQL query once per record", "option is not visible");
        await io.assert.verifyElementDisplayedByText("Use SQL query once per page of records", "option is not visible");
        await io.assert.verifyElementDisplayedByText("Use SQL query on first page only", "Option not displayed");
        await io.assert.verifyElementDisplayedByText("Destination table *", "Destination table is not added");
        await io.flowBuilder.clickByText("Advanced");
        await io.assert.verifyElementDisplayedByText("Batch size","Batch size field is not displayed");
        await io.homePage.addStep("**Batch size field is verified***");  
        await io.assert.checkElementState(selectors.flowBuilderPagePO.REFRESHBUTTONPOSTGRE, 'isVisible');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.POSTGREAFEEDITOR);
        await io.assert.verifyElementDisplayedByText("AFE 2.0","Not Naviaged to AFE Editor");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.homePage.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
        await io.homePage.addStep("*** Clicked on destination table search field ***");
        await io.flowBuilder.clickByText("Automation");
        await io.homePage.addStep("*** Verified we are getting 'componentTestsDB.Automation' as table name ***");
        await io.homePage.click(selectors.flowBuilderPagePO.CLEARTEXTBUTTONPOSTGRE);
        await io.homePage.addStep("*** Clicked the 'X' button  ***");
        await io.homePage.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
        await io.homePage.addStep("*** Clicked on destination table search field ***");
        await page.getByPlaceholder('Enter the name of the table').click();
        await page.getByPlaceholder('Enter the name of the table').fill('abcdef');

        await io.assert.verifyElementDisplayedByText("Your search didn’t return any matching results. Enter the name of an existing table.", "Error message not displayed properly");
        
        
    });
});