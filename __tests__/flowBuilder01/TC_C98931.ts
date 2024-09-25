import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C98931_Verify if the the form is in tree structure when object is selected", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C98931 @Zephyr-IO-T20587 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("FLOW_DND");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
        await io.homePage.addStep("*** Clicked on Add data processor button to add transformations ***");
        await io.homePage.click(selectors.basePagePO.EXPORTTRANSFORMATION);
        await io.homePage.addStep("*** Opened transformation rules ***");
        await io.homePage.clickByText("Rules 2.0");
        await io.homePage.addStep("*** Navigated to transformation rules 2.0 ***");
        await io.homePage.addStep("Clicking on data type to change it to [object] to create parent-child rows");
        await io.homePage.addStep("*** Checked the allignment by adding multiple parent-child rows ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
    });
});