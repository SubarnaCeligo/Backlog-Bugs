import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C1968_Verify error file in diagnostics zip", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C1968_Verify error file in diagnostics zip UI_Backlog @Env-All @Priority-P2 @Zephyr-IO-T2001", async ({ io, page, }) => {
    //Navigate to default integration
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    // Search for a flow
    await io.homePage.clickByText("C68514_1_DND");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText("More");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    // Validating able to download error diagnostics
    await io.flowBuilder.clickByText("Download diagnostics");


  });
});
