import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T11716", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T11716 @Env-All @Priority-P2 @Zephyr-IO-T11716", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Imports");
        await io.homePage.addStep("*** Navigated back to import page ***");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on create import***");
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "FTP");
        await io.homePage.addStep("*** Searched for FTP application ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.homePage.addStep("*** Selected PostgreSQL application ***");
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "FTP CONNECTION");
        await io.homePage.addStep("*** Searched for FTP CONNECTION ***");
        await io.homePage.clickByText('FTP CONNECTION');
        await io.homePage.addStep("*** Selected FTP CONNECTION ***");
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our import ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Opened the import ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FILEBATCHSIZEHELPTEXT)
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});