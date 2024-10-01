import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C25959.json";

test.describe("TC_C25959| TC_C2576| TC_C2577| TC_C27335| TC_C27332", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async () => { });
  });

  test("@Env-All @Zephyr-IO-T2810| Verify if user added all the required mappings the 'No additional fields required' message must be shown upon clicking on \"Auto-map fields\"", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);

    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );

    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP
    );
    await io.homePage.loadingTime();
    const homeButton = await page.locator(selectors.myAccountPagePO.ALERTTEXT);
    await homeButton.isVisible({ timeout: 20000 });

    let alertText = "There are no new fields to auto-map.";
    expect(await page.getByText(alertText));
  });

  test("@Env-All @Zephyr-IO-T2745| Verified the InputFilter icon placement for PP lookups is as expected  ", async ({ io, page }) => {
 await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    const inputFilter = await page.$(selectors.flowBuilderPagePO.INPUT_FILTER);
    expect(await inputFilter.isVisible()).toBeTruthy();
  });

  test("@Env-All @Zephyr-IO-T2746| Verified input filter is added to the PP lookups and when clicked on the input filter AFE should be opened  ", async ({ io, page }) => {
  await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name)
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    const inputFilter = selectors.flowBuilderPagePO.INPUT_FILTER;
    await io.homePage.clickByIndex(inputFilter, 1);
    const afe = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue("editor/iFilter-", afe, "");
    expect(await page.getByText("Define input filter").isVisible()).toBeTruthy();
  });

  test('@Env-All @Zephyr-IO-T2820| Verify the Page processor Lookup form does not have "Override trace key template" field in the Advanced section when the one to many is set to false', async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name)
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUP);
    await io.homePage.loadingTime();
    await page.pause();

    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADVANCED
    );
    await io.homePage.loadingTime();
    expect(await page.locator(selectors.flowBuilderPagePO.TRACEKAY_TEMPLATEHANDLER).isVisible()).toBeFalsy();

  });

  test('@Env-All @Zephyr-IO-T2817| Verify the Page processor Lookup form has "Override child record trace key template" field in the Advanced section when the one to many is set to true ', async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name)
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUP
    );
    await io.homePage.loadingTime();

    await io.homePage.clickByText('Yes (advanced)');
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADVANCED
    );
    await io.homePage.loadingTime();
    const element = await page.locator(selectors.mappings.OVERRIDETRACEKEYTEMPLATE);
    await element.scrollIntoViewIfNeeded();
    expect(element.isVisible()).toBeTruthy();
  });
});
