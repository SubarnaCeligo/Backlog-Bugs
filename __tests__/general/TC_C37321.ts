import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/GENERAL/TC_C37321.json";

test.describe("TC_C37321", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.goToFlowsPage();
  });
  test("@Zephyr-IO-T2335  TC_C37321", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.isPageLoaded();
    await test.step("*** Navigating to   Flows page ***",()=>{});
    var getid = await io.api.getFlowId("TC_C32543_DND");
    await io.flowBuilder.navigateToTheFlow( getid);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_GENERATOR);
    await test.step("*** selecting connection ***",()=>{});
    await(await page.locator('[data-test="application"] input[role="combobox"]')
    ).fill('FTP');
    
    await io.homePage.clearTextValue((`${selectors.integrationPagePO.CREATEIA_APPLICATIONS} input`));
    await page.keyboard.press('Enter');

    await io.homePage.click('[data-test="createFromScratch"]')
    await test.step("Selecting application",()=>{});
    
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await test.step("Verified the drawers as part of rightDrawer migration in AFE field",()=>{});
    await io.homePage.click('[data-test="closeDrawer"]');
    await test.step("Verified the drawers as part of rightDrawer migration in Connection Form",()=>{});
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER,1);
    await test.step("Verified the drawers as part of rightDrawer migration in Mapping Section",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
