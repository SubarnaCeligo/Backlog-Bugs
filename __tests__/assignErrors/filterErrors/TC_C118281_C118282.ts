import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/Filter_Automation01.json";

test.describe("C118281_C118282 Verify user email is displayed on filter UI when an error is assigned to non IO user", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });

  test("@Epic-IO-38602 @Priority-P2 @Zephyr-IO-T20063 @Env-All C118281 Verify user email is displayed on filter UI when an error is assigned to non IO user", async ({
    io,
    page,
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
    await io.flowBuilder.loadingTime();
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
    await io.flowBuilder.loadingTime();
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
