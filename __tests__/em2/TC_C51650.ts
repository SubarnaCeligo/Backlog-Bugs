
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C51650.json";

test.describe("TC_C51650", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T19802 TC_C51650", async ({io,page}, testInfo) => {
    const flowName = "TC_C51650_DND";
    await io.homePage.clickByText(flowName);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const flowId = await io.api.getFlowId(flowName);
    await io.api.runBatchFlowViaAPI(flowName, flowId);
    const lastRun = page.getByText('Last run')
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    test.step("*** Clicking on the error ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("Error Table is opened", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 2);
    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 1);
    await io.homePage.click(selectors.flowBuilderPagePO.NEXT_ERROR_BUTTON);
    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 4);
    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 5);
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIOUS_ERROR_BUTTON);
await test.step(
      " Selected two checkbox and pressed nedt and two more checkbox selected"
, async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.RESOLVE_JOBS);
    await io.homePage.click("li"+selectors.myAccountPagePO.SELECTED_ERROR);

    const resolved = page.getByText('Resolves: 4');
    await resolved.waitFor({state: 'visible', timeout: 180000});
    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();
    let errs = await io.homePage.getLengthOfElementArray(selectors.myAccountPagePO.ERROR_CHECKBOX);
    expect(errs).toEqual(5);
await test.step(
      "Verfied that all the errors are being sent in resolved tab"
, async ()=>{});
  });
});
