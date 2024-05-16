import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/Filter_Automation01.json";

test.describe("C117998_C118000 Verify the search feature with a successful/unsuccessful search", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T20052 @Zephyr-IO-T20054 Verify the search feature with a successful search", async ({
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

    //Validate search feature(valid search)
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    await io.flowBuilder.fill(
      selectors.filterErrorTag.ARIALABELSEARCHUSER,
      "invalid_string"
    );

    const isMyselfDisplayed = await io.flowBuilder.isVisible('text="Myself"');
    await io.assert.expectToBeTrue(isMyselfDisplayed, "Search failed");
    const isUnassignedDisplayed = await io.flowBuilder.isVisible('text="Unassigned"');
    await io.assert.expectToBeTrue(isUnassignedDisplayed, "Search failed");

    //Validate search feature(valid search)
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    await io.flowBuilder.fill(
      selectors.filterErrorTag.ARIALABELSEARCHUSER,
      "Custom User1"
    );

    const isUserDisplayed = await io.flowBuilder.isVisible('text="Custom User1"');
    await io.assert.expectToBeTrue(isUserDisplayed, "Search failed");
  });
});
