import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C117999_C118000 Verify if user filter section is added to filter dialog ", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C117999_C118000 Verify if user filter section is added to filter dialog", async ({
    io,
    page,
  }) => {
    //Verify that Myself and Unassigned are the first 2 items in the filter and remaining users are sorted alphabetically
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
    await io.flowBuilder.clickByText( "Flow_With_Errors_DND");

    await io.flowBuilder.clickByText("18 errors")
 
  
    //Click on Filter Icon
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Validate the contents
    await io.homePage.waitForElementAttached("text='Assigned to'")
    const flow = await io.homePage.isVisible("text='Assigned to'")
    await io.assert.expectToBeValue(flow.toString(),'true', "text not found")
     
    await io.assert.checkElementState(selectors.filterErrorTag.ALLERRORSCHECKBOX, 'isChecked')
    
    await io.assert.verifyElementIsDisplayed(
        selectors.filterErrorTag.ARIALABELSEARCHUSER,
        "Search bar is not displayed"
      );
  });
});
