import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_sagna123 TC_T29685_T29686_T29687_Test to validate user is able to see 'Mock output' field inside 'Mock output' section and it should be non mandatory, expandable and collapsable", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-65860 @Priority-P2 @Zephyr-IO-T29685 @Zephyr-IO-T29686 @Zephyr-IO-T29687 @Env-All", async ({ io, page }) => {
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
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
        await io.homePage.addStep("*** Clicked on Mock output section ***");
        await io.flowBuilder.click(selectors.exportsPagePO.MOCK_OUTPUT_HELP_TEXT);
        await io.homePage.addStep("*** Checked Mock output help text ***");
        await io.flowBuilder.click(selectors.exportsPagePO.MOCK_OUTPUT_HELP_TEXT);
        await io.homePage.addStep("*** Checked Mock output help text ***");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
        await io.homePage.addStep("*** Clicked on populate with canonical stab field ***");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN);
        await io.homePage.addStep("*** Clicked on preview mock output ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});