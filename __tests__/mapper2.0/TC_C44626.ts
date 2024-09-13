
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C44626 from "@testData/Mapper2.0/TC_C44626.json";

test.describe("TC_C44626", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T2376 TC_C44626 | Verify destination record field is date checkbox is NOT displayed when Data type is Boolean, String array, Number array, Boolean array", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C44626, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Save the flow ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    let settings = await page.$$(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS
    );
    await (settings[0]).click();
    await io.homePage.loadingTime();
    test.step("*** Click on settings button ***", async ()=>{});
    const datetype = await page.locator(
      selectors.mappings.MAPPER2DOT0PO.DATEFIELD
    );
    var checkbox1 = await datetype.isVisible();
    await test.step("*** Checking date type checkbox is displayed for different datatypes ***", async ()=>{});
    expect(checkbox1).toBeFalsy();
    let close = await page.$$(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await (close[2]).click();
    test.step("*** Close the drawer ***", async ()=>{});

    await (settings[1]).click();
    await io.homePage.loadingTime();
    test.step("*** Click on settings button ***", async ()=>{});
    await test.step("*** Checking date type checkbox is displayed for different datatypes ***", async ()=>{});
    var checkbox2 = await datetype.isVisible();
    expect(checkbox2).toBeFalsy();
    close = await page.$$(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await (close[2]).click();
    test.step("*** Close the drawer ***", async ()=>{});

    await (settings[2]).click();
    await io.homePage.loadingTime();
    test.step("*** Clicked on settings button ***", async ()=>{});
    await test.step("*** Checking date type checkbox is displayed for different datatypes ***", async ()=>{});
    var checkbox3 = await datetype.isVisible();
    expect(checkbox3).toBeFalsy();
    close = await page.$$(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await (close[2]).click();
    test.step("*** Close the drawer ***", async ()=>{});

    await (settings[3]).click();
    await io.homePage.loadingTime();
    test.step("*** Clicked on settings button ***", async ()=>{});
    await test.step("*** Checking date type checkbox is displayed for different datatypes ***", async ()=>{});
    var checkbox4 = await datetype.isVisible();
    expect(checkbox4).toBeFalsy();
    close = await page.$$(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await (close[2]).click();
    test.step("*** Close the drawer ***", async ()=>{});
    
    await test.step("*** Verified that destination record field date is not displayed ***", async ()=>{});
  });
});
