import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118284 Verify filter persistence when the user navigates to other tabs and returns to open errors tab", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify filter persistence when the user navigates to other tabs and returns to open errors tab", async ({
    io,
    page,
  }) => {
    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a flow
    await io.integrationPage.waitForElementAttached(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
    );
    await io.integrationPage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "Flow_With_Errors_DND"
    );
 
    //Open the flow
    await io.flowBuilder.clickByText("Flow_With_Errors_DND");

    await io.flowBuilder.clickByText("18 errors")

    //Click on Filter Icon
    await io.flowBuilder.click( selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Validate the contents
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Select a user
    await io.flowBuilder.clickByText("Myself");

    //Click Apply
    await io.flowBuilder.click(selectors.filterErrorTag.APPLYYAGSSELECTOR);

    //Go to Resolved errors
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB);

    //Go back to open errors
    await io.flowBuilder.click(selectors.integrationPagePO.OPENERRORS);

    //Click on Filter Icon
    await io.flowBuilder.click( selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Validate if filter is retained
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    const isCheckedele = await page.isChecked(selectors.filterErrorTag.MYSELFCHECKBOX);

   
   await io.assert.expectToBeValue( isCheckedele.toString(),'true', "filter doesn't retained")



  });
});
