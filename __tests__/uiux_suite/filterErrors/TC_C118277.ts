import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118277 Verify filtering by 'Unassigned' returns only unassigned errors", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify filtering by 'Unassigned' returns only unassigned errors", async ({
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

    const isDisplayed = await io.flowBuilder.isVisible('text="Manage User"');
  await io.assert.expectToBeValue(isDisplayed.toString(),'true', "Manage User")

    //Validate the contents
    await io.flowBuilder.waitForElementAttached("#arrow-popper");


    await io.flowBuilder.clickByText("Unassigned");
    //Click Apply
    await io.flowBuilder.click('[data-test="applyTags"]');
    const isNotDisplayed = await io.flowBuilder.isVisible('text="Manage User"');
    await io.assert.expectToBeValue(isNotDisplayed.toString(),'false', "Manage User displayed")

    const isOwnerDisplayed = await io.flowBuilder.isVisible('text="Assign Error Owner"');
    await io.assert.expectToBeValue(isOwnerDisplayed.toString(),'false', "Assign Error Owner dispalyed")

  });
});
