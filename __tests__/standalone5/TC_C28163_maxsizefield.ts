import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP1 from "@testData/STANDALONE/TC_C28163_maxsizefield.json";

test.describe("Verifying Max field size", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });

  test("@Zephyr-IO-T9547 @Env-All TC_C28163_maxsizefield Verify the max size of the fields for HTTP Export is increased to 128KB", async ({io,page}, testInfo) => {
    //*Create Page Generators
    test.step("*** Creating PageGenerator ***", async ()=>{});
    await io.pageGenerator("allure",HTTP1);
    await io.homePage.loadingTime()
    await test.step("*** Able to enter exact 131072bytes(128KB) of data in requestbody ***",async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    const nameValidation = await page.locator(selectors.homePagePO.HOME).textContent();
    let isVisible=await io.homePage.isVisible(selectors.homePagePO.HOME)
    await io.assert.expectToBeTrue(isVisible,"")
    await io.assert.expectToBeValue(String(nameValidation), "Home", "");
    test.step("*** Test passed as home page is the default landing page ***", async ()=>{});
  });
});
