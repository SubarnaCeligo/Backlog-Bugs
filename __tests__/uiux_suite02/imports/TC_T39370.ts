import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T39370_NetSuite- Adaptor : Test to verify Subrecording mappings are locked in the parent record mappings", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Bug-IO-96438 @Zephyr-IO-T39370 @Env-QA @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "HTTP_DND_UIUX");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("HTTP_DND_UIUX");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("IO_96438_DND");
        await io.homePage.addStep("*** Opened the respective flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.homePage.addStep("*** Clicked on netsuite import mappings ***");
        await io.homePage.click(selectors.flowBuilderPagePO.SUBRECORD_MAPPING);
        await io.homePage.addStep("*** Clicked on Netsuite_Import_1.0 subrecord , to check subrecord mappings ***");
        const subrecord = await page.locator(selectors.importPagePO.NS_SUBRECORD_MAPPING);
        const subrecordState = await subrecord.getAttribute("data-state");
        if (subrecordState) {
            expect(await subrecord.getAttribute("data-state")).toBe("closed");
        }
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});