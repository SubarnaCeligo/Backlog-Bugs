import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_sagna123 TC_T29683_T29684_Test to validate user is able to see 'Group records by fields' under 'Would to like to group records' section with '?' help text icon and correct help text", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-65860 @Priority-P2 @Zephyr-IO-T29683 @Zephyr-IO-T29684 @Env-All", async ({ io, page }) => {
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
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD);
        await io.homePage.addStep("*** Clicked on Would you like to group records? section ***");
        await io.flowBuilder.click(selectors.exportsPagePO.GROUP_BY_FIELDS_HELP_TEXT);
        await io.homePage.addStep("*** Checked group by fields help text ***");
        await io.flowBuilder.click(selectors.exportsPagePO.GROUP_BY_FIELDS_HELP_TEXT);
        await io.homePage.addStep("*** Checked group by fields help text ***");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD_INPUT,
            "test"
        );
        await io.homePage.addStep("*** Typed in the group by records field ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});