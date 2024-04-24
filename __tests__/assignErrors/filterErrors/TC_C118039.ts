import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118039 Verify that clicking on 'Clear filter' button closes the filter dropdown and checks 'All errors'", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
 
test("@Env-All C118039 Verify that clicking on 'Clear filter' button closes the filter dropdown and checks 'All errors'", async ({
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
    "Filter_Automation02_DND"
  );
 
  //Open the flow
  await io.flowBuilder.clickByText("Filter_Automation02_DND");

  //Open errors dashborad
  await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);

  //Click on Filter Icon
  await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

  //Apply a filter
  await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
  await io.flowBuilder.clickByText("Myself");
  await io.flowBuilder.click( selectors.filterErrorTag.APPLYYAGSSELECTOR);
  await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

  //Validate the checkbox
  await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
  await io.flowBuilder.click(selectors.filterErrorTag.CLEARTAGSSELECTOR);
  await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);
  await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
  const isChecked = await page.locator(selectors.filterErrorTag.ALLERRORSCHECKBOX).isChecked();
  await io.assert.expectToBeTrue(isChecked, 'All errors checked');
  
  
});
});
