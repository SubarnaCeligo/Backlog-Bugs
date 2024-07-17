import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C113519_Verify hover text is not displayed when message drop down is opened in Error window", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T8193 C113519_Verify hover text is not displayed when message drop down is opened in Error window UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText("TC_C51620_Flow_DND");
        await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.ERROR_BUBBLE);
        await io.flowBuilder.loadingTime();
        // Validating hover text is not displayed when message drop down is opened 
        await io.homePage.clickByTextByIndex("Timestamp", 1);
    });
});