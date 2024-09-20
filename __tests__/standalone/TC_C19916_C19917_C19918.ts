
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C19916_C19917_C19918", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T6231 @Zephyr-IO-T6232 @Zephyr-IO-T6233 TC_C19916_C19917_C19918", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C2015");
    await io.homePage.clickByTextByIndex("TC_C2015_DND", 0);
    await io.homePage.loadingTime();
    test.step("*** Choosing desired flow ***", async ()=>{});

    const lastRunEl = await page.getByText("Last run:").first();
    await lastRunEl.waitFor({ state: 'visible', timeout: 60000 });
    test.step("*** Wait for text to be visible ***", async ()=>{});
    await expect(lastRunEl).toBeVisible();
    test.step("*** verified the status LastRun  ***", async ()=>{});
    
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    test.step("*** Selecting the Run  ***", async ()=>{});

    const waitingInQueueEl = await page.getByText("Waiting in queue").first();
    await waitingInQueueEl.waitFor({ state: 'visible', timeout: 30000 });
    test.step("*** Wait for text to be visible ***", async ()=>{});
    await expect(waitingInQueueEl).toBeVisible();
    test.step("*** verified the status Waiting in queue  ***", async ()=>{});
    
   const columnHEaders = await page.$$(
      selectors.flowBuilderPagePO.COLUMNSNAME
    );
    const columnnamestep = await (await columnHEaders[0]).innerText();
    await io.assert.expectToBeValue(String(columnnamestep), "Step", "");
    
    const columnnamestatus = await (await columnHEaders[1]).innerText();
    await io.assert.expectToBeValue(String(columnnamestatus), "Status", "");

    const columnnameSuccess = await (await columnHEaders[2]).innerText();
    await io.assert.expectToBeValue(String(columnnameSuccess), "Success", "");

    const columnnameIgnored = await (await columnHEaders[3]).innerText();
    await io.assert.expectToBeValue(String(columnnameIgnored), "Ignored", "");

    const columnnameErrors = await (await columnHEaders[4]).innerText();
    await io.assert.expectToBeValue(String(columnnameErrors), "Errors", "");

    const columnnameAutoresolved = await (await columnHEaders[5]).innerText();
    await io.assert.expectToBeValue(String(columnnameAutoresolved), "Auto-resolved", "");

    const columnnamePages = await (await columnHEaders[6]).innerText();
    await io.assert.expectToBeValue(String(columnnamePages), "Pages", "");

    const columnnameDuration = await (await columnHEaders[7]).innerText();
    await io.assert.expectToBeValue(String(columnnameDuration), "Duration", "");

    const columnnameCompleted = await (await columnHEaders[8]).innerText();
    await io.assert.expectToBeValue(String(columnnameCompleted), "Completed", "");

    test.step("*** verified the columns names  ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
