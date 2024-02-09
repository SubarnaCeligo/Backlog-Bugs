import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118281_C118282 Verify user email is displayed on filter UI when an error is assigned to non IO user", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    
  });
  test("C118281 Verify user email is displayed on filter UI when an error is assigned to non IO user", async ({
    io,
    page,
  }) => {
    //Verify if longer usernames/email or usernames with special character are displayed properly on filter user section
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

    //Verify how non IO users are displayed
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    const isEmailDisplayed = await io.flowBuilder.isVisible('text="io.auto.qa+assignpending@celigo.com"');
    await io.assert.expectToBeValue(isEmailDisplayed.toString(),'true', "io.auto.qa+assignpending@celigo.com not found");

  });
  test("C118282 Verify if longer usernames/email or usernames with special character are displayed properly on filter user section", async ({
    io,
    page,
  }) => {
    //Verify if longer usernames/email or usernames with special character are displayed properly on filter user section
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

    //Verify how non IO users are displayed
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.fill(selectors.filterErrorTag.ARIALABELSEARCHUSER, "User WithLongUserNameTestWithLongUserN")
     
    const isEmailDisplayed = await io.flowBuilder.isVisible('text="User WithLongUserNameTestWithLongUserN..."');
    await io.assert.expectToBeValue(isEmailDisplayed.toString(),'true', "User WithLongUserNameTestWithLongUserN not found");

  });
});
