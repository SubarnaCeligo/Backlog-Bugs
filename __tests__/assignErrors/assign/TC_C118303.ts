import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/Filter_Automation01.json";

test.describe("C118303 - Verify user's entry 'Assign error' page when the user has not yet accepted the invite", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T20077 C118303 - Verify user's entry 'Assign error' page when the user has not yet accepted the invite", async ({ io, page }) => {
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
    
    //Assign one error to a user
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.fill(selectors.filterErrorTag.ARIALABELSEARCHUSER, 'io.auto.qa+assignpending@celigo.com');
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_NAME_LIST);
    const userText = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_NAME_LIST)).toString();
    await io.assert.expectToContainValue('Pending - io.auto.qa+assignpending@celigo.com', userText, "Pending user is not displayed in the list");

    await io.flowBuilder.hover(selectors.em2DotOLineGraphPO.ASSIGNEE_NAME_LIST, 0, false);
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL_HOVERTEXT);
    const hoverText = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL_HOVERTEXT)).toString();
    await io.assert.expectToContainValue(
      'The assigned user has not yet accepted their invitation to this account.',
      hoverText,
      'Pending hovertext is not displayed upon hovering' 
      );
  });
});