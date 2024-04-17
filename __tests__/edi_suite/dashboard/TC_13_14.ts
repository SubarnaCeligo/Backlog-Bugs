import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify sorting on EDI documents dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify sorting on EDI documents dashboard", async ({ io, page }) => {
    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");

    //Go to EDI activity
    await io.homePage.click("[data-test= 'edi-activity']");

    await io.homePage.addStep("Verify default sorting on EDI dashboard");
    //Verify if data is sorted by date

    await io.homePage.addStep("Verify sorting on all sortable columns on documents dashboard");
    //Sort on any other column
    await io.homePage.clickByIndex('.MuiTableCell-head', 10);//Change index accordingly

    //wait for soert to complete
    await io.homePage.waitForElementAttached('[aria-sort="ascending"]');

    //Get the data from sorted column and verify if data is sorted.

   
    
  });
});