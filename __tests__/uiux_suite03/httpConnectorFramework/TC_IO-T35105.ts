import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T35105 @Zephyr-IO-T35103 @Zephyr-IO-T35090 @Zephyr-IO-T35092'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-76800 @Priority-P2 @Env-All @Zephyr-IO-T35105 @Zephyr-IO-T35103 @Zephyr-IO-T35090 @Zephyr-IO-T35092'", async ({ io, page }) => {
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
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE ANALYTICS WAREHOUSE OFFLINE CONNECTION - Offline');
        await io.flowBuilder.clickByText("NETSUITE ANALYTICS WAREHOUSE OFFLINE CONNECTION - Offline");
        await io.flowBuilder.loadingTime();

        //IO-T35105 Verify the message when api failed to fetch the table
        await io.flowBuilder.click(selectors.importPagePO.REFRESH_BUTTON);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.DESTINATION_TABLE_INPUT);
        const helpText = await io.flowBuilder.isVisible('text="Unable to retrieve table list. Enter a new query or refresh the  page."');
        await io.assert.expectToBeTrue(helpText, "Message text is not displayed.");
        await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);

        //IO-T35103 Verify by entering full table name and copy pasting the full table name in destination table
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE ANALYTICS WAREHOUSE CONNECTION');
        await io.flowBuilder.clickByText("NETSUITE ANALYTICS WAREHOUSE CONNECTION");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.importPagePO.DESTINATION_TABLE_INPUT, "ADMIN.ALLDATATYPES2");
        const value = await io.flowBuilder.isVisible('text="ALLDATATYPES2"');
        await io.assert.expectToBeTrue(value, "Search filter not returning the correct table name.");


        //IO-T35090 Primary Keys, it's a multi select field, so selecting multiple options, removing few of them, adding new options, removing all of them, checking if user is able to scroll the dailog box to select any next page view options etc.
        await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clearTextValue(selectors.importPagePO.DESTINATION_TABLE_INPUT);
        await io.signInPage.clickByText('ALLDATATYPES3');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.PRIMARY_KEY_PLACEHOLDER);
        await io.signInPage.clickByText('MYDATE');
        await io.signInPage.clickByText('MYFLOAT');
        await io.signInPage.clickByText('MYINTEGER');
        await io.signInPage.clickByText('MYCHAR');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.MYINTEGER);
        const myInt = await io.flowBuilder.isVisible('text="MYINTEGER"');
        await io.assert.expectToBeFalse(myInt, "MYINTEGER primary key is displayed.");
        await io.flowBuilder.click(selectors.importPagePO.MYDATE); //MYDATE
        await io.flowBuilder.click(selectors.importPagePO.MYFLOAT); //MYFLOAT
        await io.flowBuilder.click(selectors.importPagePO.MYCHAR); //MYCHAR
        await io.flowBuilder.loadingTime();
        expect(await page.locator(selectors.importPagePO.PRIMARY_KEY_PLACEHOLDER)).toBeVisible();
        await io.connectionPage.addStep("Verified user is able to remove the primary keys.");

        //IO-T35092 include Save button validations, when user is selecting the new option on the NSAW import and saving the Import doc. Similarly Save & Close, Discard
        await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
        await io.flowBuilder.click(selectors.importPagePO.PRIMARY_KEY_PLACEHOLDER);
        await io.signInPage.clickByText('MYDATE');
        await io.signInPage.clickByText('MYCHAR');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.DISCARD_CHANGES, 'Discard changes button is not displayed.');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SAVE_CHANGE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click('[aria-label="Remove MYDATE"]');
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click('[aria-label="Remove MYCHAR"]'); //MYCHAR
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.assert.verifyElementDisplayedByText("DESTINATIONS & LOOKUPS", "Page not re-directing properly")

    });
});