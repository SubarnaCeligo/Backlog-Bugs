import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_IO52927", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_IO52927 @Env-All @Priority-P2 @Zephyr-IO-52927", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.addStep("*** Navigated back to flow builder page ***");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_GENERATOR);
        await io.homePage.addStep("*** Clicked on create export ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "FTP");
        await io.homePage.addStep("*** Searched for FTP ***");
        await io.homePage.clickByText('FTP');
        await io.homePage.addStep("*** Selected FTP application ***");
        await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "FTP CONNECTION");
        await io.homePage.addStep("*** Searched for FTP connection ***");
        await io.homePage.clickByText('FTP CONNECTION');
        await io.homePage.addStep("*** Selected the FTP connection ***");
        await io.flowBuilder.clearTextValue(selectors.connectionsPagePO.CONNECTION_INPUT);
        await io.homePage.addStep("*** Removed first connection ***");
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "MONITOR CONNECTION");
        await io.homePage.clickByText('MONITOR CONNECTION');
        await io.homePage.addStep("*** Selected another connection ***");
        const checkboxSelector = selectors.exportsPagePO.CHECK_EXISTING_EXPORT;
        const isChecked = await page.isChecked(checkboxSelector);
        expect(isChecked).toBe(false);
        await io.homePage.addStep("*** Checked that existing export checkbox is not selected after changing connection ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
});