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
 
  //Open the flow
  await io.flowBuilder.clickByText("Flow_With_Errors_DND");

  await io.flowBuilder.clickByText("18 errors")

  //Click on Filter Icon
  await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

  //Validate the contents
  await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
  // await io.flowBuilder.clickButtonByIndex('#arrow-popper .PrivateSwitchBase-input', 0);

  await io.flowBuilder.clickByText("Myself");

  await io.flowBuilder.click( selectors.filterErrorTag.APPLYYAGSSELECTOR);

  await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

  //Validate the contents
  await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

  await io.flowBuilder.click(selectors.filterErrorTag.CLEARTAGSSELECTOR);
  await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);
  await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

  await io.assert.checkElementState(selectors.filterErrorTag.ALLERRORSCHECKBOX, 'isChecked')
  
  
});
});
