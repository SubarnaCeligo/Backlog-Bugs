import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_sagna123 TC_T29677_Test to validate user is able to 'Name your export', 'Connection', 'Description' fields inside General section with '?' help text icon and with correct help text", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-65860 @Priority-P2 @Zephyr-IO-T29677 @Env-All", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Exports");
        await io.homePage.addStep("*** Navigated back to export page ***");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on create export***");
        await io.homePage.click(selectors.connectionsPagePO.AZURE_SYNAPSE);
        await io.homePage.addStep("*** Clicked on Azure synapse connection ***");
       await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.homePage.addStep("*** Clicked on connection dropdown ***");
        await io.homePage.clickByText("AZURE SYNAPSE CONNECTOR");
        await io.homePage.addStep("*** Selected the connection ***");
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our export ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Opened the export ***");
        await io.flowBuilder.click(selectors.exportsPagePO.NAME_HELP_TEXT);
        await io.homePage.addStep("*** Checked name field help text  ***");
        await io.flowBuilder.click(selectors.exportsPagePO.NAME_HELP_TEXT);
        await io.homePage.addStep("*** Checked name field help text  ***");
        await io.flowBuilder.click(selectors.exportsPagePO.DESCRIPTION_HELP_TEXT);
        await io.homePage.addStep("*** Checked description field help text ***");
        await io.flowBuilder.click(selectors.exportsPagePO.DESCRIPTION_HELP_TEXT);
        await io.homePage.addStep("*** Checked description field help text ***");
        await io.homePage.waitForElementAttached(selectors.exportsPagePO.CONNECTION_HELP_TEXT)
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTION_HELP_TEXT);
        await io.homePage.addStep("*** Checked connection field help text ***");
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTION_HELP_TEXT);
        await io.homePage.addStep("*** Checked connection field help text ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});