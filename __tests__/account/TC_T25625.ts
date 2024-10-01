import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T25625", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T25625 @Env-All @Priority-P2 @Zephyr-IO-T25625", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Exports");
        await io.homePage.addStep("*** Navigated back to import page ***");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on create import***");
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "LOOP");
        await io.homePage.addStep("*** Searched for FTP application ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Loop Returns")
        await io.homePage.addStep("*** Selected loop returns application ***");
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "loop");
        await io.homePage.addStep("*** Searched for loop return CONNECTION ***");
        await io.homePage.clickByText('LOOP RETURN WITHOUT API VERSION');
        await io.homePage.addStep("*** Selected LOOP return CONNECTION ***");
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our import ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Opened the export ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.flowBuilder.clickByText("Allowlist")
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.flowBuilder.clickByText("List allowlist items")
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});