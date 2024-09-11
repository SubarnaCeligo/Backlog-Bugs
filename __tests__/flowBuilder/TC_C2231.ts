import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C2468 from "@testData/FlowBuilder/TC_C2468.json";

test.describe("@Env-All @Zephyr-IO-T2741", () => {

  test("@Env-All @Zephyr-IO-T2741", async ({io}) => {
    await io.createResourceFromAPI(TC_C2468, "FLOWS");
    await io.homePage.loadingTime()
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
    await io.homePage.loadingTime();
    // Delete mapping 
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.DELETE_MAPPING);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.DELETE_MAPPING,0);
    // Click on save and close
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.AUDIT_LOGS);
    await io.homePage.loadingTime();
    test.step("***Navigated To Audit Logs Tab***", async ()=>{});
    var text = await io.homePage.getText(
      selectors.flowBuilderPagePO.AUDIT_LOGS_FIELD_VALUE
    );
    var expected = "mappings";
    await expect(text).toBe(expected);
await test.step(
      "*** Verified Implementation of Audit log tab in console of flow builder ***"
, async ()=>{});

  });
});
