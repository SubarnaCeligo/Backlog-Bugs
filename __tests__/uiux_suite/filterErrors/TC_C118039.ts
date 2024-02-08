import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118039 Verify that clicking on 'Clear filter' button closes the filter dropdown and checks 'All errors'", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
 
test("Verify that clicking on 'Clear filter' button closes the filter dropdown and checks 'All errors'", async ({
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
  // await io.flowBuilder.clickButtonByIndex('#arrow-popper .PrivateSwitchBase-input', 0);

  await io.flowBuilder.clickByText("Myself");

  await io.flowBuilder.click('[data-test="applyTags"]');

  await io.flowBuilder.click('[aria-label="Filter errors"]');

  //Validate the contents
  await io.flowBuilder.waitForElementAttached("#arrow-popper");

  await io.flowBuilder.click('[data-test="clearTags"]');
  await io.flowBuilder.click('[aria-label="Filter errors"]');
  await io.flowBuilder.waitForElementAttached("#arrow-popper");

  const isChecked = await page.isChecked('.Mui-checked [type="checkbox"]');
  expect(isChecked).toBe(true);
  
  
});
});
