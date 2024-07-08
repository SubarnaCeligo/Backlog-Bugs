import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C115891_Mapper 2.0 should be consistent same like Snowflake for Oracle ADW imports", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All TC_C115891_Mapper 2.0 should be consistent same like Snowflake for Oracle ADW imports UI_Backlog", async ({ io, page }) => {
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Automation Flows");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Automation Flows");
        await io.homePage.clickByText("TC_C115891_Flow_DND");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON);
        await io.flowBuilder.loadingTime();
        // Validating Mapper 2.0
        await io.assert.verifyElementDisplayedByText("Create destination record { } from source record { }", "Field not present");
    });
});