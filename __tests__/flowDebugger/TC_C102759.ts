import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C102759.json";

test.describe("TC_C102759_C102760_C102760_C102761_C102762_C102763_C103505", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T24378 TC_C102759_C102760_C102760_C102761_C102762_C102763_C103505", async ({
    io,
    page
  }) => {
    let flow = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.flowBuilder.navigateToTheFlow(flow.get('TC_C102759').flowId);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on disable flow ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    test.step("*** Clicking on confirm disable ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      1
    );
    await io.homePage.loadingTime();
    test.step("*** clicking on run test ***", async () => { });
    //TC_C102759 Pop-up should show if we don't have mock data.
    var result = await (
      await page.locator(selectors.flowBuilderPagePO.AUTOMATIC_DATA_TEST)
    ).isVisible();
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Verified Pop-up should show if we don't have mock data.. ***", async () => { });
    await io.homePage.loadingTime();
    test.step("*** clicking on run test ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN);
    await io.homePage.loadingTime();
    const statusCol = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent()
    const errorCol = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(0).textContent();
    await io.assert.expectToContainValue("Completed", statusCol, "");
    await io.assert.expectToContainValue("Success", errorCol, "");
    //TC_C102762 Verify user is able to use custom delta flow option and run flow.
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN
    );
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      3
    );
    test.step("*** clicking on run test ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CUSTOM_DELTA_FIELD);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CONTINUE);
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      1
    );
    await io.homePage.click(selectors.flowBuilderPagePO.RUN);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    const statusCol1 = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent()
    const errorCol1 = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(0).textContent();
    await io.assert.expectToContainValue("Completed", statusCol1, "");
    await io.assert.expectToContainValue("Success", errorCol1, "");
    //TC_C102760 Pop-up should not show if we have mock data.
    //TC_C103505 Verify delta export pop-up When there are multiple exports(delta exports + other exports)
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN
    );
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      4
    );
    test.step("*** clicking on run test ***", async () => { });
    await io.homePage.loadingTime();
    var pop = await (
      await page.locator(selectors.flowBuilderPagePO.AUTOMATIC_DATA_TEST)
    ).isVisible();
    await expect(pop).toBeFalsy();
    test.step("*** Verified Pop-up should not show if we have mock data.. ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      0
    );
    test.step("*** clicking on run test ***", async () => { });
    var pop1 = await (
      await page.locator(selectors.flowBuilderPagePO.AUTOMATIC_DATA_TEST)
    ).isVisible();
    await expect(pop1).toBeFalsy();
    test.step("*** Verified Pop-up should not show if we have mock data.. ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    const statusCol2 = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent()
    const errorCol2 = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(0).textContent();
    await io.assert.expectToContainValue("Completed", statusCol2, "");
    await io.assert.expectToContainValue("Success", errorCol2, "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => { });
  });
});
