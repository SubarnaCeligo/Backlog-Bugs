import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T29693_T29696_Test to validate that user is able to run a flow with Azure synapse export", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-65860 @Priority-P2 @Zephyr-IO-T29693 @Zephyr-IO-T29696 @Env-All", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("synapse_export_flow_run_DND");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.assert.expectToBeTrue(await (await page.$(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION)).isVisible(), "Transaformation rules are not visible");
        await io.homePage.click(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.homePage.addStep("*** Ran the flow ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
    });
});