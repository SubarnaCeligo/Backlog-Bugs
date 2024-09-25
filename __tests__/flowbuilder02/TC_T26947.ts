import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_T26947_TTest to verify the layout toggle addition and saving functionality in sandbox environment", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T26947 @Zephyr-T26947 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
        await io.homePage.addStep("*** Navigated to Sandbox Env ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Playground");
        await io.homePage.addStep("*** Navigated back to playground page ***");
        await io.homePage.clickByText('CSV parser helper');
        await io.homePage.addStep("*** Clicked on CSV parser editor ***");
        await io.homePage.clickByText('Simple CSV');
        await io.homePage.addStep("*** Navigated to simple CSV section ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.ROW_VIEW);
        await io.homePage.addStep("*** Clicked on compact view one of the 3 options which is available  ***");
        await io.homePage.clickByText('CSV parser helper');
        await io.homePage.addStep("*** Closed CSV parser editor ***");
        await io.homePage.clickByText('SQL query builder');
        await io.homePage.addStep("*** Clicked on SQL QUERY editor ***");
        await io.homePage.clickByText('Simple SQL query');
        await io.homePage.addStep("*** Navigated to Simple SQL query section ***");
        await io.homePage.clickByText('CSV parser helper');
        await io.homePage.addStep("*** Clicked on CSV parser editor ***");
        await io.homePage.clickByText('Simple CSV');
        await io.homePage.addStep("*** Navigated to simple CSV section ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.assert.verifyElementIsDisplayed(
            selectors.playgroundPO.SELECTED_ROW_VIEW,
            "Layout is not saved as row view"
          );
        await io.homePage.addStep("*** Verified that row view only present in CSV editor ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
        await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.addStep("*** Navigated to Production Env ***");
    });
});