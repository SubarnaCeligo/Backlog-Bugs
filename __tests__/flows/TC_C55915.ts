import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C55915 Verify the Visibility of 'Pendo-Zendesk chat bot' in the integrator.io", () => {
    test("C55915 Verify the Visibility of 'Pendo-Zendesk chat bot' in the integrator.io", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.HELP_ICON)
        const helpIconVisible = await io.homePage.isVisible(selectors.basePagePO.HELP_ICON);
        expect(helpIconVisible).toBe(true);
    });
})