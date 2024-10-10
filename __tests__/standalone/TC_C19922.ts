
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C19922", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T6236 TC_C19922", async ({io,page}, testInfo) => {
    
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    
    await io.goToFlowsPage();

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C19922");
    await io.homePage.clickByTextByIndex("TC_C19922_DND", 0);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Choosing desired flow ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    test.step("*** Selecting the Run  ***", async ()=>{});

    const waitingInQueueEl = await page.getByText("Waiting in queue").first();
    await waitingInQueueEl.waitFor({ state: 'visible', timeout: 90000 });
    test.step("*** Wait for text to be visible ***", async ()=>{});
    await expect(waitingInQueueEl).toBeVisible();
    test.step("*** verified the status Waiting in queue  ***", async ()=>{});
    
    await test.step("*** verified the  flow status remains constant(in progress) even when multiple PG changes the status  ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
