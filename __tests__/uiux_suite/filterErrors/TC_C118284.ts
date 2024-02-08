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
    await io.integrationPage.delay(2000); // wait for the search to complete

    //Open the flow
    await io.flowBuilder.clickByText("Flow_With_Errors_DND");

    //Open errors dashborad
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    );

    //Click on Filter Icon
    await io.flowBuilder.click('[aria-label="Filter errors"]');

    //Validate the contents
    await io.flowBuilder.waitForElementAttached("#arrow-popper");

    //Select a user
    await io.flowBuilder.clickByText("Myself");

    //Click Apply
    await io.flowBuilder.click('[data-test="applyTags"]');

    //Go to Resolved errors
    await io.flowBuilder.click('[data-test="flow-builder-resolved-errors"]');

    //Go back to open errors
    await io.flowBuilder.click('[data-test="flow-builder-open-errors"]');

    //Click on Filter Icon
    await io.flowBuilder.click('[aria-label="Filter errors"]');

    //Validate if filter is retained
    await io.flowBuilder.waitForElementAttached("#arrow-popper");

    const isCheckedele = await page.isChecked('label:has-text("Myself") input[type="checkbox"]');

   
   await io.assert.expectToBeValue( isCheckedele.toString(),'true', "filter doesn't retained")



  });
});
