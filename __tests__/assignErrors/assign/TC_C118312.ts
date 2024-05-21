import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/Filter_Automation01.json";

test.describe("C118312 - Verify Assign error flyout when the there are users in the account with long usernames", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T20086 C118312 - Verify Assign error flyout when the there are users in the account with long usernames", async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.delay(1000 * 60 * 4);
    await page
      .locator(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS)
      .waitFor({
        state: "visible",
        timeout: 180000
      });
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    );
    
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);

    //Verify if long user names are displayed.
    await io.flowBuilder.clickButtonByIndex(
      selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX,
      1
    );
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.ARROW_POPPER
    );
    await io.flowBuilder.fill(
      selectors.filterErrorTag.ARIALABELSEARCHUSER,
      "User WithLongUserName"
    );
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGNEE_NAME_LIST
    );
    const userNames = await io.flowBuilder.getText(
      selectors.em2DotOLineGraphPO.ASSIGNEE_NAME_LIST
    );
    let userNameArray = [];
    userNameArray.push(userNames.toString().trim());
    await io.assert.expectToBeValueInArray(
      userNameArray,
      "User WithLongUserNameTestWithLongUserNameTest",
      "Long user names not displyed."
    );
  });
});
