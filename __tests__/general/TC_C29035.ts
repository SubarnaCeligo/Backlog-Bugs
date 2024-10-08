import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C29035.json";
 

test.describe("TC_C29035", () => {
  test("@Zephyr-IO-T6420 @Env-All TC_C29035", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
  

    var id = await io.api.getFlowId(FTP.name);

    await io.flowBuilder.navigateToTheFlow( id);
    await test.step("*** Navigated to the flow based on ID ***",()=>{});
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await test.step("*** Clicked on run  ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.DASHBOARD);

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.reloadPage();
    
    await  io.homePage.reloadPage();
    await test.step("*** refreshing the page ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await test.step("*** Clicked on dashboard ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);

    await io.homePage.reloadPage();
    
    var successcount = await page.locator("tbody>tr:nth-child(1)>td:nth-child(8)").textContent();
    await  io.assert.expectToBeValue(successcount, "0", "");
    await test.step("*** validated successcount ***",()=>{});

    var ignorecount = await page.locator("tbody>tr:nth-child(1)>td:nth-child(9)").textContent();
    await await io.assert.expectToBeValue(ignorecount, "0", "");
    await test.step("*** validated ignorecount ***",()=>{});

    var errorcount = await await page.locator("tbody>tr:nth-child(1)>td:nth-child(10)").textContent();
    await await io.assert.expectToBeValue(errorcount, "0", "");
    await test.step("*** validated errorcount ***",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
