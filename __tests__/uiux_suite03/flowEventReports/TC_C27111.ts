import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27111_Run report drawer- If the integration I select in the ‘Integration’ field has a parent + child structure, then we need to show a ‘Child integrations’ multi-select field", () => {
    test("@Env-All @Zephyr-IO-T4376 C27111_Run report drawer- If the integration I select in the ‘Integration’ field has a parent + child structure, then we need to show a ‘Child integrations’ multi-select field UI_Backlog #STAGING Only", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Reports");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.click(selectors.basePagePO.CHOOSEINTEGRATIONFORREPORT);
        const intID = await io.api.loadIntegrations();
        await io.flowBuilder.selectTextfromDropDown(page, intID.get('flowEventReportsIntegration_DND'))
        await io.homePage.click(selectors.basePagePO.CHOOSECHILDINTEGRATIONFORREPORT);
        await io.flowBuilder.loadingTime();
        // Validating child integration flows multi select field available
        const selectAll = await io.flowBuilder.isVisible('text="Select All"');
        await io.assert.expectToBeValue(selectAll.toString(), "true", "Select All is not present in the dropdown");
    });
});