import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C113933", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_C113933 @Zephyr-IO-T14165 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.homePage.addStep("*** Navigated to flow builder page ***");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_GENERATOR);
        await io.homePage.addStep("*** Clicked on create export ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "FTP");
        await io.homePage.addStep("*** Searched for FTP application ***");
        await io.homePage.clickByText('FTP');
        await io.homePage.addStep("*** Clicked on FTP ***");
        await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.homePage.addStep("*** Clciked on create from scratch option ***");
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "FTP CONNECTION");
        await io.homePage.addStep("*** Searched for FTP connection ***");
        await io.homePage.clickByText('FTP CONNECTION');
        await io.flowBuilder.clearTextValue(selectors.connectionsPagePO.CONNECTION_INPUT);
        await io.homePage.addStep("*** Removed first connection ***");
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "MONITOR CONNECTION");
        await io.homePage.clickByText('MONITOR CONNECTION');
        await io.homePage.addStep("*** Selected the other connection ***");
        await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
        await io.homePage.addStep("*** Clicked on preview to know whether to came to next page or not ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
    });
});