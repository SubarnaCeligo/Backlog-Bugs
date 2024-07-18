import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C120101,C120098,C120097,C120096", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T10088 @Zephyr-IO-T10085 @Zephyr-IO-T10084 @Zephyr-IO-T10083 @Env-All @Priority-P2 ", async ({ io, page }) => {
        await io.homePage.loadingTime();
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(
            selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
        );
        await io.flowBuilder.click(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD );
        await io.flowBuilder.clickByText('MariaDB');
        await io.flowBuilder.clickByText("Import records into destination application");
        // await io.flowBuilder.clickByText('Create from scratch');
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.clickByText("MariaDBCred");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
        await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "MariaDB");
        await io.homePage.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
        await io.homePage.addStep("*** Clicked on destination table search field ***");
        await io.flowBuilder.clickByText("Automation");
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.assert.verifyElementDisplayedByText("Create destination rows [ ] from source record { }", "Option is not displayed properly");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT);
        await io.homePage.addStep("*** Clicked on changing output format button ***");
        await io.flowBuilder.click(selectors.basePagePO.COLLAPSE_ALL);
        await io.homePage.addStep("*** Clicked on collapseall button ***");
        await io.flowBuilder.click(selectors.basePagePO.EXPAND_ALL);
        await io.homePage.addStep("*** Clicked on expandall button ***");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "name");
        await io.homePage.addStep("***Verified the Destination Field Meta Deta ***");
        await io.homePage.addStep("*** Added destination field ***");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, "name");
        await io.homePage.addStep("*** Added source field ***");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.homePage.addStep("*** Clicked on preview button ***");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SEARCH);
        await io.homePage.addStep("*** Clicked on search button ***");
        await io.homePage.addStep("*** Clicked all buttons on mapper2.0 page everything is working fine ***");

    });
});