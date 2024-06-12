import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_sagna123 TC_T32707_Test to validate saved searches related to recordType Time are visible on UI when we select 'TimeBill' as recordType", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Bug-IO-24988 @Priority-P2 @Zephyr-IO-T32707 @Env-All", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Exports" );
        await io.homePage.addStep("*** Navigated back to export page ***");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on create export***");
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "NETSUITE" );
        await io.homePage.addStep("*** Searched for PostgreSQL application ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
        await io.homePage.addStep("*** Selected PostgreSQL application ***");
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "NETSUITE 353 CONNECTION" );
        await io.homePage.addStep("*** Clicked on connection dropdown ***");
        await io.homePage.clickByText("NETSUITE 353 CONNECTION");
        await io.homePage.addStep("*** Selected the connection ***");
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.press('/');
        await page.keyboard.press('/');
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our export ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Opened the export ***");
        await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
        await io.homePage.addStep("*** Clicked on Advanced section ***");
        await io.flowBuilder.click(selectors.exportsPagePO.NSWEBSERVICES_BUTTON);
        await io.homePage.addStep("*** Clicked on Advanced section ***");
        await io.homePage.fill(selectors.exportsPagePO.NSRECORDTYPE, "TimeBill" );
        await io.homePage.addStep("*** Clicked on recordtype dropdown ***");
        await io.homePage.clickByText("TimeBill");
        await io.homePage.addStep("*** Selected the recordType ***");
        await io.homePage.click(selectors.exportsPagePO.NSSAVEDEARCH );
        await io.homePage.addStep("*** Clicked on Saved Search dropdown ***" );
        await io.homePage.addStep("*** verified that saved search is visible ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});