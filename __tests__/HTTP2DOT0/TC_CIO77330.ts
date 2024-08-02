import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(" @Author-Revathi-D TC_CIO77330 Support bulk API cases", () => {
    test("@Zephyr-IO-T32342 @Zephyr-IO-T32343 @Zephyr-IO-T3344 @Zephyr-IO-T32345 @Zephyr-IO-T32346 @Zephyr-IO-T32349 @Zephyr-IO-T32341 @Zephyr-IO-T31956  @Epic-IO-72165 @Priority-P2 @Env-QA Support bulk API cases", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.clickByText("Create");
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
        await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Salesforce');
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.SALESFORCE_IMPORT);
        await io.homePage.click(selectors.importPagePO.SALESFORCE_IMPORT);
        await io.flowBuilder.click(selectors.mappings.LOOKUP_RECORD);
        await io.flowBuilder.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.fill(selectors.importPagePO.NAME, 'SFLOOKUP');
        await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.clickByText("SALESFORCE");
        const isChecked2 = await page.isChecked(selectors.exportsPagePO.SALESFORCE_INCLUDE_AND_ARCHIVED_RECORDS);
        expect(isChecked2).toBe(false);

        await io.flowBuilder.click(selectors.exportsPagePO.SALESFORCE_INCLUDE_AND_ARCHIVED_RECORDS_HELP_TEXT_ICON);
        await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.HELP_BUBBLE);
        const helptext2 = (await io.flowBuilder.getText(
            selectors.myAccountPagePO.HELP_BUBBLE
        )) as string;
        console.log("text", helptext2);
        await io.assert.expectToContainValue(
            `Check this to include archived and deleted records in your query results.`,
            helptext2,
            "helptext not found"
        );
        await io.flowBuilder.fill(selectors.exportsPagePO.SALESFORCE_SOQL_QUERY, 'select Name from Account');
        await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.REDSHIFT_SELECTED_EXPORT_RECORDS);
       await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
       await io.homePage.loadingTime();
        //second scenario
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.homePage.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
        await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Salesforce');
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.SALESFORCE_IMPORT);
        await io.homePage.click(selectors.importPagePO.SALESFORCE_IMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
        await io.flowBuilder.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.importPagePO.NAME, 'SFEXPORT1');
        await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
       await io.flowBuilder.clickByText("SALESFORCE");
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.SALESFORCE_API_TYPE_REST_RADIO);
        await io.homePage.loadingTime();
        const isChecked1 = await page.isChecked(selectors.exportsPagePO.SALESFORCE_INCLUDE_AND_ARCHIVED_RECORDS);
        expect(isChecked1).toBe(false);

        await io.flowBuilder.click(selectors.exportsPagePO.SALESFORCE_INCLUDE_AND_ARCHIVED_RECORDS_HELP_TEXT_ICON);
        await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.HELP_BUBBLE);
        const helptext1 = (await io.flowBuilder.getText(
            selectors.myAccountPagePO.HELP_BUBBLE
        )) as string;
        console.log("text", helptext1);
        await io.assert.expectToContainValue(
            `Check this to include archived and deleted records in your query results.`,
            helptext1,
            "helptext not found"
        );
        await io.flowBuilder.click(selectors.exportsPagePO.SALESFORCE_API_TYPE_BULK_RADIO);
        await io.flowBuilder.click(selectors.importPagePO.ADVANCED)
        await io.homePage.loadingTime();

        const isChecked = await page.isChecked(selectors.exportsPagePO.DELETE_JOB);
        expect(isChecked).toBe(true);

        await io.flowBuilder.click(selectors.exportsPagePO.DELETE_JOB_HELPTEXT);
        await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.HELP_BUBBLE);
        const helptext = (await io.flowBuilder.getText(
            selectors.myAccountPagePO.HELP_BUBBLE
        )) as string;
        await io.assert.expectToContainValue(
            `Automatically delete jobs after exportingCheck this box to automatically delete this job after it’s executed successfully in Salesforce. This helps keep your job page clean if you run jobs frequently.Was this helpful?Field path: export.salesforce.bulk.purgeJobAfterExport`,
            helptext,
            "helptext not found"
        );
        await io.flowBuilder.fill(selectors.exportsPagePO.SALESFORCE_SOQL_QUERY, 'select Name from Account');
        await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.REDSHIFT_SELECTED_EXPORT_RECORDS);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        //third scenario
        expect(await (await page.$(selectors.exportsPagePO.RUN_TEST)).getAttribute("disabled")).toEqual("");
        await io.homePage.loadingTime();
        //fourth scenario
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_GENERATOR);
        await io.homePage.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
        await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Salesforce');
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.SALESFORCE_IMPORT);
        await io.homePage.click(selectors.importPagePO.SALESFORCE_IMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
        await io.flowBuilder.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.importPagePO.NAME, 'SFEXPORT2');
        await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
       await io.flowBuilder.clickByText("SALESFORCE");
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.SALESFORCE_API_TYPE_REST_RADIO);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.exportsPagePO.SALESFORCE_SOQL_QUERY, 'select Name from Account');
        await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.REDSHIFT_SELECTED_EXPORT_RECORDS);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.RUN_TEST_EXPORTS);
        expect(await (await page.$$(selectors.exportsPagePO.RUN_TEST))[2].getAttribute("disabled")).toEqual("");
        await io.flowBuilder.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
        await io.flowBuilder.click(selectors.basePagePO.DELETE);
        await io.homePage.goToMenu("Resources", "Exports");
        await io.homePage.loadingTime();
        await io.homePage.fill(
            selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR,
            "SFEXPORT1"
          );
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.DELETE_CONNECTION);
        await io.flowBuilder.click(selectors.basePagePO.DELETE);
        await io.homePage.loadingTime();
        await io.homePage.fill(
            selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR,
            "SFEXPORT2"
          );
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.DELETE_CONNECTION);
        await io.flowBuilder.click(selectors.basePagePO.DELETE);
        await io.homePage.fill(
            selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR,
            "SFLOOKUP"
          );
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.DELETE_CONNECTION);
        await io.flowBuilder.click(selectors.basePagePO.DELETE);
       



    });

});