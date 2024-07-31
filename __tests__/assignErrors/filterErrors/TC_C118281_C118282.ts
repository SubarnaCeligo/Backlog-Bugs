import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118281_C118282 Verify user email is displayed on filter UI when an error is assigned to non IO user", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("@Epic-IO-38602 @Priority-P2 @Zephyr-IO-T20063 @Env-All C118281 Verify user email is displayed on filter UI when an error is assigned to non IO user", async ({
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
      "Filter_Automation01_DND"
    );

    //Open the flow
    await io.flowBuilder.clickByText("Filter_Automation01_DND");

    //Open errors dashborad
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);

    //Click on Filter Icon
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Verify how non IO users are displayed
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    const isEmailDisplayed = await io.flowBuilder.isVisible('text="io.auto.qa+assignpending@celigo.com"');
    await io.assert.expectToBeTrue(isEmailDisplayed, "io.auto.qa+assignpending@celigo.com not found");

  });
  test("@Epic-IO-38602 @Priority-P2 @Zephyr-IO-T20064 @Env-All C118282 Verify if longer usernames/email or usernames with special character are displayed properly on filter user section", async ({
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
      "Filter_Automation01_DND"
    );

    //Open the flow
    await io.flowBuilder.clickByText("Filter_Automation01_DND");

    //Open errors dashborad
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);

    //Click on Filter Icon
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Verify long user names are displayed.
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.fill(selectors.filterErrorTag.ARIALABELSEARCHUSER, "User WithLongUserNameTestWithLongUserN")
    const userNames = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_NAME)).toString();
    await io.assert.expectToContainValue('User WithLongUserNameTest', userNames, 'User With long name not found')
  });
});