import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_sagna123 TC_T29679_Test to validate user is able to see 'SQL query' field under 'What would you like to export?' section with '?' help text icon and correct help text", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-65860 @Priority-P2 @Zephyr-IO-T29679 @Env-All", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Exports");
        await io.homePage.addStep("*** Navigated back to export page ***");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on create export***");
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "Microsoft Azure synapse");
        await io.homePage.click(selectors.connectionsPagePO.AZURE_SYNAPSE);
        await io.homePage.addStep("*** Clicked on Azure synapse connection ***");
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'AZURE SYNAPSE CONNECTOR');
        await io.homePage.addStep("*** Clicked on connection dropdown ***");
        await io.homePage.clickByText("AZURE SYNAPSE CONNECTOR");
        await io.homePage.addStep("*** Selected the connection ***");
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our export ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Opened the export ***");
        await io.flowBuilder.click(selectors.exportsPagePO.SQLQUERY_HELP_TEXT);
        await io.homePage.addStep("*** Checked SQL QUERY field help text ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});