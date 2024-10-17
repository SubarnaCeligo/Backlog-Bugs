import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T39215_Test to validate user is able to switch between different env's created", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T39215 @Zephyr-IO-T39215 @Env-COREDEV @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.clickByText("Production")
        await io.homePage.addStep("*** Clicked on Environment dropdown ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.clickByText("Non production environment")
        await io.homePage.addStep("*** Navigated to Non prod env ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.homePage.addStep("*** Navigated to account page in Non prod env ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.clickByText("Non production environment")
        await io.homePage.addStep("*** Clicked on Environment dropdown ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.clickByText("Production")
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.addStep("*** Navigated to back to prod env ***");
        await io.homePage.addStep("*** Verified Navigation from Prod to Non Prod and Non prod to Prod ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});