import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C118298.json";

test.describe("C118298 - Verify the assignee pill when the invited non-IO user has dismissed the invite", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T20072 C118298 - Verify the assignee pill when the invited non-IO user has dismissed the invite", async ({
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
    await io.homePage.loadingTime();
    //Assign one error to a user who has dismissed the invite
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGN_ERRORS
    );
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
      "io.auto.qa+assigndismisseduser@celigo.com"
    );
    await io.flowBuilder.clickByText(
      "Pending - io.auto.qa+assigndismisseduser@celigo.com"
    );
    await io.homePage.clickByText("Assign");
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL
    );

    //Get assignee pill
    const assigneePill = (
      await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)
    ).toString();
    await io.assert.expectToContainValue(
      "Pending - ",
      assigneePill,
      "Error is not assigned"
    );

    //Verify hovertex
    await io.flowBuilder.hover(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL,
      0,
      false
    );
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL_HOVERTEXT
    );
    const hoverText = (
      await io.flowBuilder.getText(
        selectors.em2DotOLineGraphPO.ASSIGNEE_PILL_HOVERTEXT
      )
    ).toString();
    await io.assert.expectToContainValue(
      "The assigned user has not yet accepted their invitation to this account.",
      hoverText,
      "Hovertext did not appear"
    );
    //Clear all assignments
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGN_ERRORS
    );
    await io.flowBuilder.clickButtonByIndex(
      selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX,
      0
    );
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.ARROW_POPPER
    );
    await io.flowBuilder.clickByText("Clear assignment");
  });
});
