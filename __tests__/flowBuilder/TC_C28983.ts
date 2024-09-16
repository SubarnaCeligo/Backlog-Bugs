import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C28983.json";

test.describe("@Env_All @Zephyr-IO-T2872", () => {
  test("@Env_All @Zephyr-IO-T2872|Should not display the tool tip when hovered over the helptext in suitescript hooks for Netsuite", async ({io, page}) => {
    test.step("Creating the flow", async ()=>{});
    await io.createResourceFromAPI(TC, "FLOWS");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS,0);
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex( selectors.flowGroupingPagePO.PREMAPCREATESCRIPT, 0);
    await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, '28983Script');
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click("[data-test='suiteScript-header'] > button");
    await expect(await page.getByText('When writing your SuiteScript hook, your scripting language must match the SuiteScript version configured in your import. For example, if your NetSuite import is configured to use SuiteApp SuiteScript 2.x APIs, then your script also should use only SuiteScript 2.x; or, if your NetSuite import is configured to use SuiteApp SuiteScript 1.0 API or SuiteBundle SuiteScript 1.0 API, then your script also should use only SuiteScript 1.0.SuiteScript 1.0 and 2.0 are not compatible. If there is a mismatch in the SuiteScript versions used in your hook and import, your flows will fail when you run them.').isVisible()).toBeTruthy();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.CLOSEALERT,1);
    await io.homePage.loadingTime();
    await io.homePage.hover("[data-test='suiteScript-header'] > button");
    await expect(await page.getByText('When writing your SuiteScript hook, your scripting language must match the SuiteScript version configured in your import. For example, if your NetSuite import is configured to use SuiteApp SuiteScript 2.x APIs, then your script also should use only SuiteScript 2.x; or, if your NetSuite import is configured to use SuiteApp SuiteScript 1.0 API or SuiteBundle SuiteScript 1.0 API, then your script also should use only SuiteScript 1.0.SuiteScript 1.0 and 2.0 are not compatible. If there is a mismatch in the SuiteScript versions used in your hook and import, your flows will fail when you run them.').isVisible()).toBeFalsy();
  });
});
