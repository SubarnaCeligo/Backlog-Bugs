import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27111_Run report drawer- If the integration I select in the ‘Integration’ field has a parent + child structure, then we need to show a ‘Child integrations’ multi-select field_UI_Backlog", () => {
    test("C27111_Run report drawer- If the integration I select in the ‘Integration’ field has a parent + child structure, then we need to show a ‘Child integrations’ multi-select field_UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Reports");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.click(selectors.basePagePO.CHOOSEINTEGRATIONFORREPORT);
        const intID = await io.api.loadIntegrations();
        await io.flowBuilder.selectTextfromDropDown(page, intID.get('Payout to Reconciliation'))
        await io.homePage.click(selectors.basePagePO.CHOOSECHILDINTEGRATIONFORREPORT)
        // Validating child integration flows multi select field available
        const selectAll = await io.flowBuilder.isVisible('text="Select All"');
        await io.assert.expectToBeValue(selectAll.toString(), "true", "Select All is not present in the dropdown");
    });
});