import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C120099", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T10086 @Env-QA @Env-IAQA ", async ({ io, page }) => {

        await io.homePage.loadingTime();
        console.log(process.env["IO_UserName"])
        console.log(process.env["IO_Password"])
        await io.homePage.goToMenu("Tools", "Flow builder");
        await page.pause();
        await io.flowBuilder.click(
            selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
        );
        await io.flowBuilder.click(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD );
        await io.flowBuilder.clickByText('MariaDB');
       
        
        await io.flowBuilder.clickByText("Import records into destination application");
        await io.flowBuilder.clickByText('Create from scratch');
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.clickByText("MariaDBCred");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
        await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "MariaDB");
        await io.homePage.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
        await io.homePage.addStep("*** Clicked on destination table search field ***");
        await page.pause();
        await io.flowBuilder.clickByText("Automation");
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 2);

        await io.assert.verifyElementDisplayedByText('Auto-populate destination fields', "Field is not displayed properly");
        await io.flowBuilder.clickByText("Auto-populate destination fields");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_AUTOPOPULATE_MESSAGE_POPUP);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SETTINGS_MARIADB, 3);
        await io.flowBuilder.clickByText("Standard");
        await io.flowBuilder.clickByText("Handlebars expression");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText("Please select")
        let displaytext = false;
        try {

            (await io.assert.verifyElementDisplayedByText(
                "Do nothing",
                "'Do nothing'  dropdown option is not displayed"));
            displaytext = true;
        }
        catch (e) {
            expect(displaytext).toBeFalsy();
        }
        expect(displaytext).toBeFalsy();


    });
});