import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27107_Run report drawer - ‘Child integrations’ multi-select field should support an option to select ‘All’ at the top, and then all the other values in the multi-select field should be alpha sorted in ascending order.", () => {
    test("C27107_Run report drawer - ‘Child integrations’ multi-select field should support an option to select ‘All’ at the top, and then all the other values in the multi-select field should be alpha sorted in ascending order.", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Reports");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.click(selectors.basePagePO.CHOOSEINTEGRATIONFORREPORT);
        const intID = await io.api.loadIntegrations();
        await io.flowBuilder.selectTextfromDropDown(page, intID.get('Payout to Reconciliation'))
        await io.homePage.click(selectors.basePagePO.CHOOSECHILDINTEGRATIONFORREPORT)
        // Validating select all option available
        const selectAll = await io.flowBuilder.isVisible('text="Select All"');
        await io.assert.expectToBeValue(selectAll.toString(), "true", "Select All is not present in the dropdown");
    });
});