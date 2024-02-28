import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C108700_hotspot_icons_on_exp_imp_imputfilter_for_multiple_exports", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C108700", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("Flowwithtwoexports_DND");
        await io.homePage.addStep("*** Opened the flow with multiple exports ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.homePage.addStep("*** Clicked on run button in test mode ***");
        await io.flowBuilder.delay(10000);
        await io.homePage.addStep("*** Waiting flow  to get completed ***");
        await io.homePage.addStep("*** Flow ran successfully ***");
        const Symbol = await page.$(selectors.flowBuilderPagePO.TRANSFER);
        expect(await Symbol.screenshot()).toMatchSnapshot("C108670export.png");
        await io.homePage.addStep("*** Checked the 'T' icon on only first export using screenshot ***");
        const Symbol1 = await page.$(selectors.flowBuilderPagePO.INPUT_FILTER);
        expect(await Symbol1.screenshot()).toMatchSnapshot("C108670inpfil.png");
        await io.homePage.addStep("*** Checked the 'T' icon on inputfilter using screenshot ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});