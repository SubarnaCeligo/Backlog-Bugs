import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T35083 @Zephyr-IO-T35086 @Zephyr-IO-T35087 @Zephyr-IO-T35088 @Zephyr-IO-T35093 @Zephyr-IO-T35099 @Zephyr-IO-T35104'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-76800 @Priority-P2 @Env-QA @Zephyr-IO-T35083 @Zephyr-IO-T35086 @Zephyr-IO-T35087 @Zephyr-IO-T35088 @Zephyr-IO-T35093 @Zephyr-IO-T35099 @Zephyr-IO-T35104'", async ({ io, page }) => {
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();

        //ADD IMPORT
        await io.flowBuilder.click(selectors.mappings.ADD_IMPORT);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'NSAW');
        await io.flowBuilder.click(selectors.connectionsPagePO.NSAW_CONNECTION);
        await io.myAccountPage.clickByText("Import records into destination application");
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.loadingTime();
        await io.importsPage.fill(selectors.importPagePO.NAME_INPUT, "NSAW IMPORT");
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE ANALYTICS WAREHOUSE CONNECTION');
        await io.flowBuilder.clickByText("NETSUITE ANALYTICS WAREHOUSE CONNECTION");
        await io.flowBuilder.loadingTime();


        //IO-T35083 Verify when user click on the refresh icon of 'Primary keys,
        await io.flowBuilder.click(selectors.importPagePO.DESTINATION_TABLE_INPUT);
        await io.signInPage.clickByText('ALLDATATYPES3');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.PRIMARY_KEY_PLACEHOLDER);
        await io.signInPage.clickByText('MYDATE');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByIndex(selectors.importPagePO.CLEAR_TEXT_BUTTON, 1);
        await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE);
        expect(await page.locator(selectors.importPagePO.PRIMARY_KEY_PLACEHOLDER)).toBeVisible();
        await io.connectionPage.addStep("Verified when user click on the refresh icon of 'Primary keys'");

        //IO-T35084 Verify when user toggles between different Query types, like if they go from ‘Use optimized bulk load (recommended for larger imports))' to ‘Use SQL query once per record’ and then again come back to the new option( ‘Use optimized bulk load (recommended)
        await io.flowBuilder.fill(selectors.importPagePO.DESTINATION_TABLE_INPUT, "HISTORY");
        await io.signInPage.clickByTextByIndex('APEX$ARCHIVE_HISTORY', 0);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.MARIADB_INSERT_BULK);
        await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);

        //IO-T35086 Verify when the user clears the destination table, then verify primary keys.
        await io.homePage.clickButtonByIndex(selectors.importPagePO.CLEAR_TEXT_BUTTON, 0);
        //Primary key placeholder
        expect(await page.locator(selectors.importPagePO.PRIMARY_KEY_PLACEHOLDER)).toBeVisible();
        await io.connectionPage.addStep("Verified when the user clears the destination table the primary keys will be cleared too");

        //IO-T35087 Verify when the user writes a handlebar text in the ‘Destination table’ for the new query type ‘Use optimized bulk load (recommended for larger imports).
        await io.flowBuilder.fill(selectors.importPagePO.DESTINATION_TABLE_INPUT, '{{handlebarText}}');
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
        await io.flowBuilder.fill(selectors.importPagePO.PRIMARY_KEY_INPUT, 'randomText');
        await io.flowBuilder.clickByText('Add "randomText"');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
        expect(await page.locator(selectors.importPagePO.PRIMARY_KEY_PLACEHOLDER)).not.toBeVisible();
        await io.connectionPage.addStep("Verified We will allow the user to add primary keys which are not in the dropdown manually.");


        //IO-T35088 when user choose ‘Destination table’ values from dropdown , then verify if user is able to add primary keys manually
        await io.homePage.clickButtonByIndex(selectors.importPagePO.CLEAR_TEXT_BUTTON, 0);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.DESTINATION_TABLE_INPUT);
        await io.signInPage.clickByText('ALLDATATYPES3');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.importPagePO.PRIMARY_KEY_INPUT, 'randomText');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
        await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
        expect(await page.locator(selectors.importPagePO.PRIMARY_KEY_PLACEHOLDER)).toBeVisible();
        await io.connectionPage.addStep("Verified when user choose ‘Destination table’ values from dropdown,user will have to choose primary key from dropdown only. They can’t add any Primary key.");


        //IO-T35093 Switching to other Query Type from Bulk Load, the dependent fields should also be changed. And vice-versa.
        await io.homePage.click(selectors.importPagePO.MARIADB_PER_RECORD);
        await io.assert.verifyElementNotBeFound(selectors.importPagePO.PRIMARY_KEY);
        await io.assert.verifyElementNotBeFound(selectors.importPagePO.DESTINATION_TABLE_INPUT);
        await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.PRIMARY_KEY, "Primary key is not displayed");
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.DESTINATION_TABLE_INPUT, "Destination table is not displayed");


        // T35099 - Verify if refresh icon is added against the Destination table field so that the users can refresh and fetch the latest list of tables available.
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.REFRESH_BUTTON, "Refresh button is not displayed");

        // T35104 - VVerify if user is able to clear the table name via backspace or by clicking on 'x'
        await page.pause();
        await io.homePage.click(selectors.importPagePO.CLEAR_TEXT_BUTTON);
        await io.assert.verifyElementAttributeContainsText(
            selectors.importPagePO.DESTINATION_TABLE_INPUT,
            "value",
            ""
        );

    });
});