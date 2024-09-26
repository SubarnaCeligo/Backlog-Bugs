import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C108698_hotspot_icons_after_clicking_cancel", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C108698 @Zephyr-IO-T23957 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("FlowWithinputfilter_DND");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.homePage.addStep("*** Clicked on run button in test mode ***");
        await io.homePage.addStep("*** Waiting flow  to get started ***");
        await io.homePage.addStep("*** Flow cancelled successfully ***");
        await io.flowBuilder.delay(10000);
        const Symbol = await page.$(selectors.flowBuilderPagePO.TRANSFER);
        expect(await Symbol.screenshot()).toMatchSnapshot("C108670export.png", {maxDiffPixelRatio: 0.8 });
        await io.homePage.addStep("*** Checked the 'T' icon on exports using screenshot ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});