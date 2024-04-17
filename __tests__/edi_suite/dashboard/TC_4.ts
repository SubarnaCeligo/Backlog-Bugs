import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify that 'EDI activity' tab is added to IO Dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify that 'EDI activity' tab is added to IO Dashboard", async ({ io, page }) => {
    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");

    //Verify if EDI activity tab is visible
    let isVisible = await io.homePage.isVisible("[data-test= 'edi-activity']");
    await io.assert.expectToBeFalse(isVisible, 'EDI dasboard is not added');
    
  });
});