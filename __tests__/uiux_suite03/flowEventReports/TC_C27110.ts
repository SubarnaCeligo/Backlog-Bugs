import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27110_Run Report drawer - The ‘Flows’ multi-select field should show all parent level flows always, plus any child level flows based on the values selected in the optional ‘Child integrations’ multi-select", () => {
    test("@Env-All @Zephyr-IO-T4375 C27110_Run Report drawer - The ‘Flows’ multi-select field should show all parent level flows always, plus any child level flows based on the values selected in the optional ‘Child integrations’ multi-select UI_Backlog #STAGING Only", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Reports");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.click(selectors.basePagePO.CHOOSEINTEGRATIONFORREPORT);
        const intID = await io.api.loadIntegrations();
        await io.flowBuilder.selectTextfromDropDown(page, intID.get('Payout to Reconciliation'))
        await io.homePage.click(selectors.basePagePO.CHOOSECHILDINTEGRATIONFORREPORT)
        // Validating child integration flows available belonging parent
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.FIRSTINTEGRATION, "Flows not available")
    });
});
