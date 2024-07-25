import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('T17049 Verify the connection form for DIY integration', () => {
    test('@Zephyr-IO-T17049 @Env-All @Priority-P2 T17049 Verify the connection form for DIY integration', async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();

        await io.homePage.addStep('*** Navigating to Marketplace and search for Asana - NetSuite ***');
        await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE);
        await io.homePage.goToMenu("Marketplace");
        await io.homePage.loadingTime();
        await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, "Asana - NetSuite");
        await io.homePage.loadingTime();

        await io.homePage.addStep('*** Installing the template ***');
        await io.homePage.click(selectors.flowGroupingPagePO.INSTALLTEMPLATE);
        await io.homePage.clickByText("Install now");

        await io.homePage.addStep('*** Configuring the connection ***');
        await io.homePage.clickByTextByIndex("Configure", 0);
        const simpleFormToggle = page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);

        await io.homePage.addStep('*** Verifying that simple connection form is shown ***');
        expect(simpleFormToggle).toHaveAttribute("aria-pressed", "true");

        await io.homePage.addStep('*** Uninstalling the template ***');
        await io.homePage.click(selectors.basePagePO.CLOSE);
        await io.homePage.clickByText("Uninstall");
    });
});