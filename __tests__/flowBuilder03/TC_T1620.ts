import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T1620_Verify the Export/Import Hooks Helptext on Netsuite Export/Import", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T1620 @Zephyr-IO-T1620 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "BacklogAutomationCases_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("BacklogAutomationCases_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("IO-T1620_DND");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.exportsPagePO.EXPORT_HOOKS);
        await io.homePage.addStep("*** Clicked on export hook on netsuite export ***");
        await io.homePage.click(selectors.flowGroupingPagePO.HELPTEXT_NS);
        await io.homePage.addStep("*** cliked on help text of suite app hook ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "BacklogAutomationCases_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("BacklogAutomationCases_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("IO-T1620_DND");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
        await io.homePage.addStep("*** Clicked on import hook on netsuite import ***");
        await io.homePage.click(selectors.flowGroupingPagePO.HELPTEXT_NS);
        await io.homePage.addStep("*** cliked on help text of suite app hook ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
    });
});