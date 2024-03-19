import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T2976 from "@testData/Flows/TC_T2976.json";
import { decrypt } from "@celigo/aut-utilities";

test.describe.skip("T2976 Verify the filter set by the user will persist even if the user is logout and login again UI_Backlog", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("T2976 Verify the filter set by the user will persist even if the user is logout and login again UI_Backlog", async ({ io, page }) => {
    await io.homePage.loadingTime()
    const id = await io.createResourceFromAPI(T2976, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);

    // Setting a filter in lineGraph
    const lineGraphButton = await page.$(selectors.flowBuilderPagePO.LINE_GRAPH_ICON);
    const isLineGraphButtonEnabled = await lineGraphButton.isEnabled();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.LINE_GRAPH_ICON);
    await io.flowBuilder.clickByText('Last 30 days');
    await io.flowBuilder.clickByText('Last 7 days');
    await io.flowBuilder.clickByText('Apply');
    await io.flowBuilder.clickByText('Flow-level');
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.clickByText('Apply');
    await io.flowBuilder.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    // Logout and login
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
    await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
    await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);


    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.LINE_GRAPH_ICON);

    //Open the lineGraphs
    await io.flowBuilder.click(selectors.flowBuilderPagePO.LINE_GRAPH_ICON);

    // Verify the filter
    await io.flowBuilder.clickByText('Last 7 days');
    await io.flowBuilder.clickByText('Last 30 days');
    await io.flowBuilder.clickByText('Apply');
    await io.flowBuilder.clickByText('2 resources selected');
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.clickByText('Apply');
    await io.flowBuilder.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    //Clean up
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });
});