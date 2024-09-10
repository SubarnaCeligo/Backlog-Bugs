
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1074", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Delete intergation ***", async ()=>{});
    await io.api.deleteIntegrationRecursively("TC_C1074_2024");
  });
  test("@Env-All @Zephyr-IO-T854 TC_C1074", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime();
    test.step("*** Clicking on New Integration ***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C1074_2024");
    test.step("*** Writing the name ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Save and Close ***", async ()=>{});

    const resulttext = await page.getByText("TC_C1074_2024").first();
    await expect(resulttext).toBeVisible();
    await io.homePage.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.homePage.click(selectors.basePagePO.DELETE);

    test.step("*** An integration successfully created ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
