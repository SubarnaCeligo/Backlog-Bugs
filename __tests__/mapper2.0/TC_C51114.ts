
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/Mapper2.0/TC_C51114.json";
import { allure } from "allure-playwright";

test.describe("TC_C51114", () => {
  test("@Env-All @Zephyr-IO-T22345 TC_C51114", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Save the flow ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.AUTO_PREVIEW
    );
    await io.homePage.loadingTime();
    let res = await io.homePage.copyResourceData(
      selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT
    );
    res = JSON.stringify(res);
    var res1 = TC.expected;
    await io.assert.expectToBeValue(res, res1, "");
    await test.step("*** mappings are updated with handelbar expression for the supported data types ***", async ()=>{});
  });
});
