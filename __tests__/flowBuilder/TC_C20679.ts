import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C2468 from "@testData/FlowBuilder/TC_C2468.json";

test.describe("@Env-All @Zephyr-IO-T2966", () => {

  test("@Env-All @Zephyr-IO-T2966", async ({io}) => {
    //*Create Flows
    await io.createResourceFromAPI(TC_C2468, "FLOWS");
    await io.homePage.loadingTime()
        await io.homePage.click(
          selectors.aliasesPagePO.ALIASES_FLOW_SETTINGS
        );    
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.NAME_INPUT,
      "Changed flow name"
    );
    await io.homePage.loadingTime()
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime()
    await io.homePage.click(
      selectors.flowBuilderPagePO.AUDIT_LOGS
    );
    test.step("Click on Audit log tab.", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.RESOURCETYPE
    );
    test.step("Click on Select resource type dropdown.", async ()=>{});
    await io.homePage.click(
      selectors.mappings.FLOWRESOURCETYPE
    );
    test.step("Select 'flow' from dropdown.", async ()=>{});
    await io.homePage.loadingTime();
    var text = await io.homePage.getText(
      selectors.flowBuilderPagePO.AUDIT_LOGS_FIELD_VALUE
    );
    var expected = "pageProcessors.0.responseMapping";
    await expect(text).not.toBe(expected);
await test.step(
      "Log with pageProcessors.0.responseMapping field is not captured in audit logs."
, async ()=>{});
  });
});
