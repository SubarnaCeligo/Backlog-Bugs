
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP2 from "@testData/STANDALONE/TC_C28163_lessthanmaxsizefield.json";

test.describe("TC_C28163_lessthanmaxsizefield", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9547 @Env-All TC_C28163_lessthanmaxsizefield Verify the max size of the fields for HTTP Export is increased to 128KB", async ({io,page}, testInfo) => {
    //*Create Page Generators
    test.step("*** Creating PageGenerator ***", async ()=>{});
    await io.pageGenerator("allure", HTTP2);

    await test.step("*** Able to enter less than 131072bytes(128KB) of data in requestbody ***",async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    const nameValidation = await page.locator(selectors.homePagePO.HOME).textContent();
    let isVisible= await io.homePage.isVisible(selectors.homePagePO.HOME);
    await io.assert.expectToBeTrue(isVisible,"");
    await io.assert.expectToBeValue(String(nameValidation), "Home", "");
  });
});
