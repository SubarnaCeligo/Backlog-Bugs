
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C31036_Httpexp_requtbodyverification.json";

test.describe("TC_C31036 Verify HTTP request body is not getting cleared in the HTTP export after saving", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9504 @Env-All TC_C31036 Verify HTTP request body is not getting cleared in the HTTP export after saving", async ({io,page}, testInfo) => {
    //*Create Page Generators
    test.step("*** Creating PageGenerator ***", async ()=>{});
    await io.pageGenerator( "Allure",HTTP);

    await io.homePage.loadingTime();
    await io.homePage.click( selectors.flowBuilderPagePO.EXPORT);
    test.step("*** clicked on export ***", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    test.step("*** Clicking on httprequest button ***", async ()=>{});

    var result = await page.locator(
      selectors.flowBuilderPagePO.HTTPREQUSTBODY
    ).textContent();

    await io.assert.expectToContainValue( "Contact",result, "");
    await io.assert.expectToContainValue( "all",result, "");

    test.step("*** Succesfully validated the data present in requestbody ***", async ()=>{});
  });
});
