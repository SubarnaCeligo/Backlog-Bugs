import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T29359_Verify that the immutable checkbox is not displaying for Salesforce Imports", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T29359 @BugID-IO-74713 @Env-All @Priority-P2 ", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.addStep("Navigated to Automation Flows");
        await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,'Immutable_Salesforce_DND');
        await io.flowBuilder.addStep("Searching respective flows related to salesforce");
        await io.flowBuilder.clickByText('Immutable_Salesforce_DND');
        await io.flowBuilder.addStep("Clicked on the respective flow related to Salesforce");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
        await io.flowBuilder.addStep("clicked on the import mapping icon")
        await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_SETTING);
        await io.flowBuilder.addStep('Clicked on the settings icon and navigated to settings drawer');
       const immutable = await io.flowBuilder.isVisible(selectors.mappings.IMMUTABLEOPTIONCHECK);
       await io.assert.expectToBeFalse(immutable, "immutable is not removed");
       await io.flowBuilder.addStep("Verified whether immutable checkbox is removed or not.");
    });
});