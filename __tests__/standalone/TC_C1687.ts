
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/Flows/create/http/TC_C1687.json"


test.describe("TC_C1687", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T9506 TC_C1687", async ({io,page}, testInfo) => {
    // *Create Page Generators
    test.step("*** Creating PageGenerator ***", async ()=>{});
    await io.pageGenerator("Allure", HTTP);
    await io.homePage.loadingTime();
    await io.homePage.click( selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();
    test.step("*** clicked on export ***", async ()=>{});

    var result = await page.locator(
      selectors.exportsPagePO.HTTP_RELATIVE_URI
    );
    await result.dblclick();
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.exportsPagePO.HTTP_RELATIVE_URI, "//tickets");
    await io.homePage.loadingTime();
    var errEl = await page.getByText("Delta exports must use {{lastExportDateTime}} in either the relative URI or HTTP request body.");
    await expect(errEl).toBeVisible();
    test.step("*** Error response validated ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
});
