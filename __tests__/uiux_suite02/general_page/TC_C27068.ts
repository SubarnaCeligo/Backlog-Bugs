import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Author-Sudhanshukumar C27068 Verify the application name is appended into the URL", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All C27068 @Epic-IO-52851 @Zephyr-IO-T27068 @Zephyr-IO_T27072 @Zephyr-IO_T27069 @Zephyr-IO_T27070 @Zephyr-IO_T27071 @Env-All Verify the application name is appended into the URL", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON);
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        // Imports in Resources IO-T27072
        await io.homePage.goToMenu("Resources", "Imports");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
        await io.importsPage.click(selectors.homePagePO.SEARCH_INTEGRATION);
        await io.importsPage.fill(selectors.homePagePO.SEARCH_INTEGRATION, "NS Import");
        await io.importsPage.loadingTime();
        await io.importsPage.clickByIndex(selectors.flowBuilderPagePO.CONNECTION_TABLE, 0);
        await io.importsPage.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.HELP_TEXT_ICON, "HELP TEXT ICON is not displayed");
        const importUrl = await io.homePage.getCurrentUrl();
        await io.assert.expectToContainValue("?app=netsuite", importUrl, "Appended URL not present")
        await io.importsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        //IO-T27069
        await io.importsPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.importsPage.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
        await io.importsPage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, "Amazon Redshift");
        await io.importsPage.click(selectors.flowBuilderPagePO.REDSHIFT);
        await io.importsPage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.importsPage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'AMAZON REDSHIFT CONNECTION');
        await io.importsPage.clickByText('AMAZON REDSHIFT CONNECTION');
        await io.importsPage.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "Amazon Redshift");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.loadingTime();
        const importCreateUrl = await io.homePage.getCurrentUrl();
        await io.assert.expectToContainValue("?app=redshiftdatawarehouse", importCreateUrl, "Appended URL not present")
        await io.importsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);

        // Exports in Resources
        await io.homePage.goToMenu("Resources", "Exports");
        await io.exportsPage.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
        await io.exportsPage.click(selectors.homePagePO.SEARCH_INTEGRATION);
        await io.exportsPage.fill(selectors.homePagePO.SEARCH_INTEGRATION, "zendesk");
        await io.exportsPage.loadingTime();
        await io.importsPage.clickByText('zendesk');
        await io.exportsPage.loadingTime();
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.HELP_TEXT_ICON);
        const exportUrl = await io.homePage.getCurrentUrl();
        await io.assert.expectToContainValue("?app=http", exportUrl, "Appended URL not present")
        await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        //IO-T27070 
        await io.exportsPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
        await io.exportsPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Google BigQuery');
        await io.exportsPage.click(selectors.flowBuilderPagePO.GOOGLE_BIGQUERY);
        await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.exportsPage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'BIGQUERY CONNECTION');
        await io.exportsPage.clickByText('BIGQUERY CONNECTION');
        await io.exportsPage.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "BIGQUERY");
        await io.exportsPage.click(selectors.basePagePO.SAVE);
        await io.exportsPage.loadingTime();
        const exportCreateUrl = await io.homePage.getCurrentUrl();
        await io.assert.expectToContainValue("?app=bigquerydatawarehouse", exportCreateUrl, "Appended URL not present")
        await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        // Connections in Resources IO-T27071
        await io.homePage.goToMenu("Resources", "Connections");
        await io.flowBuilder.loadingTime();
        await io.exportsPage.click(selectors.homePagePO.SEARCH_INTEGRATION);
        await io.exportsPage.fill(selectors.homePagePO.SEARCH_INTEGRATION, "SHOPIFY CONNECTION");
        await io.exportsPage.loadingTime();
        await io.exportsPage.clickByText('SHOPIFY CONNECTION');
        await io.exportsPage.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.HELP_TEXT_ICON);
        const connectionUrl = await io.homePage.getCurrentUrl();
        await io.assert.expectToContainValue("?app=shopify", connectionUrl, "Appended URL not present")
        await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        //IO-T27068 
        await io.exportsPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Microsoft SQL');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MICROSOFT_SQL);
        const connectionCreateUrl = await io.homePage.getCurrentUrl();
        await io.assert.expectToContainValue("?app=mssql", connectionCreateUrl, "Appended URL not present")
        await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    });
});



