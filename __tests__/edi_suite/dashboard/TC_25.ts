import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify Refresh feature on Completed EDI flows dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify Refresh feature on Completed EDI flows dashboard", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");

    //Verify if EDI activity tab is visible
     await io.homePage.isVisible("[data-test= 'edi-activity']");

    //Open flows

    //Get the latest processed date value.

    //Run an EDI flow using API
    await io.api.runBatchFlowViaAPI("flowname", "flow_id");
    //https://qa.staging.integrator.io/api/flows/658bf660241813db25732b12/run
    //Wait for the flow to complete

    //Click Refresh
    await io.homePage.clickByText("Refresh");

    //Get the latest processed date value and see if it is the current date.

  });
});