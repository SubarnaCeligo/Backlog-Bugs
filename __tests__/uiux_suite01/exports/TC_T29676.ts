import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_sagna123 TC_T29676_Test to validate user is able to see sections like 'General', 'What would you like to export?', 'Configure export type' , 'Would you like to group records'. 'Mock output', 'Advanced' on export page and all are expandable and collapsable", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-65860 @Priority-P2 @Zephyr-IO-T29676 @Env-All", async ({ io, page }) => {
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
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.homePage.addStep("*** Clicked on GENERAL section ***");
        await io.flowBuilder.click(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.homePage.addStep("*** Clicked on What would you like to export? section ***");
        await io.flowBuilder.click(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE);
        await io.homePage.addStep("*** Clicked on Configure export type section ***");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD);
        await io.homePage.addStep("*** Clicked on Would you like to group records? section ***");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
        await io.homePage.addStep("*** Clicked on Mock output section ***");
        await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
        await io.homePage.addStep("*** Clicked on Advanced section ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});