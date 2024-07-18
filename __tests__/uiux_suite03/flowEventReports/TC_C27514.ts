import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27514_Run report drawer - if an integration has a label for child integrations then in run report drawer, when the select the integration name , A drop down box listing all the child integration should be listed under the respective label name", () => {
    test("@Env-All @Zephyr-IO-T2518 C27514_Run report drawer - if an integration has a label for child integrations then in run report drawer, when the select the integration name , A drop down box listing all the child integration should be listed under the respective label name UI_Backlog #STAGING Only", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Tools", "Reports");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.click(selectors.basePagePO.CHOOSEINTEGRATIONFORREPORT);
        await io.flowBuilder.loadingTime();
        const intID = await io.api.loadIntegrations();
        await io.flowBuilder.selectTextfromDropDown(page, intID.get('flowEventReportsIntegration_DND'))
        await io.homePage.click(selectors.basePagePO.CHOOSECHILDINTEGRATIONFORREPORT);
        await io.flowBuilder.loadingTime();
        // Validating multi select option available
        const selectAll = await io.flowBuilder.isVisible('text="Select All"');
        await io.assert.expectToBeValue(selectAll.toString(), "true", "Select All is not present in the dropdown");
    });
});
