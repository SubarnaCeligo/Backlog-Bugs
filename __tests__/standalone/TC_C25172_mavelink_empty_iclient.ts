
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C25172_mavelink_iclient_empty", async () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4459 TC_C25172_mavelink_iclient_empty", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click("[data-test='Kantata']");
    await io.homePage.loadingTime();
    test.step("*** clicked on mavelink adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "mavelink");
    test.step("*** renaming the field  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** clicked on save and close ***", async ()=>{});

    const errorEl = await page.getByText("A value must be provided");
    await errorEl.waitFor({state: "visible", timeout: 10000});
    await expect(errorEl).toBeVisible();

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** clicking close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** clicking Discard button ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
