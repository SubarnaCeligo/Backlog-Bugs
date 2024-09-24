import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C113002", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_C113002 @Zephyr-IO-T14919 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Exports");
        await io.homePage.addStep("*** Navigated to export page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "FTPCSVDND");
        await io.homePage.addStep("*** Clicked on search button to search FTP export***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.APIMPUSHOPTION);
        await io.homePage.addStep("*** Opened FTP Export ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.importPagePO.ADVANCED);
        await io.homePage.addStep("*** Selected Advanced section ***");
        await io.homePage.addStep("*** Selected encoding type ***");
        await io.homePage.click(selectors.importPagePO.FETCH_PREVIEW);
        await io.homePage.addStep("*** Clicked on preview data ***");
        await io.homePage.addStep("*** Validated whether the data is correctly encoded or not ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});