import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T26946_Test to verify the layout for 3 options without enabling AI chatbot both in production and sandbox", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T26946 @Zephyr-IO-T26946 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL); 
        await io.myAccountPage.addStep("*** Navigated to my account page ***");
        await io.flowBuilder.click(selectors.basePagePO.ENABLEAICHATBOT);
        await io.myAccountPage.addStep("*** Clicked on enable AI chatbot to disable celigo AI ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Playground");
        await io.homePage.addStep("*** Navigated back to playground page ***");
        await io.homePage.clickByText('XML parser helper');
        await io.homePage.addStep("*** Clicked on XML parser editor ***");
        await io.homePage.clickByText('XML parser');
        await io.homePage.addStep("*** Navigated to XML parser section ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.COMPACT_VIEW);
        await io.homePage.addStep("*** Clicked on compact view one of the 3 options which is available  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.COLUMN_VIEW);
        await io.homePage.addStep("*** Clicked on column view one of the 3 options which is available  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.ROW_VIEW);
        await io.homePage.addStep("*** Clicked on row view one of the 3 options which is available  ***");
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL); 
        await io.myAccountPage.addStep("*** Navigated to my account page ***");
        await io.flowBuilder.click(selectors.basePagePO.ENABLEAICHATBOT);
        await io.myAccountPage.addStep("*** Clicked on enable AI chatbot to enable celigo AI ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});