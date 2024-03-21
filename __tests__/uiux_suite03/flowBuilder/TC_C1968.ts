import { expect, test } from "@celigo/ui-core-automation";

test.describe("C1968_Verify error file in diagnostics zip_UI_Backlog", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C1968_Verify error file in diagnostics zip_UI_Backlog", async ({ io, page, }) => {
    //Navigate to default integration
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    // Search for a flow
    await io.homePage.clickByText("TC_C26246_Flow_DND");
    await io.flowBuilder.clickByText("More");
    // Validating able to download error diagnostics
    await io.flowBuilder.clickByText("Download diagnostics");


  });
});
