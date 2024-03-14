import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_IO50904", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_IO50904", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Imports");
        await io.homePage.addStep("*** Navigated back to import page ***");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on create import***");
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "MySQL");
        await io.homePage.addStep("*** Searched for MySQL application ***");
        await io.homePage.clickByText('MySQL');
        await io.homePage.addStep("*** Selected MySQL application ***");
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "MYSQL CONNECTION");
        await io.homePage.addStep("*** Searched for MySQL connection ***");
        await io.homePage.clickByText('MYSQL CONNECTION');
        await io.homePage.addStep("*** Selected MySQL connection ***");
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our import ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Opened the handlebar expression inside import and we can see keyboard icon  ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});