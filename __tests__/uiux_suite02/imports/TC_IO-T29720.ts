import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Test to validate that user is able to run a flow with Azure synapse import', () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
  test("@Env-All @Epic-IO-65860 @Zephyr-IO-T29720 @Priority-P2 " , async ({
    io,
    page
  }) => {
    await io.homePage.addStep("*** Navigated to home page ***");
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "AzureImportFlowDND");
    await io.homePage.addStep("*** Searched for the integration ***");
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText("Standalone flows");
    await io.homePage.addStep("*** Opened the integration ***");
    await io.homePage.clickByText("AzureImportFlowDND");
    await io.homePage.addStep("*** Opened the flow ***");
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.addStep("*** Ran the flow ***");
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.addStep("*** Navigated to home page ***");

  });
});
