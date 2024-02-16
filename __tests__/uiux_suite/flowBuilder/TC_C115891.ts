import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C115891_Mapper 2.0 should be consistent same like Snowflake for Oracle ADW imports", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C115891", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("Oracle_import_flow_DND");
        await io.homePage.addStep("*** Opened the flow with Oracle import ***");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.homePage.addStep("*** Opened the mappings ***");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON);
        await io.homePage.addStep("*** Navigated to Mapper2.0 page ***");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText(
            "Create destination rows [ ] from source record { }",
            "Field not present"
          );
          await io.homePage.addStep("*** Checked for the field 'Create destination rows [ ] from source record { }' ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});