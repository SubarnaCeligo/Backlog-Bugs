
import { test } from "@celigo/ui-core-automation";
import TC_C14291 from "@testData/STANDALONE/TC_C14291.json";

test.describe("TC_C14291", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Go To Flows Page ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T3983 @Zephyr-IO-T3077 TC_C14291", async ({io,page}, testInfo) => {
    test.step("*** creating invalid flow through API ***", async ()=>{});

    var response = await io.api.createImpOrExpAndFlowsThruAPI(TC_C14291);
    await io.assert.expectToBeValue(String(response[0].code), "invalid_flow", "");

    test.step("*** Validated the error ***", async ()=>{});
  });
});
