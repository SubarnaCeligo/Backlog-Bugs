import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_sagna123 TC_T29688_T29689_Test to validate 'Data URI template', 'Override trace key template' fields are handle bar fields", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-65860 @Priority-P2 @Zephyr-IO-T29688 @Zephyr-IO-T29689 @Env-All", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Exports" );
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
        await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
        await io.homePage.addStep("*** Clicked on Advanced section ***");
        await io.flowBuilder.click(selectors.exportsPagePO.PAGE_SIZE_HELP_TEXT);
        await io.homePage.addStep("*** Checked page size help text ***");
        await io.flowBuilder.click(selectors.exportsPagePO.PAGE_SIZE_HELP_TEXT);
        await io.homePage.addStep("*** Checked page size help text ***");
        await io.flowBuilder.click(selectors.exportsPagePO.DATA_URI_TEMPLATE_HELP_TEXT);
        await io.homePage.addStep("*** Checked DATA URI template help text ***");
        await io.flowBuilder.click(selectors.exportsPagePO.DATA_URI_TEMPLATE_HELP_TEXT);
        await io.homePage.addStep("*** Checked DATA URI template help text ***");
        await io.flowBuilder.click(selectors.exportsPagePO.OVERRIDE_KEY_TEMPLATE_HELP_BUBBLE);
        await io.homePage.addStep("*** Checked Override trace key template help text ***");
        await io.flowBuilder.click(selectors.exportsPagePO.OVERRIDE_KEY_TEMPLATE_HELP_BUBBLE);
        await io.homePage.addStep("*** Checked Override trace key templat  help text ***");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATAURITEMPLATE);
        await io.homePage.addStep("*** Clicked on DATAURI template handle bar ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});