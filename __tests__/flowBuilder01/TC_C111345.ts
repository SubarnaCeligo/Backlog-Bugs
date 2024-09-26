import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C111345", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_C111345 @Env-All @Priority-P2 @Zephyr-IO-T8867", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Imports");
        await io.homePage.addStep("*** Navigated back to import page ***");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on create import***");
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "PostgreSQL");
        await io.homePage.addStep("*** Searched for PostgreSQL application ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.POSTGRESQL_APPLICATION);
        await io.homePage.addStep("*** Selected PostgreSQL application ***"); 
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "POSTGRESQL CONNECTION");
        await io.homePage.addStep("*** Searched for POSTGRESQL CONNECTION ***");
        await io.homePage.clickByText('POSTGRESQL CONNECTION');
        await io.homePage.addStep("*** Selected POSTGRESQL CONNECTION ***");
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our import ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Opened the import ***");
        await io.homePage.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
        await io.homePage.addStep("*** Clicked on destination table search field ***");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATIONTABLE_PLACEHOLDER, "Agent");
        await io.homePage.clickByText('Agent');
        await io.homePage.addStep("*** Verified we are getting Agent in table by clicking ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});