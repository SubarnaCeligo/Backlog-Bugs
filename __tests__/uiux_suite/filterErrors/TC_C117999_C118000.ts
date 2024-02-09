import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C117998_C118000 Verify the search feature with a successful/unsuccessful search", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify the search feature with a successful search", async ({
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
    await io.integrationPage.delay(2000); // wait for the search to complete

    //Open the flow
    await io.flowBuilder.clickByText( "Flow_With_Errors_DND");

    await io.flowBuilder.clickByText("18 errors")

    //Click on Filter Icon
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Validate search feature(valid and invalid search)
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    await io.flowBuilder.fill(
     selectors.filterErrorTag.ARIALABELSEARCHUSER,
      "test "
    );

    const isDisplayed = await io.flowBuilder.isVisible('text="There are no users matching your search"');
    await io.assert.expectToBeValue(isDisplayed.toString(),'true', "There areusers matching your search")
  });
});
