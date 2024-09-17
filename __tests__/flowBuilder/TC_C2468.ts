import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C2468 from "@testData/FlowBuilder/TC_C2468.json";


test.describe("@Env-All @Zephyr-IO-T2742", () => {
  
  test("@Env-All @Zephyr-IO-T2742|to verify that on adding mappings the last saved time is updated successfully", async ({io}) => {
    await io.createResourceFromAPI(TC_C2468, "FLOWS");
    await io.homePage.loadingTime();
  
    // After run get the timestamp
    const actualtimebeforeChanges = (await io.flowBuilder.getText(selectors.myAccountPagePO.RELATIVE_DATE_TIME)).toString();

    // Click on import mapping
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    // Delete mapping 
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.DELETE_MAPPING);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.DELETE_MAPPING,0);
    // Click on save and close
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    // Get the time stamp test.afterEach updating
    var actualtimeAfterChanges = await (await io.flowBuilder.getText(selectors.myAccountPagePO.RELATIVE_DATE_TIME)).toString();
    // Both the timestamps are not same
    expect(actualtimebeforeChanges).not.toBe(actualtimeAfterChanges);
  });
});
