import { expect, test } from "@celigo/ui-core-automation";

test.describe("C1968_Verify error file in diagnostics zip", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C1968_Verify error file in diagnostics zip UI_Backlog @Env-All @Priority-P2", async ({ io, page, }) => {
    //Navigate to default integration
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    // Search for a flow
    await io.homePage.clickByText("C68514_1_DND");
    await io.flowBuilder.clickByText("More");
    // Validating able to download error diagnostics
    await io.flowBuilder.clickByText("Download diagnostics");


  });
});
