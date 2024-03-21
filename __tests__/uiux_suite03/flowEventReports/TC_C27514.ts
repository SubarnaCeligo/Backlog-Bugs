import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27514_Run report drawer - if an integration has a label for child integrations then in run report drawer, when the select the integration name , A drop down box listing all the child integration should be listed under the respective label name", () => {
    test("C27514_Run report drawer - if an integration has a label for child integrations then in run report drawer, when the select the integration name , A drop down box listing all the child integration should be listed under the respective label name UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Reports");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.click(selectors.basePagePO.CHOOSEINTEGRATIONFORREPORT);
        const intID = await io.api.loadIntegrations();
        await io.flowBuilder.selectTextfromDropDown(page, intID.get('Payout to Reconciliation'))
        await io.homePage.click(selectors.basePagePO.CHOOSECHILDINTEGRATIONFORREPORT)
        // Validating multi select option available
        const selectAll = await io.flowBuilder.isVisible('text="Select All"');
        await io.assert.expectToBeValue(selectAll.toString(), "true", "Select All is not present in the dropdown");
    });
});
