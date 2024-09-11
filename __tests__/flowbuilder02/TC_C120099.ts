import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C120099", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T10086 @Env-All @Priority-P2 ", async ({ io, page }) => {
        await io.homePage.loadingTime();
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(
            selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
        );
        await io.flowBuilder.click(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD);
        await io.flowBuilder.clickByText('MariaDB');
        await io.flowBuilder.clickByText("Import records into destination application");
         await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.clickByText("MariaDBCred");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
        await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "MariaDB");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Clicked on destination table search field ***");
        await io.flowBuilder.clickByText("Automation");
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 2);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText('Auto-populate destination fields', "Field is not displayed properly");
        await io.flowBuilder.clickByText("Auto-populate destination fields");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_AUTOPOPULATE_MESSAGE_POPUP);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SETTINGS_MARIADB, 3);
        await io.flowBuilder.clickByText("Standard");
        await io.flowBuilder.clickByText("Handlebars expression");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText("Please select")
        const dropdownVAlue = await io.flowBuilder.isVisible("text='Do nothing'");
        await io.assert.expectToBeFalse(dropdownVAlue, "'Do nothing'  dropdown option is not displayed");


    });
});