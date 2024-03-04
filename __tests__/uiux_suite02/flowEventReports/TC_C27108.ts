import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27108_Run Report drawer - ‘Child integrations’ cannot be a required field", () => {
    test("C27108_Run Report drawer - ‘Child integrations’ cannot be a required field", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Reports");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.click(selectors.basePagePO.CHOOSEINTEGRATIONFORREPORT);
        const intID = await io.api.loadIntegrations();
        await io.flowBuilder.selectTextfromDropDown(page, intID.get('Payout to Reconciliation'))
        await io.homePage.click(selectors.basePagePO.CHOOSECHILDINTEGRATIONFORREPORT)
        // Validating child integration flows available until select child
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.FIRSTINTEGRATION, "Flows not available")
    });
});
