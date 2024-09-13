
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/Mapper2.0/TC_C52131.json";
import { allure } from "allure-playwright";

test.describe("TC_C52131", () => {
  test("@Env-All @Zephyr-IO-T22494 TC_C52131 | Verify when multiple sources are present, user clicks on data type it should navigate to mapping settings windowand must be able to set Data type.", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on source field data type ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " button",
      0
    );

    await io.homePage.loadingTime();
    
    await test.step("*** Vadilating clicking on data type in source field is naviagting to setting tab ***", async ()=>{});
    var ele = await io.homePage.isVisible(
      selectors.mappings.MAPPER2DOT0PO.DATATYPE
    );
    await io.assert.expectToBeTrue(ele, "");

    test.step("*** Closing the mapping ***", async ()=>{});
    await io.homePage.click(
      "[data-test='backRightDrawer']"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
