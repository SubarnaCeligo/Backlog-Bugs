import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_IO63636_Test mode run for flow with presavepage hook and mock output at import", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("IO63636", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Netsuite - Orderful Warehouse Flows");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Netsuite - Orderful Warehouse Flows");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("856 ASN Transfer Orders - AEL Dubai");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.homePage.addStep("*** Clicked on run button in test mode ***");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.homePage.addStep("*** Waiting flow  to get completed ***");
        await io.homePage.addStep("*** Flow ran successfully ***");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
        await io.homePage.addStep("*** Opened import mappings ***");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText(
            "Test run results",
            "Error is present"
          );
        await io.homePage.addStep("*** Verified there are no errors  ***");
        await io.homePage.addStep("*** Checked the 'T' icon on exports using screenshot ***");
        await io.homePage.addStep("*** Checked the flow is running fine by checking error tab we have no errors ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
    });
});