
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C61342", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C61342 @Env-All @Zephyr-IO-T2344 Verify help text for Edit Stack drawer Name field", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Stacks");
    test.step("Clicked on stack button", async ()=>{});
    await io.homePage.loadingTime();
    test.step("clicked create stack", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("clicked create stack help icon", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.HELPICON, 0);
    var text = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT);
    await io.assert.expectToContainValue("Enter a distinguishable name for the stack you are creating.",String(text), "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Save and Close ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
