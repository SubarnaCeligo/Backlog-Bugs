import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C104124.json";

test.describe("TC_C104124", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T24384 TC_C104124", async ({ io, page }) => {
    await io.homePage.loadingTime();
    let flow = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    await io.flowBuilder.navigateToTheFlow(flow.get(TC.name)["flowId"]);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on disable flow ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    test.step("*** Clicking on confirm disable ***", async () => {});
    await io.homePage.loadingTime();
    //TC_C104124 Verify With more than 3 bubble, Pop-up is showing for delta bubble not for non-delta bubble
    await io.homePage.loadingTime();
    //Non-delta export
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      5
    );
    test.step("*** clicking on run test ***", async () => {});
    await io.homePage.loadingTime();
    var pop = await (
      await page.locator(selectors.flowBuilderPagePO.AUTOMATIC_DATA_TEST)
    ).isVisible();
    await expect(pop).toBeFalsy();
    test.step("*** Verified Pop-up should not show if we run non delta export.. ***", async () => {});
    await io.homePage.loadingTime();
    //Delta export
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      2
    );
    test.step("*** clicking on run test ***", async () => {});
    await io.homePage.loadingTime();
    var pop1 = await (
      await page.locator(selectors.flowBuilderPagePO.AUTOMATIC_DATA_TEST)
    ).isVisible();
    await io.assert.expectToBeTrue(pop1, "");
    test.step("*** Verified Pop-up should show if we run delta export.. ***", async () => {});
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => {});
  });
});
