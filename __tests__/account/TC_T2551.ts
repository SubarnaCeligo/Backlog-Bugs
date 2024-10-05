import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T2551", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T2551 @Zephyr-IO-T2551 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Auto_Edit_Unification_Flows");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Auto_Edit_Unification_Flows");
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Opened the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Edit_NS_To_SF_All_Mapping_Settings");
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.mappings.V2_SUITESCRIPT.IMPORT_MAPPING);
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Opened the SF import mappings ***");
        await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_GENERATE);
        await io.homePage.addStep("*** Selected dynamic lookup and verified the buttons ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});