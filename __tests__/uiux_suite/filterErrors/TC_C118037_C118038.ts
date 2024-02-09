import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118037_C118038 Verify that 'Clear filter' button is disabled when 'All errors' is selected ", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C118037 Verify that 'Clear filter' button is disabled when 'All errors' is selected", async ({
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
    await io.flowBuilder.clickByText("18 errors")

    //Click on Filter Icon
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Validate the contents
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    // await io.flowBuilder.clickButtonByIndex('#arrow-popper .PrivateSwitchBase-input', 0);

    await io.flowBuilder.checkAndUncheck(
       selectors.filterErrorTag.ALLERRORSSELECTOR,
      "All errors",
      0
    );

    await io.assert.verifyElementAttributeContainsText(
      selectors.filterErrorTag.CLEARTAGSSELECTOR,
      "class",
      "Mui-disable"
    );


  });
  test("C118038 Verify that 'Clear filter' button is enabled when specific filter is applied", async ({
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

    await io.flowBuilder.clickByText("18 errors")

    //Click on Filter Icon
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Validate the contents
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    // await io.flowBuilder.clickButtonByIndex('#arrow-popper .PrivateSwitchBase-input', 0);

    await io.flowBuilder.clickByText("Myself");

    await io.flowBuilder.click(selectors.filterErrorTag.APPLYYAGSSELECTOR);

    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Validate the contents
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    const isEnabled = await page.$eval(selectors.filterErrorTag.CLEARTAGSSELECTOR, (element) => element.hasAttribute("Mui-disable"));
    expect(isEnabled).toBeFalsy();
      
    
  });
});
