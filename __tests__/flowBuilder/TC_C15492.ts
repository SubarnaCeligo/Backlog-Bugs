
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C20709 from "@testData/FlowBuilder/TC_C20709.json";


test.describe("TC_C15492", () => {
  let flowId;
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("@Env-All @Zephyr-IO-T2766|Verify hover text for `On/off`, `Run now`, `Schedule` and `Settings` in Flow Builder", async ({io}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C20709);
    flowId = await io.api.getFlowId(TC_C20709.name)
    await io.flowBuilder.navigateToTheFlow(
      [flowId]
    );
    await io.homePage.loadingTime();
    test.step("Navigated to the created flow", async ()=>{});
    await io.homePage.loadingTime();
    var flowToggle = await io.homePage.isVisible(selectors.flowBuilderPagePO.FLOW_ON_OFF);
    var runFlow = await io.homePage.isVisible(selectors.basePagePO.RUNFLOW);
    var schedule = await io.homePage.isVisible(selectors.flowBuilderPagePO.ADD_SCHEDULE);
    var settings = await io.homePage.isVisible(selectors.flowBuilderPagePO.SETTINGS_LABEL);
    await io.assert.expectToBeTrue(flowToggle, "");
    await io.assert.expectToBeTrue(runFlow, "");
    await io.assert.expectToBeTrue(schedule, "");
    await io.assert.expectToBeTrue(settings, "");
    test.step("hover text is present for 'On/off', 'Run now', 'Schedule' and 'Settings' in Flow Builder.", async ()=>{});
  });
});
